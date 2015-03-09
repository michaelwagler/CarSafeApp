/**
 * Created by haihoang on 2015-03-09.
 *
 * Crime class and mongoose model. Provides a mongoose schema, defines crime properties
 * and database CRUD operations
 *
 */

var config = require('../config');
var mongoose = require('mongoose');
mongoose.connect(config.uri);

var crimeSchema = new mongoose.Schema({
        type: String,
        month: Number,
        address: String
    },
    { collection: 'crimes' });

var crimeModel = mongoose.model('Crime', crimeSchema);


function Crime(crime) {
    this.type = crime.type;
    this.month = crime.month;
    this.address = crime.address;
}

Crime.prototype.save = function(callback) {

    var crime = {
        type: this.type,
        month: this.month,
        address: this.address
    };
    var newCrime = new crimeModel(crime);
    newCrime.save(function (err, crime) {
        if (err) {
            return callback(err);
        }
        callback(null, crime);
    });
};

Crime.get = function(name, callback) {
    crimeModel.findOne({type: type},
        function (err, crime) {
            if (err) {
                return callback(err);
            }
            callback(null, crime);
        });
};

Crime.getAll = function( callback){
    crimeModel.find({}, 'type month address',function(err, docs) {
        if (!err){
            console.log(docs);

            callback(null, docs);
        } else {
            return callback(err);}
    });

};

module.exports = Crime;