var request = require('request'),
	expect = require('chai').expect;

//Describe what we are testing
describe('localhost:3000/', function() {
	it('Homepage should have an HTTP of 200 - success', function(done) {
		request('http://localhost:3000/', function (err, res, body) {
			expect(res.statusCode).to.equal(200)
			// //if you change a code to want it to fail
			// 	expect(res.statusCode).to.equal(300)
			done();
		})
	})
});

describe('Signup page', function() {
	it('Signup Page should have an HTTP of 200 - success', function (done) {
		request('http://localhost:3000/signup', function (err, res, body) {
			expect(res.statusCode).to.equal(200)
			done();
		})
	})
})

describe('Login page', function() {
	it('Login Page should have an HTTP of 200 - success', function (done) {
		request('http://localhost:3000/login', function(err, res,body) {
			expect(res.statusCode).to.equal(200)
			done();
		})
	})
})