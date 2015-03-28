var User = require('../model/user.js');
var Crime = require('../model/crime');
var gm = require('googlemaps');
var appRoot = require('app-root-path');
var Region = require('../model/region.js');


function get(req, res) {

    Region.getAll(function(regs) {
        Crime.getAll(function(err, crimes) {


            res.render('map', {
                title: 'Car Crime Map',
                user: req.session.user,
                crimes: crimes,
                regions: regs,
                success: req.flash('success').toString(),
                error: req.flash('error').toString()});


        });

    });

};

function getBoundary(req,res){

    res.sendFile(appRoot+'/download_data/vancouverLocalBoundary.kml');

}

function getJS(req,res){

    res.sendfile(appRoot+'/public/javascripts/togeojson.js');
}

module.exports = {
    get: get,
    getBoundary: getBoundary,
    getJS: getJS
};