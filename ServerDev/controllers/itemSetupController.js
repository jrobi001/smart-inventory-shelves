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
    console.log('hello');
    const shelfPosition = req.body.shelfPos;
    console.log(shelfPosition)
    Shelf.fetchItemIdFromPos(shelfPosition)
        .then(([data, meta]) => {
            console.log('still working');
            const itemId = data[0].items_id
            if (itemId == null) {
                return res.render('item-setup/item-form', {
                    pageTitle: 'Replace Item',
                    shelfPos: shelfPosition
                })
            } else {
                return Item.findById(itemId)
            }
            //if (itemId == null), skip confirm shelf => add-item
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
            return Item.findById(itemId);
        })
        .then(([data, meta]) => {
            item = data[0];
            console.log(item);
            res.send('this is working');

        })

        .catch(err => console.log(err));
}
