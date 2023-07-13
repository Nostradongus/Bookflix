const Cart = require('../models/CartModel.js');

const mainController = {
    // for index.hbs
    getIndex: function (req, res) {
        req.session.url = "/"; // starting url

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
            cart = c.generateArr();
            totalPrice = c.tPrice; 
        }

        res.render('index', {user_info: user, cart: cart, totalPrice: totalPrice});
    },

    // for error.hbs
    getError: function (req, res) {
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
            cart = c.generateArr();
            totalPrice = c.tPrice;
        }

        res.render('error', { user_info: user, cart: cart, totalPrice: totalPrice });
    }
};

module.exports = mainController;