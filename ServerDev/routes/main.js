const express = require('express');

const router = express.Router();

//routes can be placed here as in data web if wanted
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