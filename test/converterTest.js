/**
 * Created by haihoang on 2015-03-11.
 */

var assert = require('assert');
var request = require('superagent');

var expect = require('chai').expect;

// require www so app is running before tests start
var server = require('../bin/www');
var app = require('../app');

var crimeData = require('../model/crime_entry.js');

before(function() {
    var myCrime = new crimeData({
        type: "Death Of A Salesman",
        month: "1",
        address: "123 Alma St"
    });
    var yourCrime = new crimeData({
       type: "Speed",
        month: "2",
        address: "456 Boundary Rd"
    });
    myCrime.save(function(err){});
    yourCrime.save(function(err){});
    // code to run before tests
    console.log('This is running!!');
    console.log(app.get('env'));

});

describe("Converter Tests", function() {
    describe('Crime.getAll', function() {
        it('should not return an error and have a length greater than 0', function() {
            crimeData.getAll(function(err, crimes){
                expect(err).to.equal(null);
                expect(crimes).length.to.be.greaterThan(0);
                expect(crimes).length.to.be.equal(2);
            });

        })
    });

    describe('Crime.get', function() {
        it('should not return an error finds crime by address', function() {
            crimeData.get("123 Alma St", function(err, crime){
                expect(err).to.equal(null);
                crime.address.should.equal("123 Alma St");
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
    crimeData.removeAll(function(err) {});
});