const Case = require('../models/case');

module.exports = {
    index
}

async function index (req, res){
    const cases = await Case.find({});
    // console.log(cases);
    res.render('survey/index', {title: 'All Survey', cases})
}