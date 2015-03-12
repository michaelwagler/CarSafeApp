/* tests for the user class */

var assert = require('assert');
var request = require('superagent');

var expect = require('chai').expect;

// require www so app is running before tests start
var server = require('../bin/www');
var app = require('../app');

var User = require('../model/user');
var admin = require('../routes/admin');


before(function() {
    var user = new User({
        name: "Baber",
        password: "safePassword",
        email: "sons@gmail.com",
        type: "user"
    });
    user.save(function(err){});

});

describe("User Tests", function() {
    describe('User.getAll', function() {
        it('should not return an error', function (done) {

            User.getAll(function (err, users) {
                expect(err).to.eql(null);
                expect(users.length).to.be.greaterThan(0);
            });

            var user = new User({
                name: "Hai",
                password: "ketchup",
                email: "purple@gmail.com",
                type: "user"
            });
            user.save(function (err, hai) {
                expect(hai.type).to.equal("user");
            });
            done();
        });
    });
    describe("Async user edits", function() {
        it('should set Hai user type to admin', function(done) {
            User.setPrivilege('Hai', "admin", function (err, hai) {
                expect(hai.type).to.equal("admin");
            });
            done();
        });
        it('should remove Hai from the database', function(done) {
            User.remove("Hai", function(err) {
                User.getAll(function(err, users) {
                    expect(users.length).to.equal(1);
                });
            });
            done();
        });
    });
});


after(function() {
    User.remove("Baber", function(err) {});

});