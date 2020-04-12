const path = require('path');

const express = require('express');
const bodyParser = require('body-parser');
const mysql = require('mysql2');
const session = require('express-session')
const expressSanitizer = require('express-sanitizer');

const cookieParser = require("cookie-parser");
const connectFlash = require("connect-flash");

const autoCalc = require('./util/autoCalcWeight')

const app = express();
const port = 8000;

//setting up database as a pool - exported as promises globally to avoid callbacks
//https://www.npmjs.com/package/mysql2
//https://evertpot.com/executing-a-mysql-query-in-nodejs/
//https://github.com/sidorares/node-mysql2/issues/809
const pool = mysql.createPool({
    host: 'localhost',
    user: 'root',
    database: 'shelfdatav3',
    password: 'Igniciouse1@'

});
const dbPromise = pool.promise();
//global variable dbPromise to be called where needed.
global.dbPromise = dbPromise;

//pool.query('SELECT * FROM shelves', function (error, results){
//    if(error)throw error;
//    console.log(results);
//})

//setting up database the way it was in web dev, for those that prefer callbacks
const db = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    database: 'shelfdatav3',
    password: 'Igniciouse1@'
});

db.connect((err) => {
    if (err) {
        throw err;
    }
    console.log('Connected to database');
});
//global variable db to be called where needed
global.db = db;

//Added for session management for flash messages-------------------------
app.use(cookieParser("secretshelves"));
//cookie for session management?
app.use(session({
    secret: 'secretshelves',
    resave: false,
    saveUninitialized: false,
    cookie: {
        expires: 600000
    }
}));
app.use(connectFlash());
// ----------------------------------------

// setting the default views path to /views
app.set('views', __dirname + '/views');
app.set('view engine', 'ejs');

//allows html files to be rendered by ejs
app.engine('html', require('ejs').renderFile);
app.use(expressSanitizer());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'public')));

// routes --------------------------------------------

// making flash messages available to all routes -------------
// credit to answer by 'Thad Blakenship' on stackoverflow
// https://stackoverflow.com/questions/23160743/how-to-send-flash-messages-in-express-4-0
app.use(function (req, res, next) {
    res.locals.successMessages = req.flash('successMessages');
    res.locals.failMessages = req.flash('failMessages');
    next();
});

const itemSetupRoutes = require('./routes/itemSetup')
const mainRoutes = require('./routes/main')
const shelfDetailsRoutes = require('./routes/shelfDetails')
const deleteRoutes = require('./routes/delete')
const swapRoutes = require('./routes/swap')
const helpRoutes = require('./routes/help')
//routing files
app.use(mainRoutes);
app.use('/item-setup', itemSetupRoutes);
app.use('/shelf-details', shelfDetailsRoutes);
app.use('/delete', deleteRoutes);
app.use('/swap-shelves', swapRoutes);
app.use('/help', helpRoutes);


// calling the autocalculate 100% function from ./util/autoCalcWeight
autoCalc.autoCalcWeight()
setInterval(function () {
    autoCalc.autoCalcWeight()
    //interval of 5 mins (5*60*1000 ms)
}, 120000)

// last route checked if none others satisfied - 404
app.use((req, res, next) => {
    res.status(404).render('404', {
        pageTitle: 'Page Not Found',
        successMessage: res.locals.successMessages,
        failMessage: res.locals.failMessages
    });
});

// http://localhost:3000/
app.listen(port, () => console.log(`The app is listening on port ${port}`));
