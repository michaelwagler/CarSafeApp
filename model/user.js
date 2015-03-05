/**
 * Created by michaelwagler on 2015-03-05.
 */
var settings = require('../config/settings');
var crypto = require('crypto');
var mongoose = require('mongoose');
mongoose.connect(settings.uri);

/**
 * User class and mongoose model. Provides a mongoose schema, defines user properties
 * and database accessor methods.
 */

var userSchema = new mongoose.Schema({
        name: String,
        password: String,
        email: String,
        type: String
    },
    { collection: 'users' });

var userModel = mongoose.model('User', userSchema);

/*

        Constructor function for user
*/

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
module.exports = User;