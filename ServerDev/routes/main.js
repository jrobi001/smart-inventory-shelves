const http = require("http");
const express = require('express');
const mysql = require('mysql');
const bodyParser = require('body-parser');

const itemSetupController = require('../controllers/itemSetupController');
const mainController = require('../controllers/mainController');

const router = express.Router();

router.use(bodyParser.json());
router.use(bodyParser.urlencoded({
    extended: true
}))

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


router.get('/delete', function(req,res){
    res.render('shelf-selector-delete.ejs');
})

router.post('/delete-result', function (req,res){
    let sqlquery = "UPDATE shelves SET items_id = NULL, updateFrequency = '0', thresholdType = 'NUMBER', thresholdAbsolute = '0', thresholdNumber = '0', thresholdPercent = '0', 100percentWeight = NULL, autocalc100Percent = '0', warning = '1' WHERE shelfPosition = ?";
    let newrecord = [req.body.name];
    if(newrecord == 1 || newrecord == 2 || newrecord == 3 || newrecord == 4 || newrecord == 5 || newrecord == 6){
        db.query(sqlquery, newrecord, (err, result) => {
            if(err) {
                return console.error(err.message);
            } else {
                res.send('You have deleted the data on shelf ' + req.body.name) 
            };
        });
        } else {
            res.redirect('/delete')
        }
    })


router.get('/template-example', (req, res, next) => {
    res.render('template-example', {
        pageTitle: 'template example'
    });
});

router.get('/overview-list', mainController.getShelfOverviewList);

module.exports = router