const Item = require('../models/item')
const Shelf = require('../models/shelf')
const Weight = require('../models/weight')

const express = require('express');


const router = express.Router();

router.get('/', function (req, res) {
    const names = [];
    Item.fetchItemNames(names)
        .then(() => {
            // console.log(names);
            res.render('delete/shelf-selector-delete.ejs', {
                pageTitle: 'delete selector',
                names: names,
                successMessage: res.locals.successMessages,
                failMessage: res.locals.failMessages
            })
        })
        .catch(err => console.log(err));
})

//confirm screen before deletion
router.post('/confirm', (req, res, next) => {
    const shelfPosition = req.body.shelfPos;
    // console.log(shelfPosition)
    Shelf.fetchItemIdFromPos(shelfPosition)
        .then(([data, meta]) => {
            // console.log('still working');
            const itemId = data[0].items_id
            if (itemId == null) {
                //should really display a message here that the shelf is already empty
                console.log('that shelf is already empty')
                req.flash('failMessages', "That shelf is already empty");
                res.redirect('back');
            } else {
                return Item.findById(itemId)
                    .then(([data, meta]) => {
                        const itemData = data[0];
                        console.log(itemData.name);
                        res.render('delete/confirm-delete', {
                            pageTitle: 'Confirm shelf',
                            shelfPos: shelfPosition,
                            item: itemData,
                            successMessage: res.locals.successMessages,
                            failMessage: res.locals.failMessages
                        })
                    })
            }
        })
        .catch(err => console.log(err));
})


// updated to also clear relevant weights table of all data
router.post('/result', function (req, res) {
    const shelfPos = req.body.shelfPos;
    if (shelfPos > 6 || shelfPos < 1) {
        req.flash('failMessages', "No Shelf with that position");
        res.status(404).render('404', { pageTitle: 'Page Not Found' });
    }
    let sqlquery = "UPDATE shelves SET items_id = NULL, updateFrequency = '0', thresholdType = 'NUMBER', thresholdValue = '0', hundredPercent = NULL, autocalc100Percent = '0', warning = '1' WHERE shelfPosition = ?";
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
                        return res.render('delete/item-deleted', {
                            pageTitle: 'Success',
                            shelfPos: shelfPos,
                            successMessage: res.locals.successMessages,
                            failMessage: res.locals.failMessages
                        });
                    })
                    .catch(err => console.log(err));
            };
        });
    } else {
        res.redirect('/delete')
    }
})

module.exports = router;