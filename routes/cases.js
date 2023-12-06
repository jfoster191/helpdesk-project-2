const express = require('express');
const router = express.Router();

const casesCtrl = require('../controllers/cases');
const ensureLoggedIn = require('../config/ensureLoggedIn');

//Get /cases
router.get('/', casesCtrl.index);
//Get /cases/new
router.get('/new', ensureLoggedIn, casesCtrl.new);
//Get /cases/mycases
router.get('/mycases', casesCtrl.userIndex);
//Get /cases/:id
router.get('/:id', casesCtrl.show);
//Post /cases/:id/comment
router.post('/:id/comment', casesCtrl.newComment);
//Post /cases/:id/status
router.post('/:id/status', casesCtrl.statusUpdate);
//Post /cases
router.post('/', ensureLoggedIn, casesCtrl.create);


module.exports = router;