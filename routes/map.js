var User = require('../model/user.js');
var Crime = require('../model/crime');
var gm = require('googlemaps');



function get(req, res) {

    Crime.getAll(function(err, crimes) {


            res.render('map', {
                title: 'Car Crime Map',
                user: req.session.user,
                crimes: crimes,
                success: req.flash('success').toString(),
                error: req.flash('error').toString()});


        });
    };

module.exports = {
    get: get
};