var User = require('../model/user.js');

function get(req, res) {
    res.render('map', {
        title: 'Car Crime Map',
        user: req.session.user,
        success: req.flash('success').toString(),
        error: req.flash('error').toString()});
};



module.exports = {
    get: get
};