const Item = require('../models/item')
const Shelf = require('../models/shelf')
const Weight = require('../models/weight')
const Overview = require('../models/overview')


exports.getShefSelector = (req, res, next) => {
    const names = [];
    Item.fetchItemNames(names)
        .then(() => {
            // console.log(names);
            res.render('item-setup/shelf-selector.ejs', {
                pageTitle: 'Shelf selector',
                names: names
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
                    pageTitle: 'Replace Item',
                    shelfPos: shelfPosition,
                })
            } else {
                return Item.findById(itemId)
                    .then(([data, meta]) => {
                        const itemData = data[0];
                        // console.log(itemData.name);
                        res.render('item-setup/confirm-shelf', {
                            pageTitle: 'Confirm shelf',
                            shelfPos: shelfPosition,
                            item: itemData
                        })
                    })
            }
        })
        .catch(err => console.log(err));
}

exports.postItemForm = (req, res, next) => {
    const shelfPos = req.params.shelfPos;
    if (shelfPos > 6 || shelfpos < 1) {
        res.status(404).render('404.html', { pageTitle: 'Page Not Found' });
    }
    res.render('item-setup/item-form', {
        pageTitle: 'Replace Item',
        shelfPos: shelfPos
    });
}

exports.postShelfSettings = (req, res, next) => {
    const itemName = req.body.name;
    const tags = req.body.tags;
    const weight = req.body.weight;
    const notes = req.body.notes;
    let price = req.body.price;
    if (price == "") {
        price = null;
    }
    const imageLink = req.body.imageLink;
    const shelfPos = req.body.shelfPos;

    const newItem = new Item(null, itemName, tags, weight, notes, price, imageLink);
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
                itemName: itemName
            });
        })
        .catch(err => console.log(err));
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
                itemName: itemName
            })
        })
        .catch(err => console.log(err));
}
