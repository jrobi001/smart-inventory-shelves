const Item = require('../models/item')
const Shelf = require('../models/shelf')

exports.getShelfOverview = (req, res, next) => {
    res.render('test/overview-list', {
        pageTitle: 'Shelf Overview List'
    });
}

exports.getShefSelector = (req, res, next) => {
    res.render('test/shelf-selector.ejs', {
        pageTitle: 'Shelf selector'
    })
}

exports.postShelfSelector = (req, res, next) => {
    const shelfPosition = req.body.shelfPos;
    console.log(shelfPosition)
    Shelf.fetchItemIdFromPos(shelfPosition)
        .then(([data, meta]) => {
            const itemId = data[0].items_id
            //if (itemId == null), skip confirm shelf => add-item
            return Item.findById(itemId)
        }).then(([data, meta]) => {
            const itemData = data[0];
            console.log(itemData.name);
            res.render('test/confirm-shelf', {
                pageTitle: 'Confirm shelf',
                shelfPos: shelfPosition,
                item: itemData
            })
        })
        .catch(err => console.log(err));
}

exports.getReplaceItem = (req, res, next) => {
    const shelfPos = req.params.shelfPos;
    res.render('test/replace-item-form', {
        pageTitle: 'Replace Item',
        shelfPos: shelfPos
    });
}

exports.postReplaceItem = (req, res, next) => {
    const itemName = req.body.name;
    const tags = req.body.tags;
    const weight = req.body.weight;
    const notes = req.body.notes;
    const price = req.body.price;
    const imageLink = req.body.imageLink;

    const newItem = new Item(null, itemName, tags, weight, notes, price, imageLink);
    newItem.addItem()
        .then(() => {
            console.log('success new item ' + itemName + ' has been added')
            res.redirect('/');
        })
        .catch(err => console.log(err));
}


exports.getSetUpShelf = (req, res, next) => {

}