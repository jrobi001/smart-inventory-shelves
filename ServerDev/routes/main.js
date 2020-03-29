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

<<<<<<< HEAD
});






function autoCalcweight() {

    let sqlqueryinit = "SELECT id from shelves WHERE items_id != 'null' AND autocalc100Percent = '1'";
    db.query(sqlqueryinit, (err, result) => {


        if (result[0] != undefined) {
            var i;
            for (i = 0; i < result.length; i++) {
                let Id = result[i].id;

                let sqlquery0 = "select hundredPercent from shelves where id = ?";
                let record0 = [Id];
                db.query(sqlquery0, record0, (err1, result1) => {
                    if (err1) { throw err1 }
                    let currentcalibratedWeight = result1[0].hundredPercent;


                    if (record0 == '1') {
                        var sqlquery1 = "select weight from id1weights order by dateTime desc limit 1";
                    }
                    if (record0 == '2') {
                        var sqlquery1 = "select weight from id2weights order by dateTime desc limit 1";
                    }
                    if (record0 == '3') {
                        var sqlquery1 = "select weight from id3weights order by dateTime desc limit 1";
                    }
                    if (record0 == '4') {
                        var sqlquery1 = "select weight from id4weights order by dateTime desc limit 1";
                    }
                    if (record0 == '5') {
                        var sqlquery1 = "select weight from id5weights order by dateTime desc limit 1";
                    }
                    if (record0 == '6') {
                        var sqlquery1 = "select weight from id6weights order by dateTime desc limit 1";
                    }
                    db.query(sqlquery1, (err2, result2) => {
                        if (err2) { throw err2 }
=======
// router.get('/edit-shelf-details', function (req, res) {
//     res.render('edit-shelf-details.ejs', { pageTitle: 'Edit Shelf Details' });
// });
>>>>>>> ebaf82003146c815a6033f71e766fa2b8772bac8



router.get('/home', mainController.getShelfOverviewList);

router.get('/shelf-details-layout', mainController.getShelfDetails);

router.get('/template-example', (req, res, next) => {
    res.render('template-example', {
        pageTitle: 'template example'
    });
});

module.exports = router
