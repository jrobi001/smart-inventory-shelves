// Imports of 'models' each model stores SQL commands and functions related to different object types
// Methods stored in these models used to query, update, delete and create data in SQL database
const Overview = require('../models/overview')

// logic for the shelf overview page (home page) gets information on all the shelves and performs most calculations before passing data to the page for rendering
exports.getShelfOverviewList = (req, res, next) => {
    //if exists, getting the sort type from the parameters, else setting the sort type to position (default)
    // sort types are 'pos' - position, 'per' - percentage weight, 'abs' - absolute weight & 'itm' - number of items remaining
    let sortType = 'pos';
    if (req.query.sort != undefined) {
        sortType = req.query.sort;
    }
    //initialising variables and arrays to store data
    const overviewArr = [];
    let shelfItemsDetails;
    let weights = [];
    // fetches the shelf and item data (if item exists) for all shelves
    Overview.fetchAllShevesJoinItems()
        .then(([data, meta]) => {
            shelfItemsDetails = data;
            // fetching most recent weight data for all shelves
            return Overview.fetchAllWeights(weights)
        }).then(() => {
            console.log(sortType);

            //creating a 2d array for each shelf, pos1 shelfWeight, pos2 the shelf + item details. Allows both to be sorted together
            // each shelf will have an array with two values [mostRecentWeight, shelf&ItemData]
            for (let i = 0; i < weights.length; i++) {
                let box = [];
                box.push(weights[i]);
                box.push(shelfItemsDetails[i]);
                overviewArr.push(box);
            }
            // --- different sorts for each overview type) ---

            // order by shelf position descending
            if (sortType == 'pos') {
                //sorting by shelfPosition
                overviewArr.sort((a, b) => {
                    return a[1].shelfPosition - b[1].shelfPosition;
                })
            }

            // order by percentage weight descending
            if (sortType == 'per') {
                // sorting by percentage
                overviewArr.sort((a, b) => {
                    // most recent weight / shelf hundred percent weight
                    let aPer = a[0] / a[1].hundredPercent;
                    let bPer = b[0] / b[1].hundredPercent;
                    // dealing with NaN values, answer by Fabian N. on StackOverflow
                    //https://stackoverflow.com/questions/17557807/javascript-how-do-you-sort-an-array-that-includes-nans
                    // ensuring empty shelf is placed at bottom/top
                    if (isNaN(aPer)) {
                        return 1 - isNaN(bPer);
                    }
                    return aPer - bPer;
                })
            }

            // sort by number of items left descending
            if (sortType == 'itm') {
                // sorting by Items left
                overviewArr.sort((a, b) => {
                    // most recent weight / item weight
                    let aPer = a[0] / a[1].weight;
                    let bPer = b[0] / b[1].weight;
                    // dealing with NaN values, answer by Fabian N. on StackOverflow
                    //https://stackoverflow.com/questions/17557807/javascript-how-do-you-sort-an-array-that-includes-nans
                    // ensuring empty shelf is placed at bottom/top
                    if (isNaN(aPer)) {
                        return 1 - isNaN(bPer);
                    }
                    return aPer - bPer;
                })
            }

            // sort by absolute weight descending
            if (sortType == 'abs') {
                // Absoulte Weight
                overviewArr.sort((a, b) => {
                    return a[0] - b[0];
                })
            }
            // ---------------------------------------------

            // seperating out the 2d array to two individual arrays
            // done because page was made before sort types made
            weights = [];
            shelfItemsDetails = [];
            for (const el of overviewArr) {
                weights.push(el[0]);
                shelfItemsDetails.push(el[1]);

            }

            // passing the weights and item data to the overview page to render
            res.render('overview-list', {
                pageTitle: 'Shelf Overview List',
                shelves: shelfItemsDetails,
                weights: weights,
                sort: sortType,
                successMessage: res.locals.successMessages,
                failMessage: res.locals.failMessages
            });
        })
        .catch(err => console.log(err));
}

// development page that shows the shelf details layout with dummy data - used to build page
exports.getShelfDetailsLayout = (req, res, next) => {
    res.render('test/shelf-details-layout', {
        pageTitle: 'Shelf Details',
        successMessage: res.locals.successMessages,
        failMessage: res.locals.failMessages
    });
}

// logic for the shelf details pages, accessed through GET with shelf position as an address parameter
exports.getShelfDetails = (req, res, next) => {
    const shelfPos = req.params.shelfPos;
    //making sure nobody tries to access shelves that don't exist (could crash)
    if (shelfPos < 1 || shelfPos > 6) {
        res.status(404).render('404', {
            pageTitle: 'Page Not Found',
            successMessage: res.locals.successMessages,
            failMessage: res.locals.failMessages
        });
    }
    //initialising shelfDetails
    let shelfDetails = 0;
    // getting the item and shelf data for a specific shelf by shelfPosition
    Overview.fetchShelvesJoinByPos(shelfPos)
        .then(([data, meta]) => {
            shelfDetails = data[0];
            // fetching the most recent weight from the associated weights table
            return Overview.fetchWeightById(shelfDetails.id)
        })
        .then(([data, meta]) => {
            //checking if there are any weight records
            console.log(data[0]);

            // checking if there are any weights
            let shelfWeight = null;
            if (data[0] == undefined) {
                shelfWeight = null;
            } else {
                shelfWeight = data[0].weight
            }
            console.log(shelfDetails);
            // passing data to the shelf details page to further process and render
            res.render('shelf-details/shelf-details', {
                pageTitle: 'Shelf Details',
                details: shelfDetails,
                weight: shelfWeight,
                successMessage: res.locals.successMessages,
                failMessage: res.locals.failMessages
            });
        })
        .catch(err => console.log(err));
}