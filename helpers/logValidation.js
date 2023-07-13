// server-side validation for login process
// import module 'check' from 'express-validator' 
const { check } = require('express-validator'); 

const logValidation = {
    // to validate each input text field in login.hbs, using server-side
    validateLogin: function () {
        // check username and password input text fields if they are not empty 
        // store results in an array 
        var validation = [
            // checks if username input text field is not empty 
            check('user', 'Please input your username').notEmpty(),
            // checks if password input text field is not empty 
            check('pass', 'Please input your password').notEmpty()
        ];

        return validation; 
    }
}

module.exports = logValidation;