const http = require("http");
const express = require('express');
const mysql = require('mysql');
const bodyParser = require('body-parser');

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
router.get('/404', function (req, res) {
    res.render('404.ejs', { pageTitle: '404 ERROR' });

});

router.get('/edit-shelf-details', function (req, res) {
    res.render('edit-shelf-details.ejs', { pageTitle: 'Edit Shelf Details' });
});

router.get('/add-weight', (req, res, next) => {
    res.render('test/add-weight', {
        pageTitle: 'Add Weight'
    });
});

router.post('/weight-added', mainController.postWeightAdded);

router.get('/home', mainController.getShelfOverviewList);

router.get('/shelf-details-layout', mainController.getShelfDetails);

router.get('/template-example', (req, res, next) => {
    res.render('template-example', {
        pageTitle: 'template example'
    });
});

module.exports = router
