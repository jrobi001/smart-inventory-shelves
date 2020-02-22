const path = require('path');

const express = require('express');

const testController = require('../controllers/test');

const router = express.Router();

router.get('/add-item', testController.getAddItem);

router.post('/add-item', testController.postAddItem);

module.exports = router;