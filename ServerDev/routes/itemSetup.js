const express = require('express');

//files containing routing logic in /controllers
const testController = require('../controllers/test');

const router = express.Router();

router.get('/', testController.getShefSelector);

router.post('/confirm-shelf', testController.postConfirmShelf);

router.post('/item-form/:shelfPos', testController.postItemForm);

//need to delete old item data and stuff in the conttroller
router.post('/shelf-settings', testController.postShelfSettings);

//after add item need to set shelf settings - will need the item id of the newly created item
// ideally then import stock settings
// currently display every option - ideally later split up conditionally

//confirmation screen
router.get('confirmation')



module.exports = router