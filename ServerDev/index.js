const path = require('path');

const express = require('express');
const bodyParser = require('body-parser');
const mysql = require('mysql2');
var session = require('express-session')
var flash = require('connect-flash');


const app = express();
const port = 3000;

//setting up database as a pool - exported as promises globally to avoid callbacks
//https://www.npmjs.com/package/mysql2
//https://evertpot.com/executing-a-mysql-query-in-nodejs/
//https://github.com/sidorares/node-mysql2/issues/809
const pool = mysql.createPool({
    host: 'localhost',
    user: 'root',
    database: 'shelfdatav2',
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
    database: 'shelfdatav2',
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



app.set('views', __dirname + '/views');
app.set('view engine', 'ejs');

//allows html files to be rendered by ejs
app.engine('html', require('ejs').renderFile);

const itemSetupRoutes = require('./routes/itemSetup')
const mainRoutes = require('./routes/main')

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


app.use((req, res, next) => {
    res.status(404).render('404.html', { pageTitle: 'Page Not Found' });
});

// http://localhost:3000/
app.listen(port, () => console.log(`The app is listening on port ${port}`));
