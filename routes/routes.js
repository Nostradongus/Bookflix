const express = require('express');
app = express();

// multer for uploading user profile image files 
var multer = require('multer');
var storage = multer.diskStorage({
    // where the user profile image files will be uploaded
    destination: function (req, file, cb) {
        cb(null, './public/images/users')
    },

    filename: function (req, file, cb) {
        cb(null, file.originalname);
    }
});
var upload = multer({storage: storage});

// controllers
const mainController = require('../controllers/mainController.js');
const browseController = require('../controllers/browseController.js');
const logController = require('../controllers/logController.js');
const regController = require('../controllers/regController.js');
const itemController = require('../controllers/itemController.js');
const userController = require('../controllers/userController.js');
const editController = require('../controllers/editController.js');
const searchController = require('../controllers/searchController.js');
const cartController = require('../controllers/cartController.js');
const checkoutController = require('../controllers/checkoutController.js');

// validation helpers (for server-side validation)
const logValidation = require('../helpers/logValidation.js');
const formValidation = require('../helpers/formValidation.js');
const checkoutValidation = require('../helpers/checkoutValidation.js');

// home page route
app.get('/', mainController.getIndex);

// list browse page route (when left bar buttons are clicked) 
app.get('/list_browse/:type/:genre', browseController.getList);

// list browse page route (when popular items, newly released items or user favorite items buttons are clicked)
app.get('/list_browse/:special', browseController.getSpecialList); 

// Item details page routes 
app.get('/item/:id', itemController.checkOwnership, itemController.getContent); // item details page route 
app.get('/item/:id/insert', itemController.submitReview); // submit review process route
app.get('/item/:id/update', itemController.updateReview); // update review process route 
app.get('/item/:id/delete', itemController.deleteReview); // delete review process route 
app.get('/item/:id/favorite', itemController.favorite); // favorite item process route
app.get('/item/:id/unfavorite', itemController.unfavorite); // unfavorite item process route 
app.get('/item/:id/deletefromcart', cartController.getDeleteFromCart); // delete item from cart process route

// User details page
app.get('/user/:username', userController.getUser, userController.getReviews,
			userController.getFavorites, userController.getTransactions, userController.render);

// Edit Profile page
app.get('/user/:username/edit', editController.getContent);
app.post('/user/:username/update', upload.single('profilepic'), formValidation.validateForm(), userController.updateProfile);
app.get('/user/:username/verify', editController.verifyDetails);
app.post('/user/:username/delete', userController.deleteReviews, userController.deleteFavorites, userController.deleteUser);

// Search page route
app.get('/search', searchController.getItems, searchController.getUsers);

// shopping cart dropdown list- add and remove item process route
app.get('/addtocart', cartController.getAddToCart); // from item page, add item to cart div button
app.get('/deletefromcart', cartController.getDeleteFromCart);

// login page route 
app.get('/login', logController.getLogin);

// login process route 
app.post('/login', logValidation.validateLogin(), logController.postLogin);

// logout process route 
app.get('/logout', logController.getLogout)

// register page route 
app.get('/register', regController.getRegister);

// to get username in form 
app.get('/getUsername', regController.getUsername); 

// user registration process route 
app.post('/register', upload.single('profilepic'), formValidation.validateForm(), regController.postRegister);

// user registration success page route 
app.get('/register/:displayname', regController.getRegisterSuccess);

// checkout page route 
app.get('/checkout', checkoutController.getCheckout);

// checkout information process route 
app.post('/checkout', checkoutValidation.validateCheckout(), checkoutController.postCheckout);

// last route, if current url is not valid at all 
app.use(mainController.getError);

module.exports = app;