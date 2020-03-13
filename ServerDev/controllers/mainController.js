const Item = require('../models/item')
const Shelf = require('../models/shelf')
const Weight = require('../models/weight')
const Overview = require('../models/overview')

exports.getShelfOverviewList = (req, res, next) => {
    const shelfOverview = new Overview([], null, null, null, null, null, null)
    const weights = [];
    Overview.fetchAllShevesJoinItems()
        .then(([data, meta]) => {
            shelfOverview.shelfItemsJoin = data;
            // console.log(shelfOverview.shelfItemsJoin);
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

exports.getShelfDetailsLayout = (req, res, next) => {
    res.render('test/shelf-details-layout', {
        pageTitle: 'Shelf Details'
    });
}

exports.getShelfDetails = (req, res, next) => {
    const shelfPos = req.params.shelfPos;
    //making sure nobody tries to access shelves that don't exist
    if (shelfPos < 1 || shelfPos > 6) {
        res.status(404).render('404.html', { pageTitle: 'Page Not Found' });
    }
    //initialising shelfDetails
    let shelfDetails = 0;
    Overview.fetchShelvesJoinByPos(shelfPos)
        .then(([data, meta]) => {
            shelfDetails = data[0];
            console.log(shelfDetails)
            // making sure an item is set up on the shelf
            if (shelfDetails.items_id == null) {
                res.send('That shelf is empty, a different page will go here')
            }
            return Overview.fetchWeightById(shelfDetails.id)
        })
        .then(([data, meta]) => {
            //checking if there are any weight records
            let shelfWeight = data[0];
            if (shelfWeight == null) {
                shelfWeight = null;
            } else {
                shelfWeight = shelfWeight.weight
            }
            console.log(shelfWeight);
            res.render('shelf-details/shelf-details', {
                pageTitle: 'Shelf Details',
                details: shelfDetails,
                weight: shelfWeight
            });
        })
        .catch(err => console.log(err));


}

exports.postWeightAdded = (req, res, next) => {
    const shelfPos = req.body.shelfPos;
    const weight = req.body.weight;
    Shelf.fetchIdFromPos(shelfPos)
        .then(([data, meta]) => {
            const shelfId = data[0].id;
            console.log(shelfId);
            Weight.addWeightbyId(shelfId, weight)
        })
        .then(
            res.render('test/add-weight-complete', {
                pageTitle: 'weight added',
                shelfPos: shelfPos,
                weight: weight
            })
        )
        .catch(err => console.log(err));
}