const express = require('express');
const router = express.Router();

const surveysCtrl = require('../controllers/surveys');
const ensureLoggedIn = require('../config/ensureLoggedIn');

router.get('/', surveysCtrl.index)

module.exports = router;