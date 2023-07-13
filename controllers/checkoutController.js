// controller for checkout process
const db = require('../models/db.js');
const User = require('../models/UserModel.js');
const Cart = require('../models/CartModel.js');

// import module 'validationResult' from 'express-validator' 
const { validationResult } = require('express-validator');

const checkoutController = {
    getCheckout: function(req, res) {
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
        
        res.render('checkout', { user_info: user, cart: cart, totalPrice: totalPrice, checkoutSuccess: false });
    },

    postCheckout: function(req, res) {
        var details = {}; 

        if (req.session.username) 
            details.user_info = {
                username: req.session.username, 
                displayname: req.session.displayname 
            };

        if (req.session.cart) {
            var c = new Cart(req.session.cart); 
            details.cart = c.generateArr(); 
            details.totalPrice = c.tPrice; 
        }

        // check if there are validation errors as processed by logValidation.validateLogin()
        var errors = validationResult(req);

        // if validation errors occur 
        if (!errors.isEmpty()) {
            // get the error messages 
            errors = errors.errors;

            // store the errors 
            for (var j = 0; j < errors.length; j++)
                details[errors[j].param + 'Error'] = errors[j].msg;

            // if some fields do not have error messages, save values for next render of same page
            if (typeof details.fnameError === "undefined") 
                details.fname = req.body.fname; 
            if (typeof details.emailError === "undefined") 
                details.email = req.body.email; 
            if (typeof details.addressError === "undefined") 
                details.address = req.body.address; 
            if (typeof details.cityError === "undefined") 
                details.city = req.body.city; 
            if (typeof details.stateError === "undefined") 
                details.state = req.body.state; 
            if (typeof details.zipError === "undefined") 
                details.zip = req.body.zip; 
            if (typeof details.cnameError === "undefined") 
                details.cname = req.body.cname; 
            if (typeof details.ccnumError === "undefined") 
                details.ccnum = req.body.ccnum; 
            if (typeof details.expmonthError === "undefined") 
                details.expmonth = req.body.expmonth; 
            if (typeof details.expyearError === "undefined") 
                details.expyear = req.body.expyear; 
            if (typeof details.cvvError === "undefined") 
                details.cvv = req.body.cvv; 

            // render same page to display the error messages 
            res.render('checkout', details);
        }
        else {
            // get today's date 
            var today = new Date();
            var month = today.getMonth() + 1;
            var year = today.getFullYear();

            // check if card number inputted has valid format 
            if (req.body.ccnum.length < 16) {
                details.fname = req.body.fname;
                details.email = req.body.email;
                details.address = req.body.address;
                details.city = req.body.city;
                details.state = req.body.state;
                details.zip = req.body.zip;
                details.cname = req.body.cname;
                details.expmonth = req.body.expmonth;
                details.expyear = req.body.expyear;
                details.cvv = req.body.cvv;
                details.ccnumError = "Credit card number must be 16 digits";
                res.render('checkout', details);
            }
            else if ((month >= parseInt(req.body.expmonth) && year >= parseInt(req.body.expyear)) || year > parseInt(req.body.expyear)) {
                details.fname = req.body.fname; 
                details.email = req.body.email; 
                details.address = req.body.address; 
                details.city = req.body.city; 
                details.state = req.body.state; 
                details.zip = req.body.zip; 
                details.cname = req.body.cname; 
                details.ccnum = req.body.ccnum; 
                details.expmonth = req.body.expmonth; 
                details.cvv = req.body.cvv; 
                details.expyearError = "Credit card already expired!";
                res.render('checkout', details);
            }
            else {
                // purchase date of item 
                var purchaseDate = today.getFullYear().toString() + '-' +
                                   month.toString().padStart(2, 0) + '-' +
                                   today.getDate().toString().padStart(2, 0);
                
                var query = { username: req.session.username };
                var projection = 'owneditems';
                var items = details.cart;

                db.findOne(User, query, projection, function (result) {
                    if (result != null) {
                        var list = result.owneditems;

                        for (var j = 0; j < items.length; j++) {
                            var ownedItem = {
                                id: items[j].id,
                                purchasedate: purchaseDate
                            };

                            list.push(ownedItem);
                        }

                        db.updateOne(User, query, { owneditems: list }, function (result) {
                            if (result) {
                                console.log('Checkout Transaction: Success');

                                // reset cart as items were already bought 
                                req.session.cart = null;

                                details.checkoutSuccess = true; 
                                res.render('checkout', details)
                            }
                            else {
                                console.log('Checkout Transaction: Error - could not update entry');
                                res.render('checkout', details);
                            }
                        });
                    }
                });
            }
        }
    }
};

module.exports = checkoutController;