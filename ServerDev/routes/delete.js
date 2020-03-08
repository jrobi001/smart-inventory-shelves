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

router.get('/', function (req, res) {
    res.render('delete/shelf-selector-delete.ejs', {
        pageTitle: 'delete selector'
    });
})

//confirm screen before deletion

// updated to also clear relevant weights table of all data
router.post('/result', function (req, res) {
    const shelfPos = req.body.shelfPos;
    let sqlquery = "UPDATE shelves SET items_id = NULL, updateFrequency = '0', thresholdType = 'NUMBER', thresholdAbsolute = '0', thresholdNumber = '0', thresholdPercent = '0', 100percentWeight = NULL, autocalc100Percent = '0', warning = '1' WHERE shelfPosition = ?";
    let newrecord = [req.body.shelfPos];
    if (newrecord == 1 || newrecord == 2 || newrecord == 3 || newrecord == 4 || newrecord == 5 || newrecord == 6) {
        db.query(sqlquery, newrecord, (err, result) => {
            if (err) {
                return console.error(err.message);
            } else {
                //new code getting id from shelf pos
                Shelf.fetchIdFromPos(shelfPos)
                    .then(([data, meta]) => {
                        const id = data[0].id;
                        console.log(id);
                        //then deleting all records from relevant weights table
                        return Weight.deleteShelWeightsfById(id)
                    })
                    .then(() => {
                        return res.render('delete/item-deleted', { pageTitle: 'Success', shelfPos: shelfPos });
                    })
                    .catch(err => console.log(err));
            };
        });
    } else {
        res.redirect('/delete')
    }
})

module.exports = router;