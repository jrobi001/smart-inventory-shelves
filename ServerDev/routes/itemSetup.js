const express = require('express');

//files containing routing logic in /controllers
const itemSetupController = require('../controllers/itemSetupController');

const router = express.Router();

router.get('/', itemSetupController.getShefSelector);

router.post('/confirm-shelf', itemSetupController.postConfirmShelf);

router.post('/item-form/:shelfPos', itemSetupController.postItemForm);

//need to delete old item data and stuff in the conttroller
router.post('/shelf-settings', itemSetupController.postShelfSettings);

//after add item need to set shelf settings - will need the item id of the newly created item
// ideally then import stock settings
// currently display every option - ideally later split up conditionally

//confirmation screen
router.get('confirmation')

router.get('/edit-item/:shelfPos', itemSetupController.getEditItem)



module.exports = router