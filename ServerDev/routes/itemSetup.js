const express = require('express');

//file containing routing logic in /controllers
const itemSetupController = require('../controllers/itemSetupController');

const router = express.Router();

// shelf selector form
router.get('/', itemSetupController.getShefSelector);

// if shelf filled ask to confirm over-write
router.post('/confirm-shelf', itemSetupController.postConfirmShelf);

// new item form presented with shelf Position placed in the parameters
router.post('/item-form/:shelfPos', itemSetupController.postItemForm);

// shelf settings form presented
router.post('/shelf-settings', itemSetupController.postShelfSettings);

// confirmation screen if all succeeds
router.post('/setup-complete', itemSetupController.postSetupComplete)


// new routes for set up with arduino ----------------

// page asking user to clear shelf to get base reading
router.post('/shelf-weight-determination', itemSetupController.postShelfWeightDetermination);

// checks new shelf weight records coming in and asks user to place one item
router.post('/checking-empty', itemSetupController.postCheckingEmpty);

// shows user difference in weight, asks if seems right
router.post('/confirm-weight', itemSetupController.postConfirmWeight);

// places weight measured into item form
router.post('/shelf-filled-form', itemSetupController.postShelfFilledForm);

// ----------------------------------------------------

module.exports = router