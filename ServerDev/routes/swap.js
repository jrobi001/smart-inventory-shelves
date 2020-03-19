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
    const names = [];
    Item.fetchItemNames(names)
        .then(() => {
            // console.log(names);
            res.render('swap/swap-item.ejs', {
                pageTitle: 'Swap Items',
                names: names
            });
        })
        .catch(err => console.log(err));

});


router.post('/swapped', (req, res) => {

    let shelfPos1 = req.body.shelfPos;
    let shelfPos2 = req.body.swapPos;
    if (shelfPos1 < 1 || shelfPos1 > 6 || shelfPos2 < 1 || shelfPos2 > 6) {
        res.status(404).render('404.html', { pageTitle: 'Page Not Found' });
    }

    if (shelfPos1 != shelfPos2) {
        let sqlStatement = "UPDATE shelves SET shelfPosition = ? WHERE shelfPosition = ?";
        let record1 = [99, shelfPos1];
        let record2 = [shelfPos1, shelfPos2];
        let record3 = [shelfPos2, 99];
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