const Item = require('../models/item')

exports.getAddItem = (req, res, next) => {
    res.render('test/add-item-form', {
        pageTitle: 'Add Item'
    });
}

exports.postAddItem = (req, res, next) => {
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
    res.redirect('/');
}

exports.getSetUpShelf = (req, res, next) => {

}