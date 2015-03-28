/**
 * Created by michaelwagler on 2015-03-28.
 */
var tgj = require('togeojson');

function Region(region) {
    this.name = user.name;
}

Region.getAll = function( callback){

    var regions = ['region1', 'region2', 'region3'];
    return callback(null, regions);

};
module.exports = Region;