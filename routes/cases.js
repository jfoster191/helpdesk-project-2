const express = require('express');
const router = express.Router();

const casesCtrl = require('../controllers/cases');
const ensureLoggedIn = require('../config/ensureLoggedIn');

//Get /cases
router.get('/', casesCtrl.index);
//Get /cases/new
router.get('/new', ensureLoggedIn, casesCtrl.new);
//Post /cases
router.post('/', ensureLoggedIn, casesCtrl.create);

module.exports = router;