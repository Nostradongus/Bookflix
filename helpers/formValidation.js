// server-side validation for form (registration form and edit profile form) process
// import module 'check' from 'express-validator' 
const { check } = require('express-validator');

const formValidation = {
    // to validate each input text field in register.hbs and edit.hbs, using server-side
    validateForm: function () {
        // check input text fields if they are not empty 
        // store results in an array 
        var validation = [
            // checks if first name input text field is not empty 
            check('fName', 'Please fill up with your first name').notEmpty(), 
            // checks if last name input text field is not empty 
            check('lName', 'Please fill up with your last name').notEmpty(),
            // checks if username input text field is not empty 
            check('uName', 'Please fill up with your username').notEmpty(),
            // checks if password input text field is not empty 
            check('pWord', 'Please fill up with your password').notEmpty(),
            // checks if email input text field is not empty 
            check('email', 'Please fill up with your email').notEmpty()
        ];

        return validation;
    }
}

module.exports = formValidation;