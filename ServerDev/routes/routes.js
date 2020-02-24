const express = require('express');

const router = express.Router();

router.get('/', (req, res, next) => {
    let sqlQuery = "SELECT * FROM shelves";
    db.query(sqlQuery, (err, result) => {
        if (err) {
            res.redirect('./');
        }
        console.log(result);
        res.render('main');
    });

});

module.exports = router