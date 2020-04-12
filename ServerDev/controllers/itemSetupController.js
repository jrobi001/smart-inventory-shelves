const Item = require('../models/item')
const Shelf = require('../models/shelf')
const Weight = require('../models/weight')

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


exports.getShefSelector = (req, res, next) => {
    const names = [];
    Item.fetchItemNames(names)
        .then(() => {
            // console.log(names);
            res.render('item-setup/shelf-selector.ejs', {
                pageTitle: 'Shelf selector',
                names: names,
                successMessage: res.locals.successMessages,
                failMessage: res.locals.failMessages
            })
        })
        .catch(err => console.log(err));
}

exports.postConfirmShelf = (req, res, next) => {
    const shelfPosition = req.body.shelfPos;
    // console.log(shelfPosition)
    Shelf.fetchItemIdFromPos(shelfPosition)
        .then(([data, meta]) => {
            const itemId = data[0].items_id
            if (itemId == null) {
                return res.render('item-setup/item-form', {
                    pageTitle: 'Set Up Item',
                    shelfPos: shelfPosition,
                    successMessage: res.locals.successMessages,
                    failMessage: res.locals.failMessages
                })
            } else {
                return Item.findById(itemId)
                    .then(([data, meta]) => {
                        const itemData = data[0];
                        // console.log(itemData.name);
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

exports.postItemForm = (req, res, next) => {
    const shelfPos = req.params.shelfPos;
    if (shelfPos > 6 || shelfPos < 1) {
        res.status(404).render('404', {
            pageTitle: 'Page Not Found',
            successMessage: res.locals.successMessages,
            failMessage: res.locals.failMessages
        });
    }
    res.render('item-setup/item-form', {
        pageTitle: 'Replace Item',
        shelfPos: shelfPos,
        successMessage: res.locals.successMessages,
        failMessage: res.locals.failMessages
    });
}

exports.postShelfSettings = (req, res, next) => {
    let imagePath = null;
    upload.single('shelfImage')(req, res, (err) => {
        if (err) {
            console.log(err.message);
            req.flash('failMessages', "Image upload failed " + err);
            res.redirect('back')
        } else {
            console.log(req.file);
            if (req.file != undefined) {
                imagePath = '/images/upload/' + req.file.filename;
            }
            const itemName = req.body.name;
            const tags = req.body.tags;
            const weight = req.body.weight;
            const notes = req.body.notes;
            let price = req.body.price;
            if (price == "") {
                price = null;
            }
            const shelfPos = req.body.shelfPos;

            const newItem = new Item(null, itemName, tags, weight, notes, price, imagePath);
            newItem.addItem()
                .then(() => {
                    // getting the id of the newly swt up item
                    return Item.findByName(itemName);
                })
                .then(([data, meta]) => {
                    itemId = data[0].id;
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

//I think a new route confirming settings before clearing the current shelf....
exports.postSetupComplete = (req, res, next) => {
    const itemName = req.body.itemName;

    const itemId = req.body.itemId;
    const shelfPos = req.body.shelfPos;
    const thrType = req.body.thrType;
    let thrVal = req.body.thrVal
    let hundredPercent = req.body.hundredPercent;
    const autoCalc = req.body.autoCalc;
    const warning = req.body.warning;

    if (thrVal == "") {
        thrVal = "0";
    }
    if (hundredPercent == "") {
        hundredPercent = null;
    }

    const newShelf = new Shelf(null, itemId, shelfPos, '0', thrType, thrVal, hundredPercent, autoCalc, warning);

    console.log(newShelf);
    Shelf.overwriteShelf(newShelf)
        .then(() => {
            return Shelf.fetchIdFromPos(shelfPos);
        }).then(([data, meta]) => {
            const id = data[0].id;
            return Weight.deleteShelWeightsfById(id)
        }).then(() => {
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
