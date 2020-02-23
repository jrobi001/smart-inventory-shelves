const mysql = require('mysql2');

const pool = mysql.createPool({
    host: 'localhost',
    user: 'root',
    database: 'shelfdatav2',
    password: 'cake123'
});

module.exports = pool.promise();