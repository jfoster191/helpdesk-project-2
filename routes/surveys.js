const express = require('express');
const router = express.Router();

const surveysCtrl = require('../controllers/surveys');
const ensureLoggedIn = require('../config/ensureLoggedIn');

//Get /surveys
router.get('/', surveysCtrl.index);

//Get /surveys/mysurveys
router.get('/mysurveys', surveysCtrl.userIndex);

module.exports = router;