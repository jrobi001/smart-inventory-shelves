const Item = require('../models/item')
const Shelf = require('../models/shelf')
const Weight = require('../models/weight')
const Overview = require('../models/overview')

exports.getShelfOverviewList = (req, res, next) => {
    const shelfOverview = new Overview([], null, null, null, null, null, null)
    Overview.fetchAllShevesJoinItems()
        .then(([data, meta]) => {
            shelfOverview.shelfItemsJoin = data;
            // const shelves = data;
            return Overview.fetchWeightId1();
        })
        .then(([data, meta]) => {
            shelfOverview.weightId1 = data[0].weight;
            // const weightId1 = data[0].weight;
            return Overview.fetchWeightId2();
        })
        .then(([data, meta]) => {
            shelfOverview.weightId2 = data[0].weight;
            return Overview.fetchWeightId3();
        })
        .then(([data, meta]) => {
            shelfOverview.weightId3 = data[0].weight;
            return Overview.fetchWeightId4();
        })
        .then(([data, meta]) => {
            shelfOverview.weightId4 = data[0].weight;
            return Overview.fetchWeightId5();
        })
        .then(([data, meta]) => {
            shelfOverview.weightId5 = data[0].weight;
            return Overview.fetchWeightId6();
        })
        .then(([data, meta]) => {
            shelfOverview.weightId6 = data[0].weight;
            const weightArr = [
                shelfOverview.weightId1,
                shelfOverview.weightId2,
                shelfOverview.weightId3,
                shelfOverview.weightId4,
                shelfOverview.weightId5,
                shelfOverview.weightId5
            ];
            // console.log(weightArr);
            res.render('test/overview-list', {
                pageTitle: 'Shelf Overview List',
                shelves: shelfOverview.shelfItemsJoin,
                weights: weightArr
            });
        })
        .catch(err => console.log(err));
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