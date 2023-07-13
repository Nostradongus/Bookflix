// server-side validation for checkout process
// import module 'check' from 'express-validator' 
const { check } = require('express-validator');

const checkoutValidation = {
    // to validate each input text field in login.hbs, using server-side
    validateCheckout: function () {
        // check username and password input text fields if they are not empty 
        // store results in an array 
        var validation = [
            // checks if username input text field is not empty 
            check('fname', 'Please input your full name').notEmpty(),
            // checks if email input text field is not empty 
            check('email', 'Please input your email').notEmpty(),
            // checks if address input text field is not empty 
            check('address', 'Please input your address').notEmpty(),
            // checks if city input text field is not empty 
            check('city', 'Please input your city').notEmpty(),
            // checks if state input text field is not empty 
            check('state', 'Please input your state').notEmpty(),
            // checks if zip input text field is not empty 
            check('zip', 'Please input your zip').notEmpty(),
            // checks if card name input text field is not empty 
            check('cname', 'Please input your card name').notEmpty(),
            // checks if credit card number input text field is not empty 
            check('ccnum', 'Please input your card number').notEmpty(),
            // checks if exp month input text field is not empty 
            check('expmonth', 'Please input your exp month').notEmpty(),
            // checks if exp year input text field is not empty 
            check('expyear', 'Please input your exp year').notEmpty(),
            // checks if CVV input text field is not empty 
            check('cvv', 'Please input your CVV').notEmpty()
        ];

        return validation;
    }
}

module.exports = checkoutValidation;