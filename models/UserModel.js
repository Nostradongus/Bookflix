// to import module 'mongoose'
var mongoose = require('mongoose');

// database schema for users in the web application 
var UserSchema = new mongoose.Schema({
    // Used for logging in
    username: {
        type: String, 
        required: true
    },

    password: {
        type: String,
        required: true
    },

    email: {
        type: String,
        required: true
    },

    // Displayed in pages
    displayname: {
        type: String,
        required: true
    },

    // user profile image url
    img: String, 

    firstname: {
        type: String, 
        required: true
    },

    lastname: {
        type: String, 
        required: true
    },

    birthdate: {
        type: String, 
        required: true 
    },

    joindate: {
        type: String, 
        required: true
    },

    // ids of favorite items (books and movies)
    favitems: [Number],

    // transaction history (list of owned items, item id and date purchased)
    owneditems: [{
        id: Number,
        purchasedate: String
    }]
});

// export ItemSchema mongoose.model object 
module.exports = mongoose.model('User', UserSchema);