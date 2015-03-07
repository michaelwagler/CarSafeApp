/**
 * Created by michaelwagler on 2015-03-05.
 *
 * General tests file
 */

var assert = require('assert');
var request = require('superagent');

var expect = require('chai').expect;

// require www so app is running before tests start
var server = require('../bin/www');


before(function() {
    // code to run before tests

});


describe("Test Suite 1", function() {
    describe('#indexOf()', function() {
        it('should return -1 when the value is not present', function() {
            assert.equal(-1, [1, 2, 3].indexOf(5));
            assert.equal(-1, [1, 2, 3].indexOf(0));

            expect(4 + 5).to.equal(9);
            expect(1).to.not.equal(-2);


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




