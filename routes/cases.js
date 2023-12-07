const express = require('express');
const router = express.Router();

const casesCtrl = require('../controllers/cases');
const ensureLoggedIn = require('../config/ensureLoggedIn');

//Get /cases
router.get('/', casesCtrl.index);

//Get /cases/new
router.get('/new', casesCtrl.new);

//Get /cases/mycases
router.get('/mycases', casesCtrl.userIndex);

//Get /cases/:id
router.get('/:id', casesCtrl.show);

//Post /cases/:id/comment
router.post('/:id/comment', casesCtrl.newComment);

//Post /cases/:id/survey
router.post('/:id/survey', casesCtrl.newSurvey)

//Delete /cases/:id/deletecomment
router.delete('/:id/deletecomment', casesCtrl.deleteComment);

//Post /cases/:id/status
router.post('/:id/status', casesCtrl.statusUpdate);

//Post /cases
router.post('/', casesCtrl.create);


module.exports = router;