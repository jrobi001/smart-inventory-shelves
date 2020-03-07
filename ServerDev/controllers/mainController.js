const Item = require('../models/item')
const Shelf = require('../models/shelf')
const Weight = require('../models/weight')
const Overview = require('../models/overview')

exports.getShelfOverviewList = (req, res, next) => {
    const shelfOverview = new Overview([], null, null, null, null, null, null)
    const weights = [];
    Overview.fetchAllShevesJoinItems(weights)
        .then(([data, meta]) => {
            shelfOverview.shelfItemsJoin = data;
            console.log(shelfOverview.shelfItemsJoin);
            // const shelves = data;
            return Overview.fetchAllWeights(weights)
        }).then(() => {
            console.log(weights);
            res.render('overview-list', {
                pageTitle: 'Shelf Overview List',
                shelves: shelfOverview.shelfItemsJoin,
                weights: weights
            });
        })
        .catch(err => console.log(err));
}

exports.getShelfDetails = (req, res, next) => {
    res.render('test/shelf-details', {
        pageTitle: 'Shelf Details'
    });
}