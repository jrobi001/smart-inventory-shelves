// const http = require("http");
const express = require('express');
// const mysql = require('mysql');
// const bodyParser = require('body-parser');

// const itemSetupController = require('../controllers/itemSetupController');
const mainController = require('../controllers/mainController');
// const shelfDetailsController = require('../controllers/shelfDetailsController');

const Item = require('../models/item')
const Shelf = require('../models/shelf')
// const Weight = require('../models/weight')
// const Overview = require('../models/overview')


const router = express.Router();

router.get('/:shelfPos', mainController.getShelfDetails);


router.get('/edit-shelf/:shelfPos', function (req, res) {

    const shelfPos = req.params.shelfPos;
    let sqlquery = "SELECT * from shelves WHERE shelfPosition = ?";
    let record = [shelfPos];
    db.query(sqlquery, record, (err, result) => {
        if (err) { throw (err) };

        res.render('shelf-details/edit-shelf-details.ejs', { pageTitle: 'Edit Shelf Details', shelfInfo: result[0], shelfPos: shelfPos });

    });

});

router.post('/edit-shelf/changes-saved', function (req, res) {
    const autocalc = req.body.autoCalc;
    const shelfPos = req.body.shelfPos;
    let updateFreq = req.body.updateFreq;
    let thrType = req.body.thrType;
    let thrVal = req.body.thrVal;
    let autoCalc = req.body.autoCalc;
    let warning = req.body.warning;
    let hundredPercent = req.body.hundredPercent;

    if (autocalc == "0") {
        let record = [hundredPercent, shelfPos];
        let sqlquery = "UPDATE shelves SET hundredPercent = ? WHERE shelfPosition = ?";
        db.query(sqlquery, record, (err, result) => {

            if (err) { throw (err) };

        });
    };
    let record2 = [updateFreq, thrType, thrVal, autoCalc, warning, shelfPos];
    let sqlquery2 = "UPDATE shelves SET updateFrequency = ?, thresholdType = ?, thresholdValue = ?, autocalc100Percent = ?, warning = ? WHERE shelfPosition = ?";
    db.query(sqlquery2, record2, (err, result) => {
        if (err) { throw (err) }
        else {
            res.render('shelf-details/changes-saved.ejs', { pageTitle: 'Changes Saved', shelfPos: shelfPos });
        }
    });

});

//edit item route modified to take shelf Position as a parameter eliminating need for name to be entered
// Logic for edit item-----------------------------------------------------------------------
router.get('/edit-item/:shelfPos', function (req, res) {
    const shelfPos = req.params.shelfPos;
    if (shelfPos > 6 || shelfPos < 1) {
        res.status(404).render('404.html', { pageTitle: 'Page Not Found' });
    }
    let itemId = -1;

    let sqlquery = "SELECT items_id FROM shelves WHERE shelves.shelfPosition = ?";
    let record = [shelfPos];

    db.query(sqlquery, record, (err, result) => {
        if (err) { throw (err) };
        itemId = result[0].items_id;
        if (itemId == null || itemId == -1) {

        } else {
            let sqlquery = "SELECT id,name,tags,weight,notes,price,imageLink FROM items WHERE id = ?";
            let record = [itemId];
            db.query(sqlquery, record, (err, result) => {
                if (err) { throw (err) };
                console.log(result[0]);
                if (result[0] == undefined) {
                    res.render('shelf-details/item-not-found.ejs', { pageTitle: 'Item Not Found', shelfPos: shelfPos });
                }
                else {
                    res.render('shelf-details/edit-item-form.ejs', { pageTitle: 'Edit Item Details', itemName: req.body.name, itemInfo: result[0], shelfPos: shelfPos });
                }
            });
        }
    });
})

router.post('/edit-item/changes-saved', function (req, res) {
    let price = req.body.price;
    if (price == "") {
        price = null;
    }
    const itemId = req.body.itemId;
    const shelfPos = req.body.shelfPos;
    console.log(itemId);
    let sqlquery = "UPDATE items SET name = ?, tags = ?, weight = ?, notes = ?, price = ?, imageLink = ? WHERE id = ?";
    let record = [req.body.name, req.body.tags, req.body.weight, req.body.notes, price, req.body.imageLink, itemId];

    db.query(sqlquery, record, (err, result) => {
        if (err) {
            throw (err)
        }
        else {
            res.render('shelf-details/changes-saved.ejs', { pageTitle: 'Changes Saved', shelfPos: shelfPos });
        }
    });
});
// -----------------------------------------------------------------------

router.get('/confirm-new/:shelfPos', function (req, res) {
    const shelfPos = req.params.shelfPos;
    if (shelfPos > 6 || shelfPos < 1) {
        res.status(404).render('404.html', { pageTitle: 'Page Not Found' });
    }
    Shelf.fetchItemIdFromPos(shelfPos)
        .then(([data, meta]) => {
            const itemId = data[0].items_id
            if (itemId == null) {
                return res.render('item-setup/item-form', {
                    pageTitle: 'Replace Item',
                    shelfPos: shelfPos,
                })
            } else {
                return Item.findById(itemId)
                    .then(([data, meta]) => {
                        const itemData = data[0];
                        // console.log(itemData.name);
                        res.render('shelf-details/new-item-confirm', {
                            pageTitle: 'Confirm shelf',
                            shelfPos: shelfPos,
                            item: itemData
                        })
                    })
            }
        })
        .catch(err => console.log(err));
})

router.get('/confirm-delete/:shelfPos', function (req, res) {
    const shelfPos = req.params.shelfPos;
    if (shelfPos > 6 || shelfPos < 1) {
        res.status(404).render('404.html', { pageTitle: 'Page Not Found' });
    }
    // console.log(shelfPosition)
    Shelf.fetchItemIdFromPos(shelfPos)
        .then(([data, meta]) => {
            // console.log('still working');
            const itemId = data[0].items_id
            if (itemId == null) {
                //should really display a message here that the shelf is already empty
                console.log('that shelf is already empty')
                return res.redirect("/delete")
            } else {
                return Item.findById(itemId)
            }
        }).then(([data, meta]) => {
            const itemData = data[0];
            console.log(itemData.name);
            res.render('shelf-details/delete-confirm', {
                pageTitle: 'Confirm shelf',
                shelfPos: shelfPos,
                item: itemData
            })
        })
        .catch(err => console.log(err));
})


module.exports = router;
