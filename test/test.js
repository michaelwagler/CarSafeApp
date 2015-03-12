/**
 * Created by michaelwagler on 2015-03-05.
 *
 * General HTTP request tests
 */

var assert = require('assert');
var request = require('superagent');

var expect = require('chai').expect;
var User = require('../model/user');

// require www so app is running before tests start
var server = require('../bin/www');
var app = require('../app');



var michael;
before(function() {
    // code to run before tests
    var user = new User({
        name: "Michael",
        password: "safePassword",
        email: "sons@gmail.com",
        type: "admin"
    });

    user.save(function(err, user){
        michael = user;
    });

});


describe("Testing http requests", function() {
    it("should return a response with the word 'CarSafe'", function(done) {
        request.get("http://localhost:3000/").end(function(err, res) {
            expect(err).to.eql(null);
            expect(res).to.exist;
            expect(res.status).to.equal(200);
            expect(res.body).to.exist;
            expect(res.text).to.contain("CarSafe");
            done();
        });
    });
    it("Going to admin panel when not an admin should redirect to login", function(done) {
        request.get("localhost:3000/admin").end(function(err, res) {
           expect(res.status).to.equal(200);
            expect(res.text).to.contain('Login');
        });
        done();
    });

    // TODO: test that admin CAN access the above page
    // can't figure out how to access the session object through
    // super-agent's request object

});


after(function() {
    User.remove("Michael", function(err) {});

});



