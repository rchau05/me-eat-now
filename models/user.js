var mongoose = require('mongoose'),
	Schema = mongoose.Schema,
	bcrypt = require('bcrypt'),
	salt = bcrypt.genSaltSync(10);


var RestSchema = new Schema({
	name: String,
	location: String
});

var UserSchema = new Schema({
	email: String,
	passwordDigest: String
});
	
	//@AUTH
UserSchema.statics.createSecure = function (email,password, callback) {
	// 'this' references out Schema
	var that = this;

	//hash password user enters at sign up
	bcrypt.genSalt(function (err, salt) {
		bcrypt.hash(passwordDigest, salt, function (err, hash) {
			console.log(hash);

			//create new user. Save to db with hashed passwords
			that.create ({
				email: email,
				passwordDigest: hash
			  }, callback);
	       });
		});
	 };

//authentic user (when user logs in)
UserSchema.statics.authenticate = function (email, passwordDigest, callback) {
	//find user by email entered at log in
	this.findOne({email: email}, function (err, user) {
		console.log(user);

		//throw error if can't find user
		if (user === null) {
			throw new Error('Can\'t find user with email ' + email);

			//if found user, check if password is correct
		} else if (user.checkPassword(passwordDigest)) {
			callback(null, user);
		}
	});
};

//compare user password with hashed password which is 'passwordDigest'
UserSchema.methods.checkPassword = function (passwordDigest) {
	//run hashing algorithm with salt on users password and compare with passwordDigest
	return bcrypt.compareSync(passwordDigest, this.passwordDigest);
};

// $.ajax({
//      type: 'GET',
//      url: 'http://search.ams.usda.gov/farmersmarkets/v1/data.svc/mktDetail?id=' + id,
//      async: false,
//      success: function ....
// })

var User = mongoose.model('User', UserSchema);

var Restaurant =  mongoose.model('Restaurant', RestSchema);
// export user model
module.exports.User = User;
module.exports.Restaurant = Restaurant;
