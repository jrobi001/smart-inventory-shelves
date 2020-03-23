const http = require("http");
const express = require('express');
const mysql = require('mysql');
const bodyParser = require('body-parser');
const Item = require('../models/item')

const itemSetupController = require('../controllers/itemSetupController');
const mainController = require('../controllers/mainController');

const router = express.Router();

router.use(bodyParser.json());
router.use(bodyParser.urlencoded({
    extended: true
}))

//routes can be placed here as in data web if wanted
router.get('/', (req, res, next) => {
    let sqlQuery = "SELECT * FROM shelves";
    db.query(sqlQuery, (err, result) => {
        if (err) {
            res.redirect('./');
        }
        res.render('dev-home');
    });
});

// router.get('/edit-shelf-details', function (req, res) {
//     res.render('edit-shelf-details.ejs', { pageTitle: 'Edit Shelf Details' });
// });



router.get('/home', mainController.getShelfOverviewList);

router.get('/shelf-details-layout', mainController.getShelfDetails);

router.get('/template-example', (req, res, next) => {
    res.render('template-example', {
        pageTitle: 'template example'
    });
});

module.exports = router
