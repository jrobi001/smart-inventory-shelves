const path = require('path');

const express = require('express');

const testController = require('../controllers/test');

const router = express.Router();

router.get('/add-item', testController.getAddItem);

router.post('/add-item', testController.postAddItem);

router.get('/overview', testController.getShelfOverview);

router.get('/shelf-selector', testController.getShefSelector);

router.post('/shelf-selector', testController.postShelfSelector)

module.exports = router;