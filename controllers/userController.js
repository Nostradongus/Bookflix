const db = require('../models/db.js');
const Item = require('../models/ItemModel.js');
const User = require('../models/UserModel.js');
const Review = require('../models/ReviewModel.js');

// for password hashing 
const bcrypt = require('bcrypt'); 
const saltRounds = 10; 

// to import validationResult from express-validator 
const { validationResult } = require('express-validator');

// to manipulate filename of user profile image file 
const fs = require('fs'); 

const userController = {
	getUser: function(req, res, next) {
		var query = {username: req.params.username};
		var projection = null;
		var page_content = {
			user_info: null,
			user: null,
			self: false,
			reviews: null
		}
		
		if (req.session.username) {
            page_content.user_info = {
                username: req.session.username, 
                displayname: req.session.displayname
            };
			if (req.params.username == req.session.username)
				page_content.self = true;
        }

        // Searches for user
        db.findOne(User, query, projection, function(result) {
			if (result != null) {
				var searched = {
					username: result.username,
					displayname: result.displayname,
					img: result.img,
					firstname: result.firstname,
					lastname: result.lastname,
					birthdate: result.birthdate,
					joindate: result.joindate,
				};
				page_content.user = searched;
				page_content.favorites = result.favitems;
				page_content.owned = result.owneditems;

				res.locals.page_content = page_content;
				next();
			}
			else {
				res.render('error', page_content);
			}
		});
	},

	getReviews: function(req, res, next) {
		var query = {username: req.params.username};
		var projection = null;

		// Searches for reviews
		db.findMany(Review, query, null, function(result) {
			if (result.length > 0) {
				var size = result.length;
				var list = [];
				result.forEach (function(result) {
					var searched = {
						id: result.id,
						title: 'Title Unavailable',
						img: '/public/images/unavailable.png',
						rating: result.rating,
						review: result.review
					}
					if (searched.review == "")
						searched.review = "\n<i>The user did not give a text review for this item.</i>";

					// Searches corresponding item of retrieved review
					var query = {id: result.id};
					var projection = 'title img';
					db.findOne(Item, query, projection, function(result) {
						if (result != null) {
							searched.title = result.title;
							searched.img = result.img;
							list.push(searched);

                            // Proceeds if all reviews processed
							if (list.length == size) {
								res.locals.page_content.reviews = list;
								next();
							}
						}
					});
				});
			}
            else {
                res.locals.page_content.reviews = null;
                next();
            }
		});
	},

	getFavorites: function(req, res, next) {
        // If user page is session owner's page
		if (res.locals.page_content.self) {
			var favorites = res.locals.page_content.favorites;
			var size = favorites.length;
			var list = [];

            if (favorites.length > 0) {
                // Searches corresponding item details of favorite items
                favorites.forEach (function(result) {
                    var query = {id: result};
                    var projection = null;

                    // Searches for item details
                    db.findOne(Item, query, projection, function(result) {
                        if (result != null) {
                            var searched = {
                                id: result.id,
                                title: result.title,
                                img: result.img,
                                type: result.type.toUpperCase(),
                                avgrate: result.avgrate,
                                reviews: result.reviews,
                                favorites: result.favorites
                            };
                            list.push (searched);

                            // Proceeds if all favorite items processed
                            if (list.length == size) {
                                res.locals.page_content.favorites = list;
                                next();
                            }
                        }
                    });
                });
            }
            else {
                res.locals.page_content.favorites = null;
                next();
            }
		}
		else {
			res.locals.page_content.favorites = null;
			next();
		}
	},

	getTransactions: function(req, res, next) {
        // If user page is session owner's page
		if (res.locals.page_content.self) {
			var owned = res.locals.page_content.owned;
			var size = owned.length;
			var list = [];

            if (owned.length > 0) {
                // Searches corresponding item details of owned items
                owned.forEach (function(result) {
                    var query = {id: result.id};
                    var projection = null;
                    var purchasedate = result.purchasedate;

                    // Searches for item details
                    db.findOne(Item, query, projection, function(result) {
                        if (result != null) {
                            var searched = {
                                id: result.id,
                                title: result.title,
                                img: result.img,
                                type: result.type.toUpperCase(),
                                price: result.price,
                                purchasedate: purchasedate
                            };
                            list.push (searched);

                            // Proceeds if all owned items processed
                            if (list.length == size) {
                                res.locals.page_content.owned = list;
                                next();
                            }
                        }
                    });
                });
            }
            else {
                res.locals.page_content.owned = null;
                next();
            }  
		}
		else {
			res.locals.page_content.owned = null;
			next();
		}
	},

	render: function(req, res, next) {
		var page_content = res.locals.page_content;
		res.render('user', page_content);
	},

	updateProfile: function(req, res) {
        // check if there are validation errors as processed by formValidation.validateForm()
        var errors = validationResult(req);

        // if validation errors occur 
        if (!errors.isEmpty()) {
            // delete uploaded user image file if there is 
            if (typeof req.file !== "undefined") {
                fs.unlink("./public/images/users/" + req.file.filename, function (err) {
                    if (err) {
                        console.log(err);
                        throw err;
                    }
                });
            }

            // get the error messages 
            errors = errors.errors;

            // store the errors 
            req.session.details = {};
            for (var j = 0; j < errors.length; j++)
                req.session.details[errors[j].param + 'Error'] = errors[j].msg;
            
            // if some input fields have no error messages, save their values for next render of same page
            if (typeof req.session.details.fNameError === "undefined") 
                req.session.details.firstname = req.body.fName; 
            if (typeof req.session.details.lNameError === "undefined")
                req.session.details.lastname = req.body.lName; 
            if (typeof req.session.details.bDateError === "undefined") 
                req.session.details.birthdate = req.body.bDate; 
            if (typeof req.session.details.userError === "undefined")
                req.session.details.username = req.body.uName;
            if (typeof req.session.details.emailError === "undefined") 
                req.session.details.email = req.body.email;

            res.redirect('/user/' + req.params.username + '/edit');
        }
        else {
            // check if new username already exists in the database 
            var query = {username: req.body.uName.toLowerCase()};
            var projection = 'username'; 

            db.findOne(User, query, projection, function (result) {
                // if new username is unique or previous username is the same as the new username
                if (result == null || (req.params.username === req.body.uName.toLowerCase())) {
                    // check if new birth date inputted is valid 
                    var date = req.body.bDate.split("-");

                    // if new birth date is valid
                    if (parseInt(date[0]) <= 2007) {
                        // get session user's data from the database 
                        db.findOne(User, {username: req.params.username}, '', function (result) {
                            var data = result; 

                            // hash inputted password 
                            bcrypt.hash(req.body.pWord, saltRounds, function (err, hash) {
                                // function for removing whitespaces from user field inputs 
                                function trim(str) {
                                    return str.replace(/^\s+|\s+$/g, '');
                                }

                                // User object for parameters to be updated 
                                var user = {}; 

                                // store hashed password 
                                user.password = hash; 

                                // if first name has been changed 
                                if (trim(req.body.fName) !== data.firstname)
                                    user.firstname = req.body.fName;

                                // if last name has been changed 
                                if (trim(req.body.lName) !== data.lastname)
                                    user.lastname = req.body.lName;

                                // if birth date has been changed 
                                if (req.body.bDate !== data.birthdate)
                                    user.birthdate = req.body.bDate;

                                // if username has been changed 
                                if (trim(req.body.uName) !== data.username) {
                                    user.username = req.body.uName.toLowerCase();
                                    user.displayname = req.body.uName;
                                    req.session.username = req.body.uName.toLowerCase(); 
                                    req.session.displayname = req.body.uName;
                                }

                                // if email has been changed 
                                if (trim(req.body.email) !== data.email)
                                    user.email = req.body.email;

                                // if a new image file has been uploaded 
                                if (typeof req.file !== "undefined") {
                                    // delete previous uploaded image file first (if previous image was not a placeholder image file)
                                    if (data.img !== "/public/images/icons/no-profile.jpg")
                                        fs.unlink("." + data.img, function (err) {
                                            if (err) {
                                                console.log(err);
                                                throw err;
                                            }
                                        });

                                    // rename newly uploaded image file afterwards 
                                    var ext = req.file.filename.split(".");
                                    imgPath = '/public/images/users/' + req.body.uName + "." + ext[1];
                                    fs.renameSync('./public/images/users/' + req.file.filename, './public/images/users/' + req.body.uName + "." + ext[1]);

                                    user.img = imgPath;
                                }

                                // Updates user information in database
                                db.updateOne(User, { username: req.params.username }, user, function (flag) {
                                    if (flag) {
                                        console.log("Edit Profile: Success");
                                        res.redirect('/user/' + req.session.username);
                                    }
                                    else {
                                        console.log("Edit Profile: Error - could not update entry");

                                        var user = {
                                            username: req.session.username, 
                                            displayname: req.session.displayname, 
                                            cart: null, 
                                            totalPrice: null
                                        };

                                        if (req.session.cart) {
                                            var cart = new Cart(req.session.cart);
                                            user.cart = cart.generateArr();
                                            details.totalPrice = cart.tPrice;
                                        }

                                        res.render('error', user);
                                    }
                                });
                            });
                        });
                    } 
                    else {
                        // delete uploaded user image file if there is 
                        if (typeof req.file !== "undefined")
                            fs.unlink("./public/images/users/" + req.file.filename, function (err) {
                                if (err) {
                                    console.log(err);
                                    throw err;
                                }
                            });
                        
                        // birth date error message
                        req.session.details = {
                            firstname: req.body.fName, 
                            lastname: req.body.lName, 
                            username: req.body.uName, 
                            email: req.body.email, 
                            bDateError: "You must be 13 years old or above to register!"
                        };

                        res.redirect('/user/' + req.params.username + '/edit');
                    }
                }
                else {
                    // delete uploaded user image file if there is 
                    if (typeof req.file !== "undefined")
                        fs.unlink("./public/images/users/" + req.file.filename, function (err) {
                            if (err) {
                                console.log(err);
                                throw err;
                            }
                        });

                    // username error message
                    req.session.details = {
                        firstname: req.body.fName, 
                        lastname: req.body.lName, 
                        birthdate: req.body.bDate, 
                        email: req.body.email,
                        uNameError: "Username already exists! Try another one" 
                    };

                    res.redirect('/user/' + req.params.username + '/edit');
                }
            });
        }
    },

    deleteReviews: function(req, res, next) {
    	var query = {username: req.body.username_confirm.toLowerCase()};
    	var projection = 'id rating';

        // Searches for all reviews by this user
    	db.findMany(Review, query, projection, function(result) {
    		if (result != null) {
    			var size = result.length;
    			var count = 0;

                // Searches for the items given a review
    			result.forEach (function(result) {
    				var query = {id: result.id};
					var projection = 'ratings reviews';
					var oldRating = result.rating;

					db.findOne (Item, query, projection, function(result) {
						if (result != null) {
							var update = {
								avgrate: 0,
								ratings: result.ratings,
								reviews: result.reviews
							};

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
							update.avgrate /= total;
							update.avgrate = update.avgrate.toFixed(2);

                            // Updates item details in database
							db.updateOne (Item, query, update, function(result) {
								count++;
                                // Proceeds if all reviews processed
								if (count == size)
									next();
							});
						}
						else
							console.log ("Review Adjust: Error - entry not found.");
					});
    			});
    		}
    		else
    			next();
    	});
    },

    deleteFavorites: function(req, res, next) {
    	console.log ("Deleting favorites");
    	var query = {username: req.params.username};
    	var projection = 'favitems';

        // Searches for this user's list of favorite items
    	db.findOne (User, query, projection, function(result) {
    		console.log (result);
    		if (result != null) {
    			var favorites = result.favitems;
    			var size = favorites.length;
    			var count = 0;

                // Searches for the items in user's favorite list
    			favorites.forEach (function(result) {
	    			var query = {id: result};
	    			var projection = 'favorites';

	    			db.findOne (Item, query, projection, function(result) {
	    				if (result != null) {
	    					var update = {};
	    					update.favorites = result.favorites - 1;

                            // Updates item details in database
	    					db.updateOne(Item, query, update, function(result) {
		    					count++
                                // Proceeds if all favorite items processed
		    					if (count == size)
		    						next();
	    					});
	    				}
	    			});
	    		});
    		}
    		else
    			next();
    	});
    },

    deleteUser: function(req, res) {
        var query = {username: req.body.username_confirm.toLowerCase()};
        var projection = 'id rating';

        projection = 'username displayname img';
        // Deletes data in user and reviews db
        db.findOne(User, query, projection, function(result) {
            if (result != null) {
                var displayname = result.displayname;

                // delete user profile image if there is 
                if (result.img !== "/public/images/icons/no-profile.jpg")
                    fs.unlink("." + result.img, function (err) {
                        if (err) {
                            console.log(err);
                            throw err;
                        }
                    });

                // Delete user from the database
                db.deleteOne(User, query, function(result) {
                    if (result) {
                        console.log('User Delete: Success');

                        // Deletes reviews of user from the database
                        db.deleteMany(Review, query, function(result) {
                            if (result) {
                                console.log('User Reviews Delete: Success');
                                req.session.destroy(function (err) {
                                    if (err) throw err;

                                    // redirect to the main page after logging out
                                    res.render ('delete', {displayname: displayname});
                                });
                            }
                            else 
                                console.log('User Reviews Delete: Error: could not delete entries');
                        });
                    }
                    else 
                        console.log('User Delete: Error - could not delete entry');
                });
            }
            else
                console.log ('User Delete: Error - entry not found.');
        });
    }
};

module.exports = userController;
