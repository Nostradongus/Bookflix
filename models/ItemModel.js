// to import module 'mongoose'
var mongoose = require('mongoose');

// database schema for items in the web application 
var ItemSchema = new mongoose.Schema({
    // item id 
    id: {
        type: Number, 
        required: true
    },

    // url to image file 
    img: {
        type: String, 
        required: false
    },

    // item title (name)
    title: {
        type: String, 
        required: true
    },

    // item genres 
    genres: {
        type: [String],
        required: true
    },

    // item type 
    type: {
        type: String,
        required: true 
    },

    // item price 
    price: {
        type: Number, 
        required: true
    },

    // number of favorites
    favorites: {
        type: Number, 
        default: 0, 
    },

    // average (total) rating 
    avgrate: {
        type: Number, 
        default: 0.0
    },

    // star rating counts 
    ratings: {
        type: [Number],
        default: [0, 0, 0, 0, 0]
    },

    // number of reviews made in the item
    reviews: Number,

    // item summary 
    summary: {
        type: String, 
        required: true
    },
});

// export ItemSchema mongoose.model object 
module.exports = mongoose.model('Item', ItemSchema);