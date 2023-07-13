// to import module 'mongoose'
var mongoose = require('mongoose');

// database schema for review posts in the web application 
var ReviewSchema = new mongoose.Schema({
    // item id 
    id: {
        type: Number,
        required: true
    },

    // user who created the review post 
    username: {
        type: String, 
        required: true 
    },

    // rating given by the user 
    rating: {
        type: Number, 
        required: true
    },

    // review comment 
    review: {
        type: String, 
        required: false
    }
});

// export ItemSchema mongoose.model object 
module.exports = mongoose.model('Review', ReviewSchema);