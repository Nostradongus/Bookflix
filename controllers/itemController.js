const db = require('../models/db.js');
const Item = require('../models/ItemModel.js');
const User = require('../models/UserModel.js');
const Review = require('../models/ReviewModel.js');
const Cart = require('../models/CartModel.js');

const itemController = {
	checkOwnership: function(req, res, next) {
		var query = { username: req.session.username };
		var projection = 'favitems owneditems';
		var page_content = {
			id: req.params.id,
			user_info: null,
			favorite: false,
			owned: false,
			cart: false,
			addedToCart: false,
			totalPrice: false,
			item: null,
			session_review: null,
			reviews: null
		};

		req.session.url = "/item/" + req.params.id;

		// Determines if current item is already in user's favorites or owned item list
		if (req.session.username) {
			db.findOne(User, query, projection, function (result) {
				if (result != null) {
					page_content.user_info = {
						username: req.session.username,
						displayname: req.session.displayname
					};
					var favlist = result.favitems;
					var ownedlist = result.owneditems;

					for (var i = 0; i < favlist.length; i++)
						if (req.params.id == favlist[i])
							page_content.favorite = true;

					for (var i = 0; i < ownedlist.length; i++)
						if (req.params.id == ownedlist[i].id)
							page_content.owned = true;

					res.locals.page_content = page_content;
					next();
				}
			});
		}
		else {
			res.locals.page_content = page_content;
			next();
		}
	},

	getContent: function (req, res, next) {
		var query = { id: req.params.id };
		var projection = null;
		var page_content = res.locals.page_content;

		if (req.session.cart) {
			var cart = new Cart(req.session.cart);
			page_content.cart = cart.generateArr();
			page_content.totalPrice = cart.tPrice;

			// determine if current item being viewed is already added to cart 
			page_content.addedToCart = cart.checkItem(page_content.id);
		}

		// Searches for item details
		db.findOne(Item, query, projection, function (result) {
			if (result != null) {
				var searched = {
					id: result.id,
					img: result.img,
					title: result.title,
					genres: result.genres,
					type: result.type,
					price: result.price,
					favorites: result.favorites,
					avgrate: result.avgrate.toFixed(2),
					reviews: result.reviews,
					summary: result.summary
				};
				page_content.item = searched;

				// Searches for reviews
				db.findMany(Review, query, projection, function (result) {
					if (result.length > 0) {
						var reviewlist = [];
						var size = result.length;
						result.forEach (function(result) {
							var query = {username: result.username};
							var projection = 'displayname img';
							var searched = {
								img: '/public/images/unavailable.png',
								username: result.username,
								rating: result.rating,
								review: result.review
							};
							
							// Searches for corresponding user details
							db.findOne(User, query, projection, function(result) {
								// If review of session user / logged in user
								if (searched.username == req.session.username) {
										var user = {
										rating: searched.rating,
										review: searched.review
									};
									page_content.session_review = user;
									size -= 1;
								}
								// If review has numerical and text review
								else if (searched.review != '' ) {
									searched.displayname = result.displayname;
									searched.img = result.img;
									reviewlist.push(searched);
								}
								// If review belongs to others and only has numerical review
								else
									size -= 1;

								// Renders page if list is complete
								if (reviewlist.length == size) {
									page_content.reviews = reviewlist;
									res.render('item', page_content);
								}
							});
						});
					}
					else
						res.render('item', page_content);
				});
			}
			else
				res.render('error', page_content);
		});
	},

	favorite: function (req, res) {
		var query = {id: req.params.id};
		var projection = 'favorites';

		// Updates favorite count of item
		db.findOne (Item, query, projection, function (result) {
			if (result != null) {
				var newFav = result.favorites;
				newFav += 1;

				db.updateOne (Item, query, {favorites: newFav}, function (result) {
					if (result != null) {
						// Updates if item has been added to favorites
						query = { username: req.session.username };
						projection = 'favitems';

						db.findOne(User, query, projection, function (result) {
							if (result != null) {
								var list = result.favitems;
								list.push(req.params.id);

								db.updateOne(User, query, { favitems: list }, function (result) {
									if (result)
										console.log('Review Favorite: Success');
									else
										console.log('Review Favorite: Error - could not update entry');
									res.send(result);
								});
							}
						});
					}
				})
			}
		});
	},

	unfavorite: function (req, res) {
		var query = {id: req.params.id};
		var projection = 'favorites';

		db.findOne (Item, query, projection, function (result) {
			if (result != null) {
				var newFav = result.favorites;
				newFav -= 1;

				db.updateOne (Item, query, {favorites: newFav}, function (result) {
					if (result != null) {
						// Updates if item has been added to favorites
						query = { username: req.session.username };
						projection = 'favitems';

						db.findOne(User, query, projection, function (result) {
							if (result != null) {
								var list = result.favitems;
								var index = list.indexOf(req.params.id);
								list.splice(index, 1);

								db.updateOne(User, query, { favitems: list }, function (result) {
									if (result)
										console.log('Review Unfavorite: Success');
									else
										console.log('Review Unfavorite: Error - could not update entry');
									res.send(result);
								});
							}
						});
					}
				})
			}
		});
	},

	submitReview: function (req, res) {
		var query = {
			id: req.params.id,
			username: req.session.username
		};
		var projection = null;

		db.findOne(Review, query, projection, function (result) {
			if (result != null) {
				res.redirect('/item/' + req.params.id);
				console.log('Review Insert: Error - existing entry found');
			}
			else {
				query.rating = req.query.rating;
				query.review = req.query.review;
				db.insertOne(Review, query, function (result) {
					if (result) {
						console.log('Review Insert: Success');

						// Updates review count in items
						var query = {id: req.params.id};
						var projection = 'ratings reviews';

						db.findOne (Item, query, projection, function(result) {
							if (result != null) {
								var update = {
									avgrate: 0,
									ratings: result.ratings,
									reviews: result.reviews
								};

								// Adjusts number of ratings counted
								var index = req.query.rating - 1;
								update.ratings[index] += 1;

								// Adjusts number of total reviews
								update.reviews += 1;

								// Adjusts average rating
								var total = 0;
								for (var i = 0; i < 5; i++) {
									update.avgrate += (i + 1) * update.ratings[i];
									total += update.ratings[i];
								}
								update.avgrate /= total;
								update.avgrate = update.avgrate.toFixed(2);

								db.updateOne (Item, query, update, function(result) {
									if (result != null) {
										console.log ("Review Adjust: Success");
										res.send(result);
									}
									else {
										console.log ("Review Adjust: Error - could not update entry.");
										res.redirect('/item/' + req.params.id);
									}
								});
							}
							else
								console.log ("Review Adjust: Error - entry not found.");
						});
					}
					else {
						console.log('Review Insert: Error - could not insert entry');
						res.redirect('/item/' + req.params.id);
					}
				});
			}
		});
	},

	updateReview: function (req, res) {
		var query = {
			id: req.params.id,
			username: req.session.username
		};
		var projection = 'rating';

		db.findOne(Review, query, projection, function (result) {
			if (result != null) {
				var oldRating = result.rating;
				var update = req.query.review;
				db.updateOne(Review, query, update, function (result) {
					if (result) {
						console.log('Review Update: Success');

						// Updates review count in items
						var query = {id: req.params.id};
						var projection = 'ratings';

						db.findOne (Item, query, projection, function(result) {
							if (result != null) {
								var update = {
									avgrate: 0,
									ratings: result.ratings
								};

								// Adjusts number of ratings counted
								var index = oldRating - 1;
								update.ratings[index] -= 1;
								index = (req.query.review).rating - 1;
								update.ratings[index] += 1;

								// Adjusts average rating
								var total = 0;
								for (var i = 0; i < 5; i++) {
									update.avgrate += (i + 1) * update.ratings[i];
									total += update.ratings[i];
								}
								update.avgrate /= total;
								update.avgrate = update.avgrate.toFixed(2);

								db.updateOne (Item, query, update, function(result) {
									if (result != null) {
										console.log ("Review Adjust: Success");
										res.send(result);
									}
									else {
										console.log ("Review Adjust: Error - could not update entry.");
										res.redirect('/item/' + req.params.id);
									}
								});
							}
							else
								console.log ("Review Adjust: Error - entry not found.");
						});
					}
					else {
						console.log('Review Update: Error - could not update entry');
						res.redirect('/item/' + req.params.id);
					}
				});
			}
			else {
				console.log('Review Update: Error - entry not found');
				res.redirect('/item/' + req.params.id);
			}
		});
	},

	deleteReview: function (req, res) {
		var query = {
			id: req.params.id,
			username: req.session.username
		};
		var projection = 'rating';

		db.findOne(Review, query, projection, function (result) {
			if (result != null) {
				var oldRating = result.rating;
				db.deleteOne(Review, query, function (result) {
					if (result) {
						console.log('Review Delete: Success');

						// Updates review count in items
						var query = {id: req.params.id};
						var projection = 'ratings reviews';

						db.findOne (Item, query, projection, function(result) {
							if (result != null) {
								var update = {
									avgrate: 0,
									ratings: result.ratings,
									reviews: result.reviews
								};
								console.log (update)

								// Adjusts number of ratings counted
								var index = oldRating - 1;
								update.ratings[index] -= 1;

								// Adjusts number of total reviews
								update.reviews -= 1;

								// Adjusts average rating
								var total = 0;
								for (var i = 0; i < 5; i++) {
									update.avgrate += (i + 1) * update.ratings[i];
									total += update.ratings[i];
								}
								if (total != 0)
									update.avgrate /= total;
								update.avgrate = (update.avgrate).toFixed(2);

								db.updateOne (Item, query, update, function(result) {
									if (result != null) {
										console.log ("Review Adjust: Success");
										res.send(result);
									}
									else {
										console.log ("Review Adjust: Error - could not update entry.");
										res.redirect('/item/' + req.params.id);
									}
								});
							}
							else
								console.log ("Review Adjust: Error - entry not found.");
						});
					}
					else {
						console.log('Review Delete: Error - could not delete entry');
						res.redirect('/item/' + req.params.id);
					}
				});
			}
			else {
				console.log('Review Delete: Error - entry not found.');
				res.redirect('/item/' + req.params.id);
			}
		});
	}
};

module.exports = itemController;