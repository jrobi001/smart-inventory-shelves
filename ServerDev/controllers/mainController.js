const Item = require('../models/item')
const Shelf = require('../models/shelf')
const Weight = require('../models/weight')
const Overview = require('../models/overview')

exports.getShelfOverviewList = (req, res, next) => {
    //if exists, getting the sort type from the parameters
    let sortType = 'pos';
    if (req.query.sort != undefined) {
        sortType = req.query.sort;
    }
    const overviewArr = [];
    let shelfItemsDetails;
    let weights = [];
    Overview.fetchAllShevesJoinItems()
        .then(([data, meta]) => {
            shelfItemsDetails = data;
            // console.log(shelfItemsDetails);
            // const shelves = data;
            return Overview.fetchAllWeights(weights)
        }).then(() => {
            console.log(sortType);

            //[weight, data, pergentagefull, number of items]
            //creating a 2d array for each shelf, pos1 shelfWeight, pos2 the shelf + item details
            for (let i = 0; i < weights.length; i++) {
                let box = [];
                box.push(weights[i]);
                box.push(shelfItemsDetails[i]);
                overviewArr.push(box);
            }

            if (sortType == 'pos') {
                //sorting by shelfPosition
                overviewArr.sort((a, b) => {
                    return a[1].shelfPosition - b[1].shelfPosition;
                })
            }

            if (sortType == 'per') {
                // sorting by percentage
                overviewArr.sort((a, b) => {
                    let aPer = a[0] / a[1].hundredPercent;
                    let bPer = b[0] / b[1].hundredPercent;
                    //https://stackoverflow.com/questions/17557807/javascript-how-do-you-sort-an-array-that-includes-nans
                    // ensuring empty shelf is placed at bottom/top
                    if (isNaN(aPer)) {
                        return 1 - isNaN(bPer);
                    }
                    return aPer - bPer;
                })
            }
            if (sortType == 'itm') {
                // sorting by Items left
                overviewArr.sort((a, b) => {
                    let aPer = a[0] / a[1].weight;
                    let bPer = b[0] / b[1].weight;
                    //https://stackoverflow.com/questions/17557807/javascript-how-do-you-sort-an-array-that-includes-nans
                    // ensuring empty shelf is placed at bottom/top
                    if (isNaN(aPer)) {
                        return 1 - isNaN(bPer);
                    }
                    return aPer - bPer;
                })
            }
            if (sortType == 'abs') {
                // Absoulte Weight
                overviewArr.sort((a, b) => {
                    return a[0] - b[0];
                })
            }
            weights = [];
            shelfItemsDetails = [];
            for (const el of overviewArr) {
                weights.push(el[0]);
                shelfItemsDetails.push(el[1]);

            }
            // console.log(weights);
            res.render('overview-list', {
                pageTitle: 'Shelf Overview List',
                shelves: shelfItemsDetails,
                weights: weights,
                sort: sortType
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
            // console.log(shelfDetails)
            // making sure an item is set up on the shelf
            // if (shelfDetails.items_id == null) {
            //     res.send('That shelf is empty, a different page will go here')
            // }
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
            console.log(shelfDetails);
            res.render('shelf-details/shelf-details', {
                pageTitle: 'Shelf Details',
                details: shelfDetails,
                weight: shelfWeight
            });
        })
        .catch(err => console.log(err));
}