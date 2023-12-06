const Case = require('../models/case');

module.exports = {
    index,
    new: newCase,
    create
};

async function index(req, res){
    const cases = await Case.find({});
    res.render('cases/index', {title: 'All Cases', cases});
}

async function newCase(req, res){
    res.render('cases/new', {title: 'New Case'});
}

async function create(req, res){
    const thisCase = await Case.find({});
    req.body.status = 'New';
    req.body.caseNum = parseInt(thisCase.length)+1;
    req.body.dueDate = new Date();
    req.body.highPriority = !!req.body.priority;
    req.body.survey = [];
    req.body.requestor = req.user;
    delete req.body.priority;
    console.log(req.body, "LOOK HERE !!!");
    try{
        await Case.create(req.body);
        res.redirect('/cases');
    } catch(err){
        console.log(err)
    }
}