/**
 * Created by michaelwagler on 2015-03-05.
 *
 * User class and mongoose model. Provides a mongoose schema, defines user properties
 * and database CRUD operations
 */

var config = require('../config');
var mongoose = require('mongoose');
mongoose.connect(config.uri);

var userSchema = new mongoose.Schema({
        name: String,
        password: String,
        email: String,
        type: String
    },
    { collection: 'users' });

var userModel = mongoose.model('User', userSchema);

function User(user) {
    this.name = user.name;
    this.password = user.password;
    this.email = user.email;
    this.type = user.type;
}

User.prototype.save = function(callback) {

    var user = {
        name: this.name,
        password: this.password,
        email: this.email,
        type: this.type
    };
    var newUser = new userModel(user);
    newUser.save(function (err, user) {
        if (err) {
            return callback(err);
        }
        callback(null, user);
    });
};

User.get = function(name, callback) {
    userModel.findOne({name: name},
        function (err, user) {
            if (err) {
                return callback(err);
            }
            callback(null, user);
        });
};

User.remove = function(name, callback) {
    userModel.remove({name: name}, function(err) {
        if (err) {
            return callback(err);
        }
        callback(null);
    });
};

User.setPrivilege= function(name, desiredPrivilege, callback){

    userModel.findOneAndUpdate({name:name}, {$set: {type:desiredPrivilege}}, function(err){
        if (err) {
        return callback(err);
    }
        callback(null);});

};

User.getAll = function( callback){
    userModel.find({},'name type',function(err, docs) {
        if (!err){
            callback(null, docs);
        } else {
            return callback(null,err);}
    });

};
module.exports = User;