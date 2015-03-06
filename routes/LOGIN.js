/**
 * Created by michaelwagler on 2015-03-05.
 */
var crypto = require('crypto');
var User = require('../model/user.js');


function get(req, res) {
    res.render('login', {
        title: 'Login Page!',
        user: req.session.user,
        success: req.flash('success').toString(),
        error: req.flash('error').toString()});
};


function post(req, res) {

    var md5 = crypto.createHash('md5'),
        password = md5.update(req.body.password).digest('hex');

    User.get(req.body.name, function (err, user) {
        if (!user) {
            req.flash('error', 'This username is unregistered!');
            return res.redirect('/login');
        }

        if (user.password != password) {
            req.flash('error', 'Password incorrect!');
            return res.redirect('/login');//
        }
        if (user.type=="admin")
        {
            req.flash('success', 'Login successfully as an admin!')
        }
        else
        {
            req.flash('success', 'Login successfully as an user!');}
        req.session.user = user;
        res.redirect('/');//jump back to main
    });
};

function checkLogin(req, res, next) {
    if (!req.session.user) {
        req.flash('error', 'Unlogged in!');
        res.redirect('/login');
    }
    next();
}

function checkLoginAdmin (req, res, next) {
    if (!req.session.user|| req.session.user.type!="admin") {
        req.flash('error', 'Unlogged in as an admin!');
        res.redirect('/login');
    }
    next();
}

function checkNotLogin(req, res, next) {
    if (req.session.user) {
        req.flash('error', 'Logged in!');
        res.redirect('back');//back to previous page
    }
    next();
}

function logout(req, res) {
    req.session.user = null;
    req.flash('success', 'Successfully logged out!');
    res.redirect('/');//Back to main
}

module.exports = {
    get: get,
    post: post,
    checkLogin: checkLogin,
    checkLoginAdmin: checkLoginAdmin,
    checkNotLogin: checkNotLogin,
    logout:logout};
