var express = require('express');
var router = express.Router();

const userCtrl = require('../controllers/users');

//Get /users
router.get('/', userCtrl.index);

//POST /users/update
router.post('/:id/update', userCtrl.update);

module.exports = router;
