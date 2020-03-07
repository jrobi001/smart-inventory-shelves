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
                shelfOverview.weightId6
            ];
            console.log(shelfOverview.shelfItemsJoin);
            res.render('overview-list', {
                pageTitle: 'Shelf Overview List',
                shelves: shelfOverview.shelfItemsJoin,
                weights: weightArr
            });
        })
        .catch(err => console.log(err));
}

exports.getOverviewTest = (req, res, next) => {
    const shelfOverview = new Overview([], null, null, null, null, null, null)
    Overview.fetchAllWeights()
        .then(([data, meta]) => {
            console.log(data);
            res.send('at least this page loads')
        })
}