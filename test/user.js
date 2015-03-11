/* tests for the user class */

var assert = require('assert');
var request = require('superagent');

var expect = require('chai').expect;

// require www so app is running before tests start
var server = require('../bin/www');
var app = require('../app');

var User = require('../model/user');
before(function() {
    var user = new User({
        name: "Baber",
        password: "safePassword",
        email: "sons@gmail.com",
        type: "user"
    });
    user.save(function(err){});
    // code to run before tests

});


describe("User Tests", function() {
    describe('User.getAll', function() {
        it('should not return an error', function() {

            User.getAll(function(err, users) {
                expect(err).to.eql(null);
                expect(users).length.to.be.greaterThan(0);

            });


        })
    });


    describe("a request", function() {
        it("should work", function(done) {
            request.get("http://localhost:3000/").end(function(err, res) {
                expect(err).to.eql(null);
                expect(res).to.exist;
                expect(res.status).to.equal(200);
                expect(res.body).to.exist;
                expect(res.text).to.contain("CarSafe");
                done();

            });

        })
    });
});


after(function() {
    User.remove("Baber", function(err) {});

});