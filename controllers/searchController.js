const db = require('../models/db.js');
const Item = require('../models/ItemModel.js');
const User = require('../models/UserModel.js');
const Review = require('../models/ReviewModel.js');

const searchController = {
	getItems: function(req, res, next) {
		// Turn query to regex
		var query = {title: {$regex: '.*' + req.query.search + '.*', $options: 'i'}};
		var projection = null
		var page_content = {
			user_info: null,
			query: req.query.search,
			count: 0,
			books: null,
			movies: null,
			users: null
		};

		req.session.url = '/search?search=' + req.query.search;

		if (req.session.username) {
            page_content.user_info = {
                username: req.session.username, 
                displayname: req.session.displayname
            };
        }
		
		// Searches for matching items
		db.findMany(Item, query, projection, function(result) {
			if (result.length > 0) {
				var booklist = [];
				var movielist = [];
				size = result.length;
				result.forEach (function(result) {
					var searched = {
						id: result.id,
						img: result.img,
						title: result.title,
						genres: result.genres,
						type: result.type.toUpperCase(),
						avgrate: result.avgrate,
						reviews: result.reviews,
						favorites: result.favorites
					};

					if (result.type == 'book')
						booklist.push(searched);
					else
						movielist.push(searched);

					if ((booklist.length + movielist.length) == size) {
						page_content.count = booklist.length + movielist.length;
						page_content.books = booklist;
						page_content.movies = movielist;

						res.locals.page_content = page_content;
						next();
					}
				});
			}
			else {
				res.locals.page_content = page_content;
				next();
			}
		});
	},

	getUsers: function(req, res, next) {
		var query = { displayname: { '$regex': '.*' + req.query.search + '.*', $options: 'i' } };
		var projection = null;
		var page_content = res.locals.page_content;

		db.findMany(User, query, projection, function (result) {
			if (result.length > 0) {
				var userlist = [];
				size = result.length;
				result.forEach (function(result) {
					var searched = {
						username: result.username,
						displayname: result.displayname,
						img: result.img,
						joindate: result.joindate,
						reviews: 0
					};

					db.findMany(Review, {username: searched.username}, 'username', function(result) {
						searched.reviews = result.length;
						userlist.push (searched);
						if (userlist.length == size) {
							page_content.count += userlist.length;
							page_content.users = userlist;

							console.log(page_content);
							res.render('search', page_content);
						}
					});
				});
			}
			else
				res.render('search', page_content);
		});
	}
};

module.exports = searchController;
