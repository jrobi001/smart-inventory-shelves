const Item = require('../models/item')
const express = require('express');

const router = express.Router();

router.get('/', (req, res) => {
    const names = [];
    Item.fetchItemNames(names)
        .then(() => {
            // console.log(names);
            res.render('swap/swap-item.ejs', {
                pageTitle: 'Swap Items',
                names: names,
                successMessage: res.locals.successMessages,
                failMessage: res.locals.failMessages
            });
        })
        .catch(err => console.log(err));

});


router.post('/swapped', (req, res) => {

    let shelfPos1 = req.body.shelfPos;
    let shelfPos2 = req.body.swapPos;
    if (shelfPos1 < 1 || shelfPos1 > 6 || shelfPos2 < 1 || shelfPos2 > 6) {
        res.status(404).render('404', {
            pageTitle: 'Page Not Found',
            successMessage: res.locals.successMessages,
            failMessage: res.locals.failMessages
        });
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
                res.render('swap/item-swap-fail.ejs', {
                    pageTitle: 'Item Swap Failed',
                    successMessage: res.locals.successMessages,
                    failMessage: res.locals.failMessages
                });
            }
            else {
                db.query(sqlStatement, record2, (err, result) => {
                    if (err) {
                        throw (err)
                    }
                    if (result.affectedRows == 0) {
                        res.render('swap/item-swap-fail.ejs', {
                            pageTitle: 'Item Swap Failed',
                            successMessage: res.locals.successMessages,
                            failMessage: res.locals.failMessages
                        });
                    } else {
                        db.query(sqlStatement, record3, (err, result) => {
                            if (err) {
                                throw (err)
                            }
                            else {
                                res.render('swap/item-swapped.ejs', {
                                    pageTitle: 'Item Swapped Successfully',
                                    successMessage: res.locals.successMessages,
                                    failMessage: res.locals.failMessages
                                });
                            }
                        });
                    }
                });
            }
        });
    } else {
        req.flash('failMessages', "Can not swap with the same shelf");
        res.redirect('back');
    }
});

module.exports = router;