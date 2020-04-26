const express = require('express');
const mainController = require('../controllers/mainController');

// Imports of 'models' each model stores SQL commands and functions related to different object types
// Methods stored in these models used to query, update, delete and create data in SQL database
const Item = require('../models/item')
const Shelf = require('../models/shelf')

const path = require('path');

// ------ image upload stuff -------
// methods adapted from Brad Traversy at Traversy Media
// https://github.com/bradtraversy/nodeuploads
// and Maximilian Schwarzmüller at Arcademind
// https://github.com/academind/node-restful-api-tutorial/tree/09-image-upload
const multer = require('multer');

//setting the storage location and settings for multer
const storage = multer.diskStorage({
    // selecting storage destination
    destination: function (req, file, cb) {
        cb(null, './public/images/upload')
    },
    // setting the name of the newly created image
    // set to current time and the extension
    filename: function (req, file, cb) {
        cb(null, Date.now() +
            // adding the orginal extension name to the file
            path.extname(file.originalname))
    }
});

// setting the upload settings and conditions for multer
const upload = multer({
    storage: storage,
    limits: { fileSize: 5 * 1024 * 1024 },
    // setting a filter on the filetypes based on the mimetype property of the uploaded file
    fileFilter: function (req, file, cb) {
        // Allowed extension types as a regular expression
        const filetypes = /jpeg|jpg|png|gif/;

        // testing the file mimetype against the allowed extensions
        const mimetype = filetypes.test(file.mimetype);
        if (mimetype) {
            return cb(null, true);
        } else {
            cb('Error: Images Only!');
        }
    }
})
// ------------------------------


const router = express.Router();

// rendering shelf details, logic in controllers/mainController.js
router.get('/:shelfPos', mainController.getShelfDetails);


// edit shelf settings -----------------------------------
router.get('/edit-shelf/:shelfPos', function (req, res) {

    const shelfPos = req.params.shelfPos;
    // getting current shelf settings by shelf position
    let sqlquery = "SELECT * from shelves WHERE shelfPosition = ?";
    let record = [shelfPos];
    db.query(sqlquery, record, (err, result) => {
        if (err) { throw (err) };
        // passing current shelf settings and rendering page
        res.render('shelf-details/edit-shelf-details.ejs', {
            pageTitle: 'Edit Shelf Details',
            shelfInfo: result[0],
            shelfPos: shelfPos,
            successMessage: res.locals.successMessages,
            failMessage: res.locals.failMessages
        });

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
            res.render('shelf-details/changes-saved.ejs', {
                pageTitle: 'Changes Saved',
                shelfPos: shelfPos,
                successMessage: res.locals.successMessages,
                failMessage: res.locals.failMessages
            });
        }
    });

});

// -------------------------------------

//edit item route modified to take shelf Position as a parameter eliminating need for name to be entered
// Logic for edit item-----------------------------------------------------------------------
router.get('/edit-item/:shelfPos', function (req, res) {


    const shelfPos = req.params.shelfPos;
    if (shelfPos > 6 || shelfPos < 1) {
        res.status(404).render('404', {
            pageTitle: 'Page Not Found',
            successMessage: res.locals.successMessages,
            failMessage: res.locals.failMessages
        });
    }
    let itemId = -1;

    let sqlquery = "SELECT items_id FROM shelves WHERE shelves.shelfPosition = ?";
    let record = [shelfPos];

    db.query(sqlquery, record, (err, result) => {
        if (err) { throw (err) };
        console.log(result[0]);

        itemId = result[0].items_id;
        console.log(itemId);
        if (itemId == null || itemId == -1) {
            req.flash('failMessages', "You can't edit an item that doesn't exist");
            res.redirect('../404')
        } else {
            let sqlquery = "SELECT id,name,tags,weight,notes,price,imageLink FROM items WHERE id = ?";
            let record = [itemId];
            db.query(sqlquery, record, (err, result) => {
                if (err) { throw (err) };
                // console.log(result[0]);
                if (result[0] == undefined) {
                    res.render('shelf-details/item-not-found.ejs', {
                        pageTitle: 'Item Not Found',
                        shelfPos: shelfPos,
                        successMessage: res.locals.successMessages,
                        failMessage: res.locals.failMessages
                    });
                }
                else {
                    res.render('shelf-details/edit-item-form.ejs', {
                        pageTitle: 'Edit Item Details',
                        itemName: req.body.name,
                        itemInfo: result[0],
                        shelfPos: shelfPos,
                        successMessage: res.locals.successMessages,
                        failMessage: res.locals.failMessages
                    });
                }
            });
        }
    });
})

// getting updated item data from the edit item form and updating the database record for that item
// then rendering confirmation page
router.post('/edit-item/changes-saved', function (req, res) {
    let imagePath = null;

    // image upload stuff
    upload.single('shelfImage')(req, res, (err) => {
        if (err) {
            console.log(err);
            // should re- render the form here again with old inputs so that changes aren't lost here instead of redirecting
            req.flash('failMessages', "Image upload failed " + err);
            res.redirect('back')
        } else {
            // getting the old image path if exists
            if (req.body.oldImg) {
                console.log('old image detected');
                imagePath = req.body.oldImg
            }
            // checking if a new file was uploaded and replacing path with new files if so
            if (req.file != undefined) {
                imagePath = '/images/upload/' + req.file.filename;
            }
            // check to make sure empty space not entered into database
            let price = req.body.price;
            if (price == "") {
                price = null;
            }
            const itemId = req.body.itemId;
            const shelfPos = req.body.shelfPos;
            console.log(itemId);
            // updating the item record that matches the item id
            let sqlquery = "UPDATE items SET name = ?, tags = ?, weight = ?, notes = ?, price = ?, imageLink = ? WHERE id = ?";
            let record = [req.body.name, req.body.tags, req.body.weight, req.body.notes, price, imagePath, itemId];

            db.query(sqlquery, record, (err, result) => {
                if (err) {
                    throw (err)
                }
                else {
                    //rendering confimationpage
                    res.render('shelf-details/changes-saved.ejs', {
                        pageTitle: 'Changes Saved',
                        shelfPos: shelfPos,
                        successMessage: res.locals.successMessages,
                        failMessage: res.locals.failMessages
                    });
                }
            });
        }
    });

});
// -----------------------------------------------------------------------
// route for setting up a new item on shelf already occupied from shelf details screen

router.get('/confirm-new/:shelfPos', function (req, res) {
    const shelfPos = req.params.shelfPos;
    // making sure an illegal shelf position not passed
    if (shelfPos > 6 || shelfPos < 1) {
        res.status(404).render('404', {
            pageTitle: 'Page Not Found',
            successMessage: res.locals.successMessages,
            failMessage: res.locals.failMessages
        });
    }
    // fetching item id on the shelf that matches the shelfPosition
    Shelf.fetchItemIdFromPos(shelfPos)
        .then(([data, meta]) => {
            const itemId = data[0].items_id
            if (itemId == null) {
                // if no item on shelf, render the normal item setup item form
                return res.render('item-setup/item-form', {
                    pageTitle: 'Replace Item',
                    shelfPos: shelfPos,
                    successMessage: res.locals.successMessages,
                    failMessage: res.locals.failMessages
                })
            } else {
                // if item is on shelf, render confirmation screen which then passes on to normal item setup form
                return Item.findById(itemId)
                    .then(([data, meta]) => {
                        const itemData = data[0];
                        // console.log(itemData.name);
                        res.render('shelf-details/new-item-confirm', {
                            pageTitle: 'Confirm shelf',
                            shelfPos: shelfPos,
                            item: itemData,
                            successMessage: res.locals.successMessages,
                            failMessage: res.locals.failMessages
                        })
                    })
            }
        })
        .catch(err => console.log(err));
})

// route for delete item on shelf from shelf details screen
router.get('/confirm-delete/:shelfPos', function (req, res) {
    const shelfPos = req.params.shelfPos;
    // making sure an illegal shelf position not passed
    if (shelfPos > 6 || shelfPos < 1) {
        res.status(404).render('404', {
            pageTitle: 'Page Not Found',
            successMessage: res.locals.successMessages,
            failMessage: res.locals.failMessages
        });
    }
    // fetching item id on the shelf that matches the shelfPosition
    Shelf.fetchItemIdFromPos(shelfPos)
        .then(([data, meta]) => {
            // console.log('still working');
            const itemId = data[0].items_id
            if (itemId == null) {
                // if no item there redirect to delete page
                req.flash('failMessages', "Tried to delete an already empty shelf");
                console.log('that shelf is already empty')
                return res.redirect("../../delete")
            } else {
                // if item found, get item details by id
                return Item.findById(itemId)
            }
        })
        .then(([data, meta]) => {
            const itemData = data[0];
            console.log(itemData.name);
            // render confirmation screen for deletion that forwards to normal delete route
            res.render('shelf-details/delete-confirm', {
                pageTitle: 'Confirm shelf',
                shelfPos: shelfPos,
                item: itemData,
                successMessage: res.locals.successMessages,
                failMessage: res.locals.failMessages
            })
        })
        .catch(err => console.log(err));
})


module.exports = router;
