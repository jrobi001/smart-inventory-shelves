const path = require('path');

const express = require('express');
const bodyParser = require('body-parser');
const mysql = require('mysql2');
var session = require('express-session')
var flash = require('connect-flash');

const autoCalc = require('./util/autoCalcWeight')

const app = express();
const port = 8000;

//setting up database as a pool - exported as promises globally to avoid callbacks
//https://www.npmjs.com/package/mysql2
//https://evertpot.com/executing-a-mysql-query-in-nodejs/
//https://github.com/sidorares/node-mysql2/issues/809
const pool = mysql.createPool({
    // host: 'localhost',
    // user: 'root',
    database: 'shelfdatav3',
    password: 'cake123'
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
    // host: 'localhost',
    // user: 'root',
    database: 'shelfdatav3',
    password: 'cake123'
});

db.connect((err) => {
    if (err) {
        console.log('not connected');
        throw err;
    }
    console.log('Connected to database');
});
//global variable db to be called where needed
global.db = db;

// setting the default views path to /views
app.set('views', __dirname + '/views');
app.set('view engine', 'ejs');

//allows html files to be rendered by ejs
app.engine('html', require('ejs').renderFile);

const itemSetupRoutes = require('./routes/itemSetup')
const mainRoutes = require('./routes/main')
const shelfDetailsRoutes = require('./routes/shelfDetails')
const deleteRoutes = require('./routes/delete')
const swapRoutes = require('./routes/swap')
const helpRoutes = require('./routes/help')

//cookie for session management?
app.use(session({
    cookie: { maxAge: 60000 },
    secret: 'woot',
    resave: false,
    saveUninitialized: false
}));

app.use(flash());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'public')));

//routing files
app.use(mainRoutes);
app.use('/item-setup', itemSetupRoutes);
app.use('/shelf-details', shelfDetailsRoutes);
app.use('/delete', deleteRoutes);
app.use('/swap-shelves', swapRoutes);
app.use('/help', helpRoutes);


// calling the autocalculate 100% function from ./util/autoCalcWeight
// autoCalc.autoCalcWeight()
// setInterval(function () {
//     autoCalc.autoCalcWeight()
//     //interval of 5 mins (5*60*1000 ms)
// }, 120000)

// last route checked if none others satisfied - 404
app.use((req, res, next) => {
    res.status(404).render('404.html', { pageTitle: 'Page Not Found' });
});

// http://localhost:3000/
app.listen(port, () => console.log(`The app is listening on port ${port}`));
