// Imports of 'models' each model stores SQL commands and functions related to different object types
// Methods stored in these models used to query, update, delete and create data in SQL database
const Item = require('../models/item')
const Shelf = require('../models/shelf')
const Weight = require('../models/weight')
const Overview = require('../models/overview')

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

// renders the shelf selector for item setup
exports.getShefSelector = (req, res, next) => {
    const names = [];
    // filling array 'names' with the item names in order of shelf position
    Item.fetchItemNames(names)
        .then(() => {
            // rendering the shelf selector page and passing the item names to be rendered
            res.render('item-setup/shelf-selector.ejs', {
                pageTitle: 'Shelf selector',
                names: names,
                successMessage: res.locals.successMessages,
                failMessage: res.locals.failMessages
            })
        })
        .catch(err => console.log(err));
}

// wither renders new item form or confirmation screen depending if shelf is filled or not
exports.postConfirmShelf = (req, res, next) => {
    // getting shelf position from the shelf selector form
    const shelfPosition = req.body.shelfPos;
    // fatching the item ID from the shelf Position
    Shelf.fetchItemIdFromPos(shelfPosition)
        .then(([data, meta]) => {
            const itemId = data[0].items_id
            if (itemId == null) {
                // if item id null, then no item on shelf, skip to renderring new item form
                return res.render('item-setup/item-form', {
                    pageTitle: 'Set Up Item',
                    shelfPos: shelfPosition,
                    successMessage: res.locals.successMessages,
                    failMessage: res.locals.failMessages
                })
            } else {
                // if item id not null, then exists, fetch data on that item (by id) to ask for confirmation of deletion
                return Item.findById(itemId)
                    .then(([data, meta]) => {
                        const itemData = data[0];
                        // pass this item data to be rendered in the view
                        res.render('item-setup/confirm-shelf', {
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
}

// renders the new item form
exports.postItemForm = (req, res, next) => {
    // getting the shelf position from the parameters
    const shelfPos = req.params.shelfPos;
    // making sure the shelf position is valid, only 6 shelves currently
    if (shelfPos > 6 || shelfPos < 1) {
        // send 404 if shelf postion invalid
        res.status(404).render('404', {
            pageTitle: 'Page Not Found',
            successMessage: res.locals.successMessages,
            failMessage: res.locals.failMessages
        });
    }
    // rendering the new item form
    res.render('item-setup/item-form', {
        pageTitle: 'Replace Item',
        shelfPos: shelfPos,
        successMessage: res.locals.successMessages,
        failMessage: res.locals.failMessages
    });
}

// renders the shelf settings form after the new item form
exports.postShelfSettings = (req, res, next) => {
    // handling the image upload
    let imagePath = null;
    upload.single('shelfImage')(req, res, (err) => {
        // getting the data input into the new item form
        const itemName = req.body.name;
        const tags = req.body.tags;
        const weight = req.body.weight;
        const notes = req.body.notes;
        let price = req.body.price;
        // making sure blank spaces are converted to null for items stored as numerical types in the database
        if (price == "") {
            price = null;
        }
        const shelfPos = req.body.shelfPos;
        // Using the Item constructor (in models/Item.js) to create an item object (that can be more easily used than individual parameters)
        const newItem = new Item(null, itemName, tags, weight, notes, price, null);

        // error handling for the image upload
        if (err) {
            // image upload failed, either wrong file type or image too large
            console.log(err.message);
            // creating a flash message notifying user that image upload failed
            req.flash('failMessages', "Image upload failed " + err);
            res.locals.failMessages = req.flash('failMessages');
            // re-rendering the item form page with previously filled data (on image upload fail)
            res.render('item-setup/arduino-setup/shelf-filled-form', {
                pageTitle: 'Add item',
                shelfPos: shelfPos,
                newItem: newItem,
                weightDif: newItem.weight,
                successMessage: res.locals.successMessages,
                failMessage: res.locals.failMessages
            });
        } else {
            // image upload succeeded, or no image uploaded
            // console.log(req.file);
            if (req.file != undefined) {
                // creating a path to the newly uploaded image to be stored in the database imageLink field
                newItem.imageLink = '/images/upload/' + req.file.filename;
            }
            // calling the addItem method for Item objects, inserting it into the database
            newItem.addItem()
                .then(() => {
                    // getting the id of the newly set up item - returns the most recent item by that name if multiple exist with the same name
                    return Item.findByName(itemName);
                })
                .then(([data, meta]) => {
                    let itemId = data[0].id;
                    // rendering the shelf settings form
                    res.render('item-setup/shelf-settings', {
                        pageTitle: 'Shelf settings',
                        shelfPos: shelfPos,
                        itemId: itemId,
                        itemName: itemName,
                        successMessage: res.locals.successMessages,
                        failMessage: res.locals.failMessages
                    });
                })
                .catch(err => console.log(err));
        }
    })
}

// setup complete - enters new settings into database and displays confirmation
exports.postSetupComplete = (req, res, next) => {
    // getting data input into the settings form
    const itemName = req.body.itemName;
    const itemId = req.body.itemId;
    const shelfPos = req.body.shelfPos;
    const thrType = req.body.thrType;
    let thrVal = req.body.thrVal
    let hundredPercent = req.body.hundredPercent;
    const autoCalc = req.body.autoCalc;
    const warning = req.body.warning;

    // making sure blank spaces are converted to suitable values for items stored as numerical types in the database
    if (thrVal == "") {
        thrVal = "0";
    }
    if (hundredPercent == "") {
        hundredPercent = null;
    }

    // using the shelf constructor in models/Shelf.js
    const newShelf = new Shelf(null, itemId, shelfPos, '0', thrType, thrVal, hundredPercent, autoCalc, warning);

    console.log(newShelf);
    // overwriting the previous shelf settings with the new shelf settings
    Shelf.overwriteShelf(newShelf)
        .then(() => {
            // getting the shelf Id from shelf position
            return Shelf.fetchIdFromPos(shelfPos);
        }).then(([data, meta]) => {
            const id = data[0].id;
            // deleting all previous weight records of the associated weights table
            return Weight.deleteShelWeightsfById(id)
        }).then(() => {
            // render confirmation message
            res.render('item-setup/setup-complete', {
                pageTitle: 'Setup Complete',
                shelfPos: shelfPos,
                itemName: itemName,
                successMessage: res.locals.successMessages,
                failMessage: res.locals.failMessages
            })
        })
        .catch(err => console.log(err));
}


// routes for setting up item with shelf/Arduino ------------------------------------------------

// start with storing the previously entered form data (from new item form) for later and getting the most recent weight record, to compare against
// asks user to clear shelf and waits a few seconds to allow new data to come in
exports.postShelfWeightDetermination = (req, res, next) => {
    // starts off same as postShelfSettings, getting any filled in item data from the form
    let imagePath = null;
    upload.single('shelfImage')(req, res, (err) => {
        const itemName = req.body.name;
        const tags = req.body.tags;
        const weight = req.body.weight;
        const notes = req.body.notes;
        let price = req.body.price;
        if (price == "") {
            price = null;
        }
        const shelfPos = req.body.shelfPos;
        let shelfId = null;
        // creating a Item object using the constructor in models/Item.js
        // this Item object will be passed through several routes back to a modified item form - essentially saving the previous input
        const newItem = new Item(null, itemName, tags, weight, notes, price, imagePath);

        if (err) {
            console.log(err.message);
            req.flash('failMessages', "Image upload failed " + err);
            res.locals.failMessages = req.flash('failMessages');
            res.render('item-setup/arduino-setup/shelf-filled-form', {
                pageTitle: 'Add item',
                shelfPos: shelfPos,
                newItem: newItem,
                weightDif: newItem.weight,
                successMessage: res.locals.successMessages,
                failMessage: res.locals.failMessages
            });
        } else {
            if (req.file != undefined) {
                newItem.imageLink = '/images/upload/' + req.file.filename;
            }
            // start of differences from postShelfSettings
            // getting shelf id
            Shelf.fetchIdFromPos(shelfPos)
                .then(([data, meta]) => {
                    console.log(data[0]);
                    shelfId = data[0].id;
                    // fetching most recent weight from associated weight table
                    return Overview.fetchWeightById(shelfId)
                })
                .then(([data, meta]) => {
                    // this weight is used as a control value to ensure new weight data is being recieved from the shelf
                    let controlWeightRecord = data[0];
                    console.log(controlWeightRecord);
                    res.render('item-setup/arduino-setup/empty-shelf', {
                        pageTitle: 'Empty Shelf',
                        shelfId: shelfId,
                        shelfPos: shelfPos,
                        //strigify objects so they can be passed through the body of the form (as strings)
                        newItem: JSON.stringify(newItem),
                        controlWeightRecord: JSON.stringify(controlWeightRecord),
                        successMessage: res.locals.successMessages,
                        failMessage: res.locals.failMessages
                    });

                })
                .catch(err => console.log(err));
        }
    })
};

// after waiting a few seconds checks if new data differs from control weight, if so asks user to place one item on shelf
exports.postCheckingEmpty = (req, res, next) => {
    const shelfId = parseInt(req.body.shelfId);
    const shelfPos = parseInt(req.body.shelfPos);
    // re-converting the stringified newItem back to a JSON object
    const newItem = JSON.parse(req.body.newItem);

    const controlWeightRecord = req.body.controlWeightRecord;

    // getting most recent weight from associated weights table
    Overview.fetchWeightById(shelfId)
        .then(([data, meta]) => {

            let zeroRecord = data[0];
            console.log(controlWeightRecord);
            console.log(JSON.stringify(zeroRecord));

            // checking if the zero weight record and control weight record differ
            if (controlWeightRecord == JSON.stringify(zeroRecord)) {
                // if match then no new weight data has come in, either shelf is not connected or is malfunctioning
                req.flash('failMessages', "No new weight data detected");
                res.locals.failMessages = req.flash('failMessages');
                // renders back to previous page
                res.render('item-setup/arduino-setup/empty-shelf', {
                    pageTitle: 'Empty Shelf',
                    shelfId: shelfId,
                    shelfPos: shelfPos,
                    //strigify objects so they can be passed through the body of the form
                    newItem: JSON.stringify(newItem),
                    controlWeightRecord: controlWeightRecord,
                    successMessage: res.locals.successMessages,
                    failMessage: res.locals.failMessages
                });
            } else {
                // if results do differ, then take this new record to be the 'zero weight'
                req.flash('successMessages', "New weight data detected");
                res.locals.successMessages = req.flash('successMessages');
                // render page asking user to place one item on the shelf
                res.render('item-setup/arduino-setup/new-weight', {
                    pageTitle: 'Place 1 item',
                    shelfId: shelfId,
                    shelfPos: shelfPos,
                    itemName: newItem.name,
                    //strigify objects so they can be passed through the body of the form
                    newItem: JSON.stringify(newItem),
                    zeroRecord: JSON.stringify(zeroRecord),
                    successMessage: res.locals.successMessages,
                    failMessage: res.locals.failMessages
                });
            }
        })
        .catch(err => console.log(err));
}

// checking if the weight of one item measured is what the user expects
exports.postConfirmWeight = (req, res, next) => {
    const shelfId = parseInt(req.body.shelfId);
    const shelfPos = parseInt(req.body.shelfPos);
    const newItem = JSON.parse(req.body.newItem);
    // console.log(newItem);
    let zeroRecord = req.body.zeroRecord;
    // getting most recent weight from associated weights table
    Overview.fetchWeightById(shelfId)
        .then(([data, meta]) => {
            let oneRecord = data[0];
            console.log(zeroRecord);
            console.log(JSON.stringify(oneRecord));

            // checking if the any new weight data exists in the table
            if (zeroRecord == JSON.stringify(oneRecord)) {
                req.flash('failMessages', "No new weight data detected");
                res.locals.failMessages = req.flash('failMessages');
                res.render('item-setup/arduino-setup/new-weight', {
                    pageTitle: 'Place 1 item',
                    shelfId: shelfId,
                    shelfPos: shelfPos,
                    itemName: newItem.name,
                    //strigify objects so they can be passed through the body of the form
                    newItem: JSON.stringify(newItem),
                    zeroRecord: zeroRecord,
                    successMessage: res.locals.successMessages,
                    failMessage: res.locals.failMessages
                });

            } else {
                // new weight record exists, parse zero record and subtract the zero weight from the weight gathered for one item to get the difference
                zeroRecord = JSON.parse(zeroRecord)
                let weightDif = parseInt(oneRecord.weight) - parseInt(zeroRecord.weight)
                console.log(weightDif);
                // pass the weight difference to page asking for confirmation if weight seems right
                res.render('item-setup/arduino-setup/confirm-weight', {
                    pageTitle: 'Correct weight?',
                    shelfId: shelfId,
                    shelfPos: shelfPos,
                    itemName: newItem.name,
                    //strigify objects so they can be passed through the body of the form
                    newItem: JSON.stringify(newItem),
                    zeroRecord: JSON.stringify(zeroRecord),
                    weightDif: weightDif,
                    successMessage: res.locals.successMessages,
                    failMessage: res.locals.failMessages
                });

            }
        })
        .catch(err => console.log(err));
}

// after confirming weight seems right, pass on to modified new item form with weight difference inserted as well as any previously inserted data
exports.postShelfFilledForm = (req, res, next) => {
    const shelfPos = parseInt(req.body.shelfPos);
    const newItem = JSON.parse(req.body.newItem);
    let weightDif = parseInt(req.body.weightDif);
    // passing the item data from the original form (newItem) and the weight defference to a modified new item form
    res.render('item-setup/arduino-setup/shelf-filled-form', {
        pageTitle: 'Add item',
        shelfPos: shelfPos,
        newItem: newItem,
        weightDif: weightDif,
        successMessage: res.locals.successMessages,
        failMessage: res.locals.failMessages
    });
}
// ----------------------------------------------------------------------------------