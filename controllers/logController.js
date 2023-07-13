// controller for logging in and logging out
const db = require('../models/db.js');
const User = require('../models/UserModel.js');
const bcrypt = require('bcrypt');

// import module 'validationResult' from 'express-validator' 
const { validationResult } = require('express-validator');

const logController = {
    // to render login.hbs 
    getLogin: function(req, res) {
        if (req.session.url === "/register")
            req.session.url = "/";

        res.render('login');
    },

    // for post login 
    postLogin: function(req, res) {
        // check if there are validation errors as processed by logValidation.validateLogin()
        var errors = validationResult(req);

        // if validation errors occur 
        if (!errors.isEmpty()) {
            // get the error messages 
            errors = errors.errors; 
            
            // store the errors 
            var details = {}; 
            for (var j = 0; j < errors.length; j++)
                details[errors[j].param + 'Error'] = errors[j].msg; 
            
            // if no error message for username, display on next render
            if (typeof details.userError === "undefined") 
                details.user = req.body.user;
            
            // render same page to display the error messages 
            res.render('login', details);
        }
        else {
            var query = {username: req.body.user.toLowerCase()};
            var projection = 'username displayname password'; 

            // find user in database 
            db.findOne(User, query, projection, function (result) {
                // if user exists in database 
                if (result != null) {
                    // check if password entered matches the hashed password in the database 
                    bcrypt.compare(req.body.pass, result.password, function (err, equal) {
                        // if password matches the hashed password 
                        if (equal) {
                            // create user session variables 
                            req.session.username = result.username; 
                            req.session.displayname = result.displayname; 

                            // redirect back to previous page after logging in 
                            res.redirect(req.session.url);
                        }
                        else 
                            // render same page and display error message about inputting the wrong password 
                            res.render('login', {user: req.body.user, passError: "Incorrect password! Please try again."});
                    });
                }
                else 
                    // render same page and display error message about user not existing in the database
                    res.render('login', {userError: "User does not exist! Please try again"});
            }); 
        }
    },

    // for logout 
    getLogout: function(req, res) {
        // by logging out, destroy the current values stored in req.session 
        req.session.destroy(function(err) {
            if(err) throw err; 

            // redirect to the main page after logging out 
            res.redirect('/');
        });
    }
};

module.exports = logController;
