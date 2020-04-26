// Imports of 'models' each model stores SQL commands and functions related to different object types
// Methods stored in these models used to query, update, delete and create data in SQL database
const express = require('express');
const Item = require('../models/item')
const Shelf = require('../models/shelf')
const Weight = require('../models/weight')
const autoCalc = require('../util/autoCalcWeight')


const router = express.Router();

// help home page
router.get('/', (req, res, next) => {
    res.render('help/help', {
        pageTitle: 'Help page',
        successMessage: res.locals.successMessages,
        failMessage: res.locals.failMessages
    })

})

// page to manually add weights to a specific shelf
// a form with shelf selector and input for weight
router.get('/add-weight', (req, res, next) => {
    const names = [];
    // getting current item on each shelf
    Item.fetchItemNames(names)
        .then(() => {
            // rendering add weight page
            res.render('help/add-weight', {
                pageTitle: 'Add Weight',
                names: names,
                successMessage: res.locals.successMessages,
                failMessage: res.locals.failMessages
            });
        })
        .catch(err => console.log(err));
});

// adding the weight and sending confirmation in the form of a flash message
router.post('/weight-added', (req, res, next) => {
    const shelfPos = req.body.shelfPos;
    // making sure an illegal shelf position has not been selected
    if (shelfPos > 6 || shelfPos < 1) {
        req.flash('failMessages', "No shelf by that id");
        res.status(404).render('404', { pageTitle: 'Page Not Found' });
    }

    // could add check to prevent adding weights to empty shelves here, but is useful when simulating setup with arduino

    const weight = req.body.weight;
    // fetching shelf id from position
    Shelf.fetchIdFromPos(shelfPos)
        .then(([data, meta]) => {
            const shelfId = data[0].id;
            // adding weight to shelf's associated weight table
            Weight.addWeightbyId(shelfId, weight)
        })
        .then(() => {
            // running autocalcWeight to ensure 100% weight reflects the newly added weight
            autoCalc.autoCalcWeight();
            // send flash message confirming weight added and redirect back
            req.flash('successMessages', 'Weight of ' + weight + 'g added to shelf ' + shelfPos);
            res.redirect('back');
        })
        .catch(err => console.log(err));
});



module.exports = router