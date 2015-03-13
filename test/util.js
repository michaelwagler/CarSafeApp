/**
 * Created by michaelwagler on 2015-03-12.
 */
var config = require('../config');
var mongoose = require('mongoose');
var www = require('../bin/www');


before(function (done) {

    function clearDB() {
        for (var i in mongoose.connection.collections) {
            mongoose.connection.collections[i].remove(function() {});
        }
        return done();
    }

    if (mongoose.connection.readyState === 0) {
        mongoose.connect(config.uri, function (err) {
            if (err) {
                throw err;
            }
            return clearDB();
        });
    } else {
        return clearDB();
    }
});

after(function (done) {
    mongoose.disconnect();
    return done();
});