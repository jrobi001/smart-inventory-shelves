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

});

router.get('/edit-shelf-details', function (req,res){
	res.render('edit-shelf-details.ejs',{pageTitle:'Edit Shelf Details'});
});




function autoCalcweight(){
let sqlqueryinit = "select shelfPosition from shelves where items_id != 'null' and autocalc100Percent = '1'";
db.query(sqlqueryinit, (err,result) =>{
	
if (result[0] != undefined){
var i;
for( i=0; i<result.length; i++){
 let shelfPos = result[i].shelfPosition;
 
	
	

let sqlquery0 = "select hundredPercent from shelves where shelfPosition = ?";
let record0 = [shelfPos];
	db.query(sqlquery0, record0, (err1,result1) =>{
		if (err1){throw err1}
		let currentcalibratedWeight = result1[0].hundredPercent;
			
if(record0 == '1'){	
var sqlquery1 = "select weight from id1weights order by dateTime desc limit 1";
}
if(record0 == '2'){
var sqlquery1 = "select weight from id2weights order by dateTime desc limit 1";
}
if(record0 == '3'){
var sqlquery1 = "select weight from id3weights order by dateTime desc limit 1";
}
if(record0 == '4'){
var sqlquery1 = "select weight from id4weights order by dateTime desc limit 1";
}
if(record0 == '5'){
var sqlquery1 = "select weight from id5weights order by dateTime desc limit 1";
}
if(record0 == '6'){
var sqlquery1 = "select weight from id6weights order by dateTime desc limit 1";
}
db.query(sqlquery1, (err2, result2) => {
	if (err2) {throw err2}
	
	if(result2[0]!= undefined){
	let weightval = result2[0].weight;
	
	if(weightval>currentcalibratedWeight){
	let sqlquery = "update shelves set hundredPercent = ? where shelfPosition = ?";
	let record1 = [weightval,shelfPos];	
	db.query(sqlquery, record1, (err3, result3) => {
	if(err3){throw err3}
	
      });
    }
  }
});
});

}
}
});
}

autoCalcweight();

setInterval(function(){
    autoCalcweight()
}, 30000)
// Logic for delete-----------------------------------------------------------------------
// moved to delete.js
//updated to also delete all id?weights records from the relevant table

//update this to use a selector/be automatic
// router.get('/delete', function (req, res) {
//     res.render('shelf-selector-delete.ejs', {
//         pageTitle: 'delete selector'
//     });
// })

// //confirm screen before deletion
// router.post('/delete-result', function (req, res) {
//     let sqlquery = "UPDATE shelves SET items_id = NULL, updateFrequency = '0', thresholdType = 'NUMBER', thresholdAbsolute = '0', thresholdNumber = '0', thresholdPercent = '0', 100percentWeight = NULL, autocalc100Percent = '0', warning = '1' WHERE shelfPosition = ?";
//     let newrecord = [req.body.name];
//     if (newrecord == 1 || newrecord == 2 || newrecord == 3 || newrecord == 4 || newrecord == 5 || newrecord == 6) {
//         db.query(sqlquery, newrecord, (err, result) => {
//             if (err) {
//                 return console.error(err.message);
//             } else {
//                 res.send('You have deleted the data on shelf ' + req.body.name)
//             };
//         });
//     } else {
//         res.redirect('/delete')
//     }
// })


// Logic for edit item-----------------------------------------------------------------------
// moved to shelfDetails.js
//removed selector by typing name, used shelfpos instead

// router.get('/item-select', function (req, res) {
//     res.render('selsetInterval(function(){
   // myFunction()
//}, 30000)ect-item.ejs', { pageTitle: 'Item Select' });

// });


// router.post('/view-details', function (req, res) {
//     //select id from shelves where
//     let sqlquery = "SELECT name,tags,weight,notes,price,imageLink FROM items WHERE name = ?";
//     let record = [req.body.name];

//     db.query(sqlquery, record, (err, result) => {
//         if (err) {
//             throw (err)
//         }
//         console.log(result);
//         if (result[0] == undefined) {
//             res.render('item-not-found.ejs', { pageTitle: 'Item Not Found' });
//         }
//         else {
//             res.render('edit-item-form.ejs', { pageTitle: 'Edit Item Details', itemName: req.body.name, updateitem: result });
//         }
//     });
// });

// router.post('/save-changes', function (req, res) {
//     const shelfPos = req.body.shelfPos;
//     // console.log(shelfPos)
//     let sqlquery = "UPDATE items SET name = ?, tags = ?, weight = ?, notes = ?, price = ?, imageLink = ? WHERE name = ?";
//     let record = [req.body.name, req.body.tags, req.body.weight, req.body.notes, req.body.price, req.body.imageLink, req.body.originalName];

//     db.query(sqlquery, record, (err, result) => {
//         if (err) {
//             throw (err)
//         }
//         else {
//             res.render('changes-saved.ejs', { pageTitle: 'Changes Saved', shelfPos: shelfPos });
//         }
//     });
// });

// Logic for swap shelves-----------------------------------------------------------------------
// moved to swap.js


// router.get('/swap-shelves', (req, res) => {
//     res.render('swap-item.ejs', { pageTitle: 'Swap Items' });
// });


// router.post('/swap-shelf-position', (req, res) => {

//     let shelfpos1 = req.body.name;
//     let shelfpos2 = req.body.swap;
//     if (shelfpos1 != shelfpos2) {
//         let sqlStatement = "UPDATE shelves SET shelfPosition = ? WHERE shelfPosition = ?";
//         let record1 = [99, shelfpos1];
//         let record2 = [shelfpos1, shelfpos2];
//         let record3 = [shelfpos2, 99];
//         db.query(sqlStatement, record1, (err, result) => {
//             if (err) {
//                 throw (err)
//             }
//             if (result.affectedRows == 0) {
//                 res.render('item-swap-fail.ejs', { pageTitle: 'Item Swap Failed' });
//             }
//             else {
//                 db.query(sqlStatement, record2, (err, result) => {
//                     if (err) {
//                         throw (err)
//                     }
//                     if (result.affectedRows == 0) {
//                         res.render('item-swap-fail.ejs', { pageTitle: 'Item Swap Failed' });
//                     } else {
//                         db.query(sqlStatement, record3, (err, result) => {
//                             if (err) {
//                                 throw (err)
//                             }
//                             else {
//                                 res.render('item-swapped.ejs', { pageTitle: 'Item Swapped Successfully' });
//                             }
//                         });
//                     }
//                 });
//             }
//         });
//     } else {
//         res.redirect('/swap-items');
//     }
// });

// -----------------------------------------------------------------------


router.get('/home', mainController.getShelfOverviewList);

router.get('/shelf-details-layout', mainController.getShelfDetails);

router.get('/template-example', (req, res, next) => {
    res.render('template-example', {
        pageTitle: 'template example'
    });
});

module.exports = router
