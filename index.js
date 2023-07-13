// to import module 'express'
const express = require('express');

// to import module 'routes' from './routes/routes.js'
const routes = require('./routes/routes.js');

// to import module 'db' from './models/db.js'
const db = require('./models/db.js');

// to import module 'hbs', and register partials and layouts folder
const hbs = require('hbs');

// to import module 'express-session' for session management (login, etc.)
const session = require('express-session');

// for local session storage 
const MongoStore = require('connect-mongo');

// to import module 'cors'
const cors = require('cors');

// get port, hostname, and secret for session management 
const dotenv = require('dotenv');

// get express js 
const app = express();

// parse application/json
app.use(express.json());

// parse incoming requests with urlencoded payloads
app.use(express.urlencoded({extended: true}));

app.use(cors());

// to set 'hbs' as view engine
app.set('view engine', 'hbs');

dotenv.config();
port = process.env.PORT;
hostname = process.env.HOSTNAME;

// use 'express-session' middleware and set its options 
// using MongoStore (connect-mongo) as server-side session storage 
app.use(session({
    'secret': process.env.SECRET,
    'resave': false,
    'saveUninitialized': false,
    store: MongoStore.create({mongoUrl: 'mongodb://localhost:27017/bookflix'})
}));

// to set the folder 'public' as folder containing static assets 
// such as css, js, and image files 
app.use('/public', express.static(__dirname + '/public'));

// to register partials folder in views as hbs partials
hbs.registerPartials(__dirname + '/views/partials');

// define the paths contained in './routes/routes.js'
app.use('/', routes);

// if route is not defined in the server then render /views/error.hbs 
app.use(function (req, res) {
    res.render('error');
});

// connect to the database 
db.connect();

// bind port and hostname
app.listen(port, hostname, function () {
    console.log('Server is running at: ');
    console.log('http://' + hostname + ':' + port);
});

