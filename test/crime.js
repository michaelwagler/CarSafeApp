/**
 * Created by haihoang on 2015-03-11.
 */

var assert = require('assert');
var request = require('superagent');

var expect = require('chai').expect;

// require www so app is running before tests start
var server = require('../bin/www');
var app = require('../app');

var crimeData = require('../model/crime.js');

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

});

describe("Converter Tests", function() {
    describe('Crime.getAll', function() {
        it('should not return an error and have a length of 2', function(done) {
            crimeData.getAll(function(err, crimes){
                expect(err).to.equal(null);
                expect(crimes.length).to.be.equal(2);
            });

            done();
        })
    });

    describe('Crime.get', function() {
        it('should not return an error and find crime by address', function(done) {
            crimeData.get("123 Alma St", function(err, crime){
                console.log("in Crime.get, err: " + err + "\n");
                expect(err).to.equal(null);
                expect(crime.address).to.equal("123 Alma St");
                expect(crime.type).to.equal("Death Of A Salesman");
                expect(crime.month).to.equal(1);
            });
            done();
        })
    });
});

after(function() {
    crimeData.removeAll(function(err) {});
});