const path = require('path');

const express = require('express');
const bodyParser = require('body-parser');
const mysql = require('mysql2');


const errorController = require('./controllers/error');

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
const db = pool.promise();
global.db = db;

app.set('view engine', 'ejs');
app.set('views', 'views');

const routes = require('./routes/routes')
const testRoutes = require('./routes/testRoutes')

app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'public')));

app.use('/test', testRoutes);
app.use(routes);


app.use(errorController.get404);

// http://localhost:3000/
app.listen(3000);