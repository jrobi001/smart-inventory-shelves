const express = require('express');
const Item = require('../models/item')
const Shelf = require('../models/shelf')
const Weight = require('../models/weight')

const router = express.Router();

router.get('/', (req, res, next) => {
    res.render('help/help', {
        pageTitle: 'Help page',
        successMessage: res.locals.successMessages,
        failMessage: res.locals.failMessages
    })

})

router.get('/add-weight', (req, res, next) => {
    const names = [];
    Item.fetchItemNames(names)
        .then(() => {
            // console.log(names);
            res.render('help/add-weight', {
                pageTitle: 'Add Weight',
                names: names,
                successMessage: res.locals.successMessages,
                failMessage: res.locals.failMessages
            });
        })
        .catch(err => console.log(err));
});

router.post('/weight-added', (req, res, next) => {
    const shelfPos = req.body.shelfPos;
    if (shelfPos > 6 || shelfPos < 1) {
        req.flash('failMessages', "No shelf by that id");
        res.status(404).render('404', { pageTitle: 'Page Not Found' });
    }
    const weight = req.body.weight;
    Shelf.fetchIdFromPos(shelfPos)
        .then(([data, meta]) => {
            const shelfId = data[0].id;
            // console.log(shelfId);
            Weight.addWeightbyId(shelfId, weight)
        })
        .then(() => {
            req.flash('successMessages', 'Weight of ' + weight + 'g added to shelf ' + shelfPos);
            res.redirect('back');
        })
        .catch(err => console.log(err));
});



module.exports = router