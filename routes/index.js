/**
 *  Main routing file. handles requests to '/' and passes other requests to appropriate handlers.
 */

var express = require('express');
var router = express.Router();

var reg = require('./reg');
var login = require('./login');
var admin = require('./admin');
var crimeTable = require('./crimeTable');

var crypto = require('crypto');

var User = require('../model/user.js');

router.get('/', function (req, res) {
        res.render('index', {
            title: 'CarSafe',
            user: req.session.user,
            success: req.flash('success').toString(),
            error: req.flash('error').toString()
        });
});

/*
 router.get('/reg', function (req, res) {
 res.render('reg', {
 title: 'Register',
 user: req.session.user,
 success: req.flash('success').toString(),
 error: req.flash('error').toString()
 });
 });
 */

router.get('/reg', login.checkNotLogin);
router.get('/reg', reg.get);

router.post('/reg', login.checkNotLogin);
router.post('/reg', reg.post);

router.get('/login', login.checkNotLogin);
router.get('/login', login.get);

router.post('/login', login.checkNotLogin);
router.post('/login', login.post);


router.get('/admin', login.checkLoginAdmin);
router.get('/admin', admin.get);
router.post('/download', admin.download);
router.post('/update', admin.update);
router.post('/deleteUser', admin.deleteUser);
router.post('/makeAdmin', admin.becomeAdmin);

router.get('/logout', login.checkLogin);
router.get('/logout', login.logout);

router.get('/crimeTable', crimeTable.get);

module.exports = router;






/****** POST STUFF FROM OLD DEMO, IGNORE FOR NOW*******/


/*
 router.get('/u/:name', function (req, res) {

 User.get(req.params.name, function (err, user) {
 if (!user) {
 req.flash('error', 'User does not exist!');
 return res.redirect('/');
 }
 //query and return only articles from that username
 Post.getAll(user.name, function (err, posts) {
 if (err) {
 req.flash('error', err);
 return res.redirect('/');
 }
 res.render('user', {
 title: user.name,
 //posts: posts,
 user : req.session.user,
 success : req.flash('success').toString(),
 error : req.flash('error').toString()
 });
 });
 });
 });

 */

/*
 router.get('/post', checkLogin);
 router.get('/post', function (req, res) {
 res.render('post', {
 title: 'Post',
 user: req.session.user,
 success: req.flash('success').toString(),
 error: req.flash('error').toString()
 });
 });
 */


/*
 router.post('/post', checkLogin);
 router.post('/post', function (req, res) {
 var currentUser = req.session.user,
 post = new Post(currentUser.name, req.body.title, req.body.post);
 post.save(function (err) {
 if (err) {
 req.flash('error', err);
 return res.redirect('/');
 }
 req.flash('success', 'Successfully posted some util!');
 res.redirect('/');//back to main
 });
 });

 */


/*
router.get('/u/:name/:day/:title', function (req, res) {
    Post.getOne(req.params.name, req.params.day, req.params.title, function (err, post) {
        if (err) {
            req.flash('error', err);
            return res.redirect('/');
        }
        res.render('article', {
            title: req.params.title,
            post: post,
            user: req.session.user,
            success: req.flash('success').toString(),
            error: req.flash('error').toString()
        });
    });
});


router.get('/edit/:name/:day/:title', checkLogin);
router.get('/edit/:name/:day/:title', function (req, res) {
    var currentUser = req.session.user;
    Post.edit(currentUser.name, req.params.day, req.params.title, function (err, post) {
        if (err) {
            req.flash('error', err);
            return res.redirect('back');
        }
        res.render('edit', {
            title: 'Edit',
            post: post,
            user: req.session.user,
            success: req.flash('success').toString(),
            error: req.flash('error').toString()
        });
    });
});

router.post('/edit/:name/:day/:title', checkLogin);
router.post('/edit/:name/:day/:title', function (req, res) {
    var currentUser = req.session.user;
    Post.update(currentUser.name, req.params.day, req.params.title, req.body.post, function (err) {
        var url = encodeURI('/u/' + req.params.name + '/' + req.params.day + '/' + req.params.title);
        if (err) {
            req.flash('error', err);
            return res.redirect(url);//Error, redirect
        }
        req.flash('success', 'Edit successfully saved!');
        res.redirect(url);//
    });
});

router.get('/remove/:name/:day/:title', checkLogin);
router.get('/remove/:name/:day/:title', function (req, res) {
    var currentUser = req.session.user;
    Post.remove(currentUser.name, req.params.day, req.params.title, function (err) {
        if (err) {
            req.flash('error', err);
            return res.redirect('back');
        }
        req.flash('success', 'Successfully deleted an article!');
        res.redirect('/');
    });
});

*/


