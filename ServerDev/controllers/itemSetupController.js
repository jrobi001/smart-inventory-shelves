const Item = require('../models/item')
const Shelf = require('../models/shelf')
const Weight = require('../models/weight')
const Overview = require('../models/overview')


exports.getShefSelector = (req, res, next) => {
    console.log('shelf selector');
    res.render('item-setup/shelf-selector.ejs', {
        pageTitle: 'Shelf selector'
    })
}

exports.postConfirmShelf = (req, res, next) => {
    // console.log('hello');
    const shelfPosition = req.body.shelfPos;
    // console.log(shelfPosition)
    Shelf.fetchItemIdFromPos(shelfPosition)
        .then(([data, meta]) => {
            // console.log('still working');
            const itemId = data[0].items_id
            if (itemId == null) {
                return res.render('item-setup/item-form', {
                    pageTitle: 'Replace Item',
                    shelfPos: shelfPosition
                })
            } else {
                return Item.findById(itemId)
            }
        }).then(([data, meta]) => {
            const itemData = data[0];
            console.log(itemData.name);
            res.render('item-setup/confirm-shelf', {
                pageTitle: 'Confirm shelf',
                shelfPos: shelfPosition,
                item: itemData
            })
        })
        .catch(err => console.log(err));
}

exports.postItemForm = (req, res, next) => {
    const shelfPos = req.params.shelfPos;
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
    const price = req.body.price;
    const imageLink = req.body.imageLink;
    const shelfPos = req.body.shelfPos;

    const newItem = new Item(null, itemName, tags, weight, notes, price, imageLink);
    newItem.addItem()
        .then(() => {
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

exports.getEditItem = (req, res, next) => {
    const shelfPos = req.params.shelfPos;
    Shelf.fetchItemIdFromPos(shelfPos)
        .then(([data, meta]) => {
            const itemId = data[0].items_id;
            console.log(itemId)
            if (itemId == null) {
                res.send('that shelf is empty, maybe we will redirect to the add item page hehre!')
            }
            return Item.findById(itemId);
        })
        .then(([data, meta]) => {
            item = data[0];
            // console.log(item);
            res.render('item-setup/edit-item', {
                pageTitle: 'edit item',
                shelfPos: shelfPos,
                itemId: item.id,
                itemName: item.name,
                itemTags: item.tags,
                itemWeight: item.weight,
                itemNotes: item.notes,
                itemPrice: item.price,
                itemImageLink: item.imageLink
            });
        })
        .catch(err => console.log(err));
}

exports.postEditConfirmed = (req, res, next) => {
    const itemName = req.body.name;
    const tags = req.body.tags;
    const weight = req.body.weight;
    const notes = req.body.notes;
    const price = req.body.price;
    const imageLink = req.body.imageLink;
    const itemId = parseInt(req.body.itemId);
    const shelfPos = req.body.shelfPos;


    const editedItem = new Item(itemId, itemName, tags, weight, notes, price, imageLink);
    // console.log(editedItem);
    editedItem.updateItem()
        .then(
            res.send('congrats the item ' + itemName + ' on shelf ' + itemId + 'has been updated')
        )
        .catch(err => console.log(err));
}
