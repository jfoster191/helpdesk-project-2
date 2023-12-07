const Case = require('../models/case');

module.exports = {
    index,
    userIndex
}

async function index (req, res){
    const cases = await Case.find({});
    res.render('surveys/index', {title: 'All Surveys', cases});
}

async function userIndex (req, res){
    const cases = await Case.find({}).where('requestor').equals(`${req.user._id}`);
    res.render('surveys/myindex', {title: 'My Surveys', cases});
}