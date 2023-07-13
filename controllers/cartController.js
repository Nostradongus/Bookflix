// controller for adding items to and deleting items from cart
const db = require('../models/db.js');
const Item = require('../models/ItemModel.js');
const Cart = require('../models/CartModel.js');

const cartController = {
    getAddToCart: function(req, res) { 
        var cart = new Cart(req.session.cart ? req.session.cart : {}); 

        var query = {id: req.query.id}
        var projection = 'id img title type price';

        // get item data from the database
        db.findOne(Item, query, projection, function(result) {
            // if item exists in the database
            if (result != null) {
                cart.addItem(req.query.id, result);
                req.session.cart = cart; 

                // send result data back to ajax query to finalize the adding process
                res.send(result);
            }
            else {
                var user;
                if (req.session.username) 
                    user = {
                        username: req.session.username,
                        displayname: req.session.displayname
                    };
                else
                    user = false;

                res.render('error', {user_info: user});
            }
        });
    },

    getDeleteFromCart: function(req, res) {
        var id = req.query.id; 
        var cart = new Cart(req.session.cart ? req.session.cart : {});
        
        cart.deleteItem(id);
        req.session.cart = cart; 

        // return new total price and go back to ajax query to finish process
        res.send(parseFloat(cart.tPrice).toFixed(2));
    }
};

module.exports = cartController;