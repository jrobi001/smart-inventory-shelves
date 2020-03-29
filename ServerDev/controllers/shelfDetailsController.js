const Item = require('../models/item')
const Shelf = require('../models/shelf')
const Weight = require('../models/weight')
const Overview = require('../models/overview')

exports.getShelfSettings = (req, res) => {
    const shelfPos = req.params.shelfPos;
    if (shelfPos > 6 || shelfPos < 1) {
        res.status(404).render('404.html', { pageTitle: 'Page Not Found' });
    }
    Shelf.fetchByPos(shelfPos)
        .then(([data, meta]) => {
            const shelf = data[0];
            console.log(shelf);
            res.send('works so far');

        })
        .catch(err => console.log(err));
}