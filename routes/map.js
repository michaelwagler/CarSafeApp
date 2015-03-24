var User = require('../model/user.js');
var Crime = require('../model/crime');
var gm = require('googlemaps');



function get(req, res) {

    Crime.getAll(function(err, crime) {

        var result = gm.geocode(crime[0].address + ", Vancouver, BC, Canada", function(err, result) {

            console.log('result', result);
            console.log('result.results', result.results);

            res.render('map', {
                title: 'Car Crime Map',
                user: req.session.user,
                result: result.results[0],
                crime: crime,
                success: req.flash('success').toString(),
                error: req.flash('error').toString()});
            });

        });
    };

module.exports = {
    get: get
};