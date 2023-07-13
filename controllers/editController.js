// controller for edit.hbs (edit profile)
const db = require('../models/db.js');
const User = require('../models/UserModel.js');
const Review = require('../models/ReviewModel.js');
const Cart = require('../models/CartModel.js');

// import module 'validationResult' from 'express-validator' 
const { validationResult } = require('express-validator');

// for password hashing 
const bcrypt = require('bcrypt');
const saltRounds = 10; 

// to manipulate filename of user profile image file 
const fs = require('fs'); 

const editController = {
    getContent: function(req, res) {
        var query = {username: req.params.username};
        projection = '';
        var page_content = {
            user_info: null,
            errors: null,
            searched: null
        }

        if (req.session.username) {
            page_content.user_info = {
                username: req.session.username, 
                displayname: req.session.displayname
            };
        }

        // get error messages from edit.hbs' input text fields if there are 
        if (req.session.details) 
            page_content.details = req.session.details; 

        // Gets existing user information
        db.findOne(User, query, projection, function(result) {
            if (result != null) {
                var searched = {
                    firstname: result.firstname,
                    lastname: result.lastname,
                    img: result.img,
                    birthdate: result.birthdate,
                    username: req.session.displayname,
                    email: result.email
                };
                page_content.user = searched;

                // if there are saved input values, replace page_content.user data with it 
                if (req.session.details) {
                    if (typeof req.session.details.firstname !== "undefined")
                        page_content.user.firstname = req.session.details.firstname;
                    if (typeof req.session.details.lastname !== "undefined")
                        page_content.user.lastname = req.session.details.lastname;
                    if (typeof req.session.details.birthdate !== "undefined")
                        page_content.user.birthdate = req.session.details.birthdate;
                    if (typeof req.session.details.username !== "undefined")
                        page_content.user.username = req.session.details.username;
                    if (typeof req.session.details.email !== "undefined")
                        page_content.user.email = req.session.details.email;
                }
                // empty details session variable afterwards 
                req.session.details = null; 
            }
            res.render('edit', page_content);
        });
    },

    /* Checks if typed password matches existing password in database */
    verifyDetails: function(req, res) {
        var query = {username: req.params.username};
        var projection = 'password';

        var username = req.query.username.toLowerCase();
        var password = req.query.password;
        if (password == null)
            password = " ";
        
        // Gets password stored in database
        db.findOne (User, query, projection, function(result) {
            if (result != null) {
                var refname = req.params.username;
                var refpass = result.password;

                // Compares if input password is the same as saved password
                bcrypt.compare(password, refpass, function (err, equal) {
                    if (username == refname && equal)
                        res.send(true);
                    else
                        res.send(false);
                });
            }
        });
    },
};

module.exports = editController;