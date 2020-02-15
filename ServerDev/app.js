// nodemon is installed for live updating - to start the server (with nodemon)
// run 'npm start'

const path = require('path');

const express = require('express');
const bodyParser = require('body-parser');
//to do: install mysql
var mysql = require('mysql');

const app = express();


//replace password with your own.
// may need to execute two queries in MySQL workbench for server to work:
// ALTER USER 'root'@'localhost' IDENTIFIED WITH mysql_native_password BY 'password';
// flush privileges;
const db = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'cake123',
    database: 'shelfdatav1'
});

db.connect((err) => {
    if (err) {
        throw err;
    }
    console.log('Connected to the database');
});
global.db = db;

//more routes files can be added - generally advised to have one for each group of pages
const routes = require('./routes/routes')

app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'public')));

app.use(routes);

//route for the unknown domain at the bottom of all routing.
app.use((req, res, next) => {
    res.status(404).sendFile(path.join(__dirname, 'views', '404.html'));
});


// Can access the site throught localhost 3000
// on windows: http://localhost:3000/
app.listen(3000);