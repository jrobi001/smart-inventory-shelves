const path = require('path');

const express = require('express');
const bodyParser = require('body-parser');
const mysql = require('mysql2');

const app = express();

//setting up database as a pool - exported as promises globally to avoid callbacks
//https://www.npmjs.com/package/mysql2
//https://evertpot.com/executing-a-mysql-query-in-nodejs/
//https://github.com/sidorares/node-mysql2/issues/809
const pool = mysql.createPool({
    host: 'localhost',
    user: 'root',
    database: 'shelfdatav2',
    password: 'cake123'
});
const dbPromise = pool.promise();
//global variable dbPromise to be called where needed.
global.dbPromise = dbPromise;


//setting up database the way it was in web dev, for those that prefer callbacks
const db = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    database: 'shelfdatav2',
    password: 'cake123'
});

db.connect((err) => {
    if (err) {
        throw err;
    }
    console.log('Connected to database');
});
//global variable db to be called where needed
global.db = db;

app.set('view engine', 'ejs');
app.set('views', 'views');

const routes = require('./routes/routes')
const testRoutes = require('./routes/testRoutes')

app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'public')));

app.use('/test', testRoutes);
app.use(routes);


app.use((req, res, next) => {
    res.status(404).render('404', { pageTitle: 'Page Not Found' });
});

// http://localhost:3000/
app.listen(3000);