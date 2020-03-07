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
        
        res.render('dev-home');
    });

});
router.get('/404', function (req, res) {
    res.render('404.ejs', { pageTitle: '404 ERROR' });

})

router.get('/delete', function (req, res) {
    res.render('shelf-selector-delete.ejs');
})

router.post('/delete-result', function (req, res) {
    let sqlquery = "UPDATE shelves SET items_id = NULL, updateFrequency = '0', thresholdType = 'NUMBER', thresholdAbsolute = '0', thresholdNumber = '0', thresholdPercent = '0', 100percentWeight = NULL, autocalc100Percent = '0', warning = '1' WHERE shelfPosition = ?";
    let newrecord = [req.body.name];
    if (newrecord == 1 || newrecord == 2 || newrecord == 3 || newrecord == 4 || newrecord == 5 || newrecord == 6) {
        db.query(sqlquery, newrecord, (err, result) => {
            if (err) {
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

router.get('/item-select', function (req, res) {
    res.render('select-item.ejs', { pageTitle: 'Item Select' });

});




router.post('/view-details', function (req, res) {
    let sqlquery = "SELECT name,tags,weight,notes,price,imageLink FROM items WHERE name = ?";
    let record = [req.body.name];
    req.flash('name', req.body.name);

    db.query(sqlquery, record, (err, result) => {
        if (err) {
            res.redirect('/404');
        }
        console.log(result);
        if (result[0] == undefined) {
            res.render('item-not-found.ejs', { pageTitle: 'Item Not Found' });
        }
        else {
            res.render('edit-item-form.ejs', { pageTitle: 'Edit Item Details', updateitem: result });
        }
    });
});

router.post('/save-changes', function (req, res) {
    let sqlquery = "UPDATE items SET name = ?, tags = ?, weight = ?, notes = ?, price = ?, imageLink = ? WHERE name = ?";
    let identifyer = req.flash('name')
    let record = [req.body.name, req.body.tags, req.body.weight, req.body.notes, req.body.price, req.body.imageLink, identifyer];

    db.query(sqlquery, record, (err, result) => {
        if (err) {
            res.redirect('/404');
        }

        else {
            res.render('changes-saved.ejs', { pageTitle: 'Changes Saved' });
        }
    });



});


router.get('/swap-items', (req, res) => {
    res.render('swap-item.ejs', { pageTitle: 'Swap Items' });
});


<<<<<<< HEAD
router.post('/view-details', function(req, res) {
        
	
	let sqlquery = "SELECT name,tags,weight,notes,price,imageLink FROM items WHERE name = ?";
	let record = [req.body.name];       
	
	        
	db.query(sqlquery, record,(err, result) => {
=======
router.post('/swap-shelf-position', (req, res) => {

    let shelfpos1 = req.body.name;
    let shelfpos2 = req.body.swap;
    if (shelfpos1 != shelfpos2) {
        let sqlStatement = "UPDATE shelves SET shelfPosition = ? WHERE shelfPosition = ?";
        let record1 = [8, shelfpos1];
        let record2 = [shelfpos1, shelfpos2];
        let record3 = [shelfpos2, 8];
        db.query(sqlStatement, record1, (err, result) => {

>>>>>>> 3e7845f782db817aea3e7c08a103f67845f9a3a2
            if (err) {
                throw (err)
            }
<<<<<<< HEAD
	   
	if(result[0] == undefined){
	res.render('item-not-found.ejs',{ pageTitle: 'Item Not Found' });
	}
	else{
            res.render('edit-item-form.ejs',{pageTitle:'Edit Item Details', itemName:req.body.name, updateitem:result});
	    }
	});
  });

router.post('/save-changes', function(req,res){
let sqlquery="UPDATE items SET name = ?, tags = ?, weight = ?, notes = ?, price = ?, imageLink = ? WHERE name = ?";

let record = [req.body.name,req.body.tags,req.body.weight,req.body.notes,req.body.price,req.body.imageLink,req.body.originalName];

db.query(sqlquery, record,(err, result) => {
            if (err) {
                res.redirect('/404');
=======

            if (result.affectedRows == 0) {
                res.render('item-swap-fail.ejs', { pageTitle: 'Item Swap Failed' });
>>>>>>> 3e7845f782db817aea3e7c08a103f67845f9a3a2
            }


            else {
                db.query(sqlStatement, record2, (err, result1) => {

                    if (err) {
                        throw (err)
                    }

                    if (result1.affectedRows == 0) {
                        res.render('item-swap-fail.ejs', { pageTitle: 'Item Swap Failed' });
                    } else {
                        db.query(sqlStatement, record3, (err, result2) => {
                            if (err) {
                                throw (err)
                            }
                            else {
                                res.render('item-swapped.ejs', { pageTitle: 'Item Swapped Successfully' });
                            }
                        });
                    }
                });

            }

        });
    } else {
        res.redirect('/swap-items');
    }
});








router.get('/overview-list', mainController.getShelfOverviewList);

router.get('/shelf-details', mainController.getShelfDetails);

module.exports = router
