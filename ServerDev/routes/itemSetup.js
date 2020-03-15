const express = require('express');

//files containing routing logic in /controllers
const itemSetupController = require('../controllers/itemSetupController');

const router = express.Router();

router.get('/', itemSetupController.getShefSelector);

router.post('/confirm-shelf', itemSetupController.postConfirmShelf);

router.post('/item-form/:shelfPos', itemSetupController.postItemForm);

// currently display every option - ideally later split up conditionall
router.post('/shelf-settings', itemSetupController.postShelfSettings);

router.post('/setup-complete', itemSetupController.postSetupComplete)



module.exports = router