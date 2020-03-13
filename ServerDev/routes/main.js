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

function autoCalcweight() {
    console.log('autocalc 100% occuring')
    let sqlqueryinit = "select id from shelves where items_id != 'null' and autocalc100Percent = '1'";
    db.query(sqlqueryinit, (err, result) => {
        if (result[0] != undefined) {
            var i;
            for (i = 0; i < result.length; i++) {
                let shelfId = result[i].id;
                let sqlquery0 = "select hundredPercent from shelves where id = ?";
                let record0 = [shelfId];
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

                        if (result2[0] != undefined) {
                            let weightval = result2[0].weight;

                            if (weightval > currentcalibratedWeight) {
                                let sqlquery = "update shelves set hundredPercent = ? where id = ?";
                                let record1 = [weightval, shelfId];
                                db.query(sqlquery, record1, (err3, result3) => {
                                    if (err3) { throw err3 }

                                });
                            }
                        }
                    });
                });
            }
        }
    });
}

autoCalcweight();

setInterval(function () {
    autoCalcweight()
}, 30000)

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
