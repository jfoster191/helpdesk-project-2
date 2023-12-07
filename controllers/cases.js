const Case = require('../models/case');

module.exports = {
    index,
    userIndex,
    new: newCase,
    create,
    show,
    newComment,
    newSurvey,
    statusUpdate,
    deleteComment
};

async function index(req, res){
    const cases = await Case.find({});
    res.render('cases/index', {title: 'All Cases', cases});
}

async function userIndex(req, res){
    const cases = await Case.find({}).where('requestor').equals(`${req.user._id}`);
    res.render('cases/myindex', {title: 'My Cases', cases});
}

async function newCase(req, res){
    res.render('cases/new', {title: 'New Case'});
}

async function create(req, res){
    const thisCase = await Case.find({});
    req.body.comment = [`${req.body.comment}`];
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
        res.redirect('/cases/mycases');
    } catch(err){
        console.log(err)
    }
}

async function show(req, res){
    const thisCase = await Case.findById(req.params.id);
    res.render('cases/show', {title: 'Cases', thisCase});
}

async function newComment(req, res){
    const thisCase = await Case.findById(req.params.id);
    if (req.body.comment === '') return
    thisCase.comment.push(req.body.comment);
    await thisCase.save();
    res.render('cases/show', {title: 'Case', thisCase});
}

async function newSurvey(req, res){
    const thisCase = await Case.findById(req.params.id);
    req.body.user = req.user;
    thisCase.survey = req.body;
    await thisCase.save();
    const survey = await thisCase.populate('survey')
    res.render('cases/show', {title: 'Case', thisCase, survey});
}
async function statusUpdate(req, res){
    const thisCase = await Case.findById(req.params.id);
    thisCase.status = req.body.status;
    await thisCase.save();
    res.render('cases/show', {title: 'Case', thisCase});
}

async function deleteComment(req, res){
    const thisCase = await Case.findById(req.params.id);
    let id = JSON.stringify(req.body);
    id = id.slice(2,3);
    thisCase.comment.splice(`${id}`, 1);
    await thisCase.save();
    res.render('cases/show', {title: 'Case', thisCase});
}