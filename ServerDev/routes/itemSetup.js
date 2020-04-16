const express = require('express');

//file containing routing logic in /controllers
const itemSetupController = require('../controllers/itemSetupController');

const router = express.Router();

router.get('/', itemSetupController.getShefSelector);

router.post('/confirm-shelf', itemSetupController.postConfirmShelf);

router.post('/item-form/:shelfPos', itemSetupController.postItemForm);

router.post('/shelf-settings', itemSetupController.postShelfSettings);

router.post('/setup-complete', itemSetupController.postSetupComplete)


// new routes for set up with arduino -----
router.post('/shelf-weight-determination', itemSetupController.postShelfWeightDetermination);

router.post('/checking-empty', itemSetupController.postCheckingEmpty);

router.post('/confirm-weight', itemSetupController.postConfirmWeight);

router.post('/shelf-filled-form', itemSetupController.postShelfFilledForm);
// -----------------------------------------

module.exports = router