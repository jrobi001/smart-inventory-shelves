const Item = require('../models/item')
const Shelf = require('../models/shelf')
const Weight = require('../models/weight')
const Overview = require('../models/overview')

const http = require("http");
const express = require('express');
const mysql = require('mysql');
const bodyParser = require('body-parser');

const itemSetupController = require('../controllers/itemSetupController');
const mainController = require('../controllers/mainController');

const router = express.Router();

router.get('/', (req, res) => {
    res.render('swap/swap-item.ejs', { pageTitle: 'Swap Items' });
});


router.post('/swapped', (req, res) => {

    let shelfpos1 = req.body.name;
    let shelfpos2 = req.body.swap;
    if (shelfpos1 != shelfpos2) {
        let sqlStatement = "UPDATE shelves SET shelfPosition = ? WHERE shelfPosition = ?";
        let record1 = [99, shelfpos1];
        let record2 = [shelfpos1, shelfpos2];
        let record3 = [shelfpos2, 99];
        db.query(sqlStatement, record1, (err, result) => {
            if (err) {
                throw (err)
            }
            if (result.affectedRows == 0) {
                res.render('swap/item-swap-fail.ejs', { pageTitle: 'Item Swap Failed' });
            }
            else {
                db.query(sqlStatement, record2, (err, result) => {
                    if (err) {
                        throw (err)
                    }
                    if (result.affectedRows == 0) {
                        res.render('swap/item-swap-fail.ejs', { pageTitle: 'Item Swap Failed' });
                    } else {
                        db.query(sqlStatement, record3, (err, result) => {
                            if (err) {
                                throw (err)
                            }
                            else {
                                res.render('swap/item-swapped.ejs', { pageTitle: 'Item Swapped Successfully' });
                            }
                        });
                    }
                });
            }
        });
    } else {
        res.redirect('/swap-shelves');
    }
});

module.exports = router;