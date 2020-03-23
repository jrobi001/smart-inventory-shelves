const express = require('express');

//file containing routing logic in /controllers
const itemSetupController = require('../controllers/itemSetupController');

const router = express.Router();

router.get('/', itemSetupController.getShefSelector);

router.post('/confirm-shelf', itemSetupController.postConfirmShelf);

router.post('/item-form/:shelfPos', itemSetupController.postItemForm);

router.post('/shelf-settings', itemSetupController.postShelfSettings);

router.post('/setup-complete', itemSetupController.postSetupComplete)

module.exports = router