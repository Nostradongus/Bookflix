// controller for '../views/list_browse.hbs'
const db = require('../models/db.js');
const Item = require('../models/ItemModel.js');
const User = require('../models/UserModel.js');
const Cart = require('../models/CartModel.js');

const browseController = {
    // list_browse/:type/:genre
    getList: function (req, res) {
        req.session.url = "/list_browse/" + req.params.type + "/" + req.params.genre;

        var user = false; 
        var cart = false; 
        var totalPrice = false; 
        
        if (req.session.username) 
            user = {
                username: req.session.username,
                displayname: req.session.displayname
            };

        if (req.session.cart) {
            var c = new Cart(req.session.cart);
            var cart = c.generateArr();
            var totalPrice = c.tPrice;
        }

        var query = req.params.genre !== "all" ? {type: req.params.type, genres: req.params.genre} : {type: req.params.type}; 
        var projection = null;

        db.findMany(Item, query, projection, function (result) {
            if (result != null) {
                // item list 
                var list = []; 
                for (var j = 0; j < result.length; j++) {
                    var item = {
                        id: result[j].id, 
                        title: result[j].title,
                        img: result[j].img, 
                        price: result[j].price, 
                        avgrate: result[j].avgrate, 
                        favorites: result[j].favorites
                    };
                    list.push(item);
                }
                // content header 
                var header = req.params.genre.toUpperCase() + " " + req.params.type.toUpperCase() + "S";

                res.render('list_browse', {content_header: header, items: list, user_info: user, cart: cart, totalPrice: totalPrice});
            }
            else {
                res.render('error', { user_info: user, cart: cart, totalPrice: totalPrice });
            }
        });
    },

    // list_browse/:special
    getSpecialList: function (req, res) {
        req.session.url = "/list_browse/" + req.params.special;

        var user = false;
        var cart = false;
        var totalPrice = false;

        if (req.session.username)
            user = {
                username: req.session.username,
                displayname: req.session.displayname
            };

        if (req.session.cart) {
            var c = new Cart(req.session.cart);
            var cart = c.generateArr();
            var totalPrice = c.tPrice;
        }

        if (req.params.special === "popular") {
            var query = { favorites: { $gte: 1000 } };
            var projection = null;

            db.findMany(Item, query, projection, function(result) {
                if (result != null) {
                    var list = []; 
                    for (var j = 0; j < result.length; j++) {
                        var item = {
                            id: result[j].id,
                            title: result[j].title,
                            type: result[j].type,
                            img: result[j].img,
                            price: result[j].price,
                            avgrate: result[j].avgrate,
                            favorites: result[j].favorites
                        };
                        list.push(item);
                    }
                    var header = "POPULAR ITEMS";

                    res.render('list_browse', { content_header: header, items: list, user_info: user, cart: cart, totalPrice: totalPrice });
                }
                else {
                    res.render('error', { user_info: user, cart: cart, totalPrice: totalPrice });
                }
            });
        }
        else if (req.params.special === "new") {
            db.findLastItems(Item, function(result) {
                if (result != null) {
                    var list = []; 
                    for (var j = 0; j < result.length; j++) {
                        var item = {
                            id: result[j].id,
                            title: result[j].title,
                            type: result[j].type,
                            img: result[j].img,
                            price: result[j].price,
                            avgrate: result[j].avgrate,
                            favorites: result[j].favorites
                        };
                        list.push(item);
                    }
                    var header = "NEWLY RELEASED ITEMS";
                    res.render('list_browse', { content_header: header, items: list, user_info: user, cart: cart, totalPrice: totalPrice });
                }
                else {
                    res.render('error', { user_info: user, cart: cart, totalPrice: totalPrice });
                }
            });
        }
        else {
            db.findOne(User, { username: req.params.special }, null, function (result) {
                if (result != null) {
                    var list = [];
                    if (result.favitems.length > 0) {
                        for (var j = 0; j < result.favitems.length; j++) {
                            db.findOne(Item, { id: result.favitems[j] }, null, function (data) {
                                if (data != null) {
                                    var item = {
                                        id: data.id,
                                        title: data.title,
                                        type: data.type,
                                        img: data.img,
                                        price: data.price,
                                        avgrate: data.avgrate,
                                        favorites: data.favorites
                                    };
                                    list.push(item);

                                    if (list.length === result.favitems.length) {
                                        var header = "FAVORITE ITEMS";
                                        res.render('list_browse', { content_header: header, items: list, user_info: user, cart: cart, totalPrice: totalPrice });
                                    }
                                }
                                else {
                                    console.log("Error! Item ID does not exist in the database!");
                                }
                            });
                        }
                    }
                    else 
                        res.render('list_browse', { user_info: user, cart: cart, totalPrice: totalPrice });
                }
                else {
                    res.render('error', { user_info: user, cart: cart, totalPrice: totalPrice });
                }
            });
        }
    }
};

module.exports = browseController;