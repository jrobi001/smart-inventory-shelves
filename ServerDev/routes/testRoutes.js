const path = require('path');

const express = require('express');

const testController = require('../controllers/test');

const router = express.Router();


router.get('/overview-list', testController.getShelfOverviewList);

router.get('/shelf-selector', testController.getShefSelector);

router.post('/shelf-selector', testController.postShelfSelector);

router.get('/replace-item/:shelfPos', testController.getReplaceItem);

router.post('/replace-item', testController.postReplaceItem);
//need to delete old item data and stuff

//after add item need to set shelf settings - will need the item id of the newly created item
// ideally then import stock settings
// currently display every option - ideally later split up conditionally
router.get('/shelf-settings')

//confirmation screen
router.get('confirmation')




module.exports = router;