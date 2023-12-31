const Case = require('../models/case');
const User = require('../models/user');

module.exports = {
    index,
    userIndex,
    new: newCase,
    create,
    show,
    newComment,
    newSurvey,
    statusUpdate,
    assignUpdate,
    deleteComment
};

async function index(req, res){
    const cases = await Case.find({}).populate('requestor').populate('assignee');
    res.render('cases/index', {title: 'All Cases', cases});
}

async function userIndex(req, res){
    let cases;
    if (req.user.adminPriv === true){
        cases = await Case.find({}).where('assignee').equals(`${req.user._id}`).populate('assignee').populate('requestor');
    } else {        
        cases = await Case.find({}).where('requestor').equals(`${req.user._id}`).populate('requestor').populate('assignee');
    }
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
    req.body.survey;
    req.body.requestor = req.user;
    delete req.body.priority;
    try{
        await Case.create(req.body);
        res.redirect('/cases/mycases');
    } catch(err){
        console.log(err)
    }
}

async function show(req, res){
    const thisCase = await Case.findById(req.params.id).populate('requestor').populate('assignee');
    const users = await User.find({});
    res.render('cases/show', {title: 'Cases', thisCase, users});
}

async function newComment(req, res){
    const thisCase = await Case.findById(req.params.id).populate('requestor').populate('assignee');
    const users = await User.find({});
    if (req.body.comment === '') return
    thisCase.comment.push(req.body.comment);
    await thisCase.save();
    res.render('cases/show', {title: 'Case', thisCase, users});
}

async function newSurvey(req, res){
    const thisCase = await Case.findById(req.params.id).populate('requestor').populate('assignee');
    req.body.user = req.user;
    thisCase.survey = req.body;
    await thisCase.save();
    const survey = await thisCase.populate('survey')
    res.render('cases/show', {title: 'Case', thisCase, survey});
}
async function statusUpdate(req, res){
    const thisCase = await Case.findById(req.params.id).populate('requestor').populate('assignee');
    const users = await User.find({});
    thisCase.status = req.body.status;
    await thisCase.save();
    res.render('cases/show', {title: 'Case', thisCase, users});
}

async function assignUpdate(req, res){
    const thisCase = await Case.findById(req.params.id).populate('requestor').populate('assignee');
    const assignee = await User.find({}).where('email').equals(`${req.body.assign}`);
    thisCase.assignee = assignee[0];
    await thisCase.save();
    res.render('cases/show', {title: 'Case', thisCase});
}

async function deleteComment(req, res){
    const thisCase = await Case.findById(req.params.id).populate('requestor').populate('assignee');
    let id = JSON.stringify(req.body);
    id = id.slice(2,3);
    thisCase.comment.splice(`${id}`, 1);
    await thisCase.save();
    res.render('cases/show', {title: 'Case', thisCase});
}