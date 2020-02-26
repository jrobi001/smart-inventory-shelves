const express = require('express');

const testController = require('../controllers/test');
const mainController = require('../controllers/mainController');



const router = express.Router();

//routes can be placed here as in data web if wanted
router.get('/', (req, res, next) => {
    let sqlQuery = "SELECT * FROM shelves";
    db.query(sqlQuery, (err, result) => {
        if (err) {
            res.redirect('./');
        }
        console.log(result);
        res.render('dev-home');
    });

});

router.get('/template-example', (req, res, next) => {
    res.render('template-example', {
        pageTitle: 'template example'
    });
});

router.get('/overview-list', mainController.getShelfOverviewList);

module.exports = router