// import module `mongoose`
const mongoose = require('mongoose');
const dotenv = require('dotenv');

// import module 'User' from '../models/UserModel.js'
const User = require('./UserModel.js');

// import module 'Item' from '../models/ItemModel.js'
const Item = require('./ItemModel.js');

// import module 'Review' from '../models/ReviewModel.js'
const Review = require('./ReviewModel.js');

dotenv.config();

// bookflix is the name of the database
const url = process.env.DB_URL;

// additional connection options
const options = {
    useUnifiedTopology: true,
    useNewUrlParser: true
};

// defines an object which contains necessary database functions
const database = {

    /*
        connects to database
    */
    connect: function () {
        mongoose.connect(url, options, function (error) {
            if (error) throw error;
            console.log('Connected to: ' + url);
        });
    },

    /*
        inserts a single `doc` to the database based on the model `model`
    */
    insertOne: function (model, doc, callback) {
        model.create(doc, function (error, result) {
            if (error) return callback(false);
            console.log('Added ' + result);
            return callback(true);
        });
    },

    /*
        inserts multiple `docs` to the database based on the model `model`
    */
    insertMany: function (model, docs, callback) {
        model.insertMany(docs, function (error, result) {
            if (error) return callback(false);
            console.log('Added ' + result);
            return callback(true);
        });
    },

    /*
        searches for a single document based on the model `model`
        filtered through the object `query`
        limits the fields returned based on the string `projection`
        callback function is called after the execution of findOne() function
    */
    findOne: function (model, query, projection, callback) {
        model.findOne(query, projection, function (error, result) {
            if (error) return callback(false);
            return callback(result);
        });
    },

    /*
        searches for multiple documents based on the model `model`
        filtered through the object `query`
        limits the fields returned based on the string `projection`
        callback function is called after the execution of findMany() function
    */
    findMany: function (model, query, projection, callback) {
        model.find(query, projection, function (error, result) {
            if (error) return callback(false);
            return callback(result);
        });
    },

    // for getting the last 5 items of the Item collection in bookflix database
    findLastItems: function (model, callback) {
        model.find(function (error, result) {
            if (error) return callback(false);
            return callback(result);
        }).sort({_id:-1}).limit(5);
    },

    /*
        updates the value defined in the object `update`
        on a single document based on the model `model`
        filtered by the object `filter`
    */
    updateOne: function (model, filter, update, callback) {
        model.updateOne(filter, update, function (error, result) {
            if (error) return callback(false);
            console.log('Document modified: ' + result.nModified);
            return callback(true);
        });
    },

    /*
        updates the value defined in the object `update`
        on multiple documents based on the model `model`
        filtered using the object `filter`
    */
    updateMany: function (model, filter, update, callback) {
        model.updateMany(filter, update, function (error, result) {
            if (error) return callback(false);
            console.log('Documents modified: ' + result.nModified);
            return callback(true);
        });
    },

    /*
        deletes a single document based on the model `model`
        filtered using the object `conditions`
    */
    deleteOne: function (model, conditions, callback) {
        model.deleteOne(conditions, function (error, result) {
            if (error) return callback(false);
            console.log('Document deleted: ' + result.deletedCount);
            return callback(true);
        });
    },

    /*
        deletes multiple documents based on the model `model`
        filtered using the object `conditions`
    */
    deleteMany: function (model, conditions, callback) {
        model.deleteMany(conditions, function (error, result) {
            if (error) return callback(false);
            console.log('Document deleted: ' + result.deletedCount);
            return callback(true);
        });
    }

}

/*
    exports the object `database` (defined above)
    when another script exports from this file
*/
module.exports = database;
