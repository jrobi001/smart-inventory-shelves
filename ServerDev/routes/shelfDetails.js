const http = require("http");
const express = require('express');
const mysql = require('mysql');
const bodyParser = require('body-parser');

const itemSetupController = require('../controllers/itemSetupController');
const mainController = require('../controllers/mainController');

const router = express.Router();

router.get('/:shelfPos', mainController.getShelfDetails);

//edit item route modified to take shelf Position as a parameter eliminating need for name to be entered
// Logic for edit item-----------------------------------------------------------------------
router.get('/edit-item/:shelfPos', function (req, res) {
    const shelfPos = req.params.shelfPos;
    let itemId = -1;

    let sqlquery = "SELECT items_id FROM shelves WHERE shelves.shelfPosition = ?";
    let record = [shelfPos];

    db.query(sqlquery, record, (err, result) => {
        if (err) { throw (err) };
        itemId = result[0].items_id;
        if (itemId == null || itemId == -1) {
            res.send('no item here this path should skip to add item')
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

module.exports = router;