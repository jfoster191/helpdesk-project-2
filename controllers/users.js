const User = require('../models/user');

module.exports = {
    index,
    update
}

async function index(req, res){
    const users = await User.find({});
    res.render('users/index', {title: 'Manage Users', users});
}

async function update(req, res){
    const user = await User.findById(req.params.id);
    if (user.adminPriv === false || !user.adminPriv) {
        user.adminPriv = true;
        await user.save();
    } else if(user.adminPriv === true) {
        user.adminPriv = false;
        await user.save();
    }
    res.redirect('/users');
}