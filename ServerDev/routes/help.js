const express = require('express');
const Item = require('../models/item')
const Shelf = require('../models/shelf')
const Weight = require('../models/weight')

//files containing routing logic in /controllers
const mainController = require('../controllers/mainController');

const router = express.Router();

router.get('/', (req, res, next) => {
    res.render('help/help', {
        pageTitle: 'Help page'
    })

})

router.get('/add-weight', (req, res, next) => {
    const names = [];
    Item.fetchItemNames(names)
        .then(() => {
            // console.log(names);
            res.render('help/add-weight', {
                pageTitle: 'Add Weight',
                names: names
            });
        })
        .catch(err => console.log(err));
});

router.post('/weight-added', (req, res, next) => {
    const shelfPos = req.body.shelfPos;
    if (shelfPos > 6 || shelfpos < 1) {
        res.status(404).render('404.html', { pageTitle: 'Page Not Found' });
    }
    const weight = req.body.weight;
    Shelf.fetchIdFromPos(shelfPos)
        .then(([data, meta]) => {
            const shelfId = data[0].id;
            // console.log(shelfId);
            Weight.addWeightbyId(shelfId, weight)
        })
        .then(
            res.render('help/add-weight-complete', {
                pageTitle: 'weight added',
                shelfPos: shelfPos,
                weight: weight
            })
        )
        .catch(err => console.log(err));
});



module.exports = router