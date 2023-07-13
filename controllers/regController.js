// controller for register.hbs (sign up)
const db = require('../models/db.js');
const User = require('../models/UserModel.js');

// import module 'validationResult' from 'express-validator' 
const { validationResult } = require('express-validator');

// for password hashing 
const bcrypt = require('bcrypt');
const saltRounds = 10; 

// to manipulate filename of user profile image file 
const fs = require('fs');

const regController = {
    // to render ../views/register.hbs
    getRegister: function(req, res) {
        req.session.url = "/register";
        res.render('register');
    },

    getUsername: function (req, res) {
        db.findOne(User, {username: req.query.uname.toLowerCase()}, 'username', function (result) {
            if (result != null)
                res.send(true);
            else 
                res.send(false);
        });
    },

    // to create new collection element to User collection of bookflix database
    postRegister: function(req, res) {
        // check if there are validation errors as processed by formValidation.validateForm()
        var errors = validationResult(req);

        // if validation errors occur 
        if (!errors.isEmpty()) {
            // delete uploaded user image file if there is 
            if (typeof req.file !== "undefined")
                fs.unlink("./public/images/users/" + req.file.filename, function (err) {
                    if (err) {
                        console.log(err);
                        throw err;
                    }
                });

            // get the error messages 
            errors = errors.errors; 

            // store the errors 
            var details = {}; 
            for (var j = 0; j < errors.length; j++)
                details[errors[j].param + 'Error'] = errors[j].msg; 

            // if some fields do not have error messages, display the inputted values before on the next page render 
            if (typeof details.fNameError === "undefined")
                details.fName = req.body.fName; 
            if (typeof details.lNameError === "undefined")
                details.lName = req.body.lName; 
            if (typeof details.bDateError === "undefined")
                details.bDate = req.body.bDate; 
            if (typeof details.uNameError === "undefined") 
                details.uName = req.body.uName; 
            if (typeof details.pWordError === "undefined") 
                details.pWord = req.body.pWord; 
            if (typeof details.emailError === "undefined") 
                details.email = req.body.email;

            // render same page to display the error messages 
            res.render('register', details);
        }
        else {
            // check if username already exists at the database 
            var query = {username: req.body.uName.toLowerCase()};
            var projection = ''; 

            db.findOne(User, query, projection, function (result) {
                // inputted username is unique 
                if (result == null) {
                    // check if user is 13 years old or above 
                    var date = req.body.bDate.split("-");

                    // user is 13 years old or above
                    if (parseInt(date[0]) <= 2007) {
                        // placeholder image, for users who did not upload any profile image
                        var imgPath = "/public/images/icons/no-profile.jpg";

                        // rename uploaded image file if there is 
                        if (typeof req.file !== "undefined") {
                            var ext = req.file.filename.split(".");
                            imgPath = '/public/images/users/' + req.body.uName + "." + ext[1];
                            fs.renameSync('./public/images/users/' + req.file.filename, './public/images/users/' + req.body.uName + "." + ext[1]);
                        }

                        // hash password for security purposes 
                        bcrypt.hash(req.body.pWord, saltRounds, function (err, hash) {
                            // create user join date by parsing today's date 
                            var formattedDate = (new Date()).getFullYear().toString() + '-' +
                                ((new Date()).getMonth() + 1).toString().padStart(2, 0) + '-' +
                                (new Date()).getDate().toString().padStart(2, 0);

                            // create new User collection element
                            var user = {
                                username: req.body.uName.toLowerCase(),
                                password: hash,
                                email: req.body.email,
                                displayname: req.body.uName,
                                img: imgPath,
                                firstname: req.body.fName,
                                lastname: req.body.lName,
                                birthdate: req.body.bDate,
                                joindate: formattedDate,
                                favitems: [],
                                owneditems: []
                            };

                            // insert new account to database
                            db.insertOne(User, user, function (flag) {
                                if (flag) {
                                    console.log("new user account successfully added to the database!");

                                    // display register success
                                    res.redirect('/register/' + req.body.uName);
                                }
                                else {
                                    res.render('error', { user_info: false });
                                }
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
                        
                        // render same page and display error message about user not verified for 
                        // account registration 
                        var details = {
                            fName: req.body.fName, 
                            lName: req.body.lName, 
                            uName: req.body.uName, 
                            pWord: req.body.pWord, 
                            email: req.body.email,
                            bDateError: "You must be 13 years old or above to register!"
                        };

                        res.render('register', details);
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

                    // render same page and display error message about username already existing
                    // in the database 
                    var details = {
                        fName: req.body.fName,
                        lName: req.body.lName,
                        bDate: req.body.bDate,
                        pWord: req.body.pWord,
                        email: req.body.email,
                        uNameError: "Username already exists! Try another one"
                    };
                    res.render('register', details);
                }
            });
        }
    },

    getRegisterSuccess: function(req, res) {
        req.session.url = "/";
        
        var user = false; 

        if (req.session.username) 
            user = {
                username: req.session.username, 
                displayname: req.session.displayname
            };

        res.render('register', { user_info: user, displayname: req.params.displayname });
    }
};

module.exports = regController;