/**
 * Created by michaelwagler on 2015-03-28.
 */
var tj = require('togeojson'),
    fs = require('fs'),
// node doesn't have xml parsing or a dom. use jsdom
    jsdom = require('jsdom').jsdom;

function Region(region) {
    this.name = user.name;
}

Region.getAll = function( callback){

    var region1 = {
        name: "region1"
    };

    var region2 = {
        name: "region2"
    };
    var region3 = {
        name: "region3"
    };

    var regions = [region1, region2, region3];
    return callback(regions);


};
module.exports = Region;