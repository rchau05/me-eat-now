var mongoose = require('mongoose'),
	Schema = mongoose.Schema,
	bcrypt = require('bcrypt'),
	salt = bcrypt.genSaltSync(10);

var UserSchema = new Schema({
	email: String,
	passwordDigest: String
});
	
	//@AUTH create security for signup
UserSchema.statics.createSecure = function (email, password, callback) {
	// 'this' references out Schema
	var that = this;

	//hash password user enters at sign up
	bcrypt.genSalt(function (err, salt) {
		bcrypt.hash(password, salt, function (err, hash) {
			console.log(hash);

			//create new user. Save to db with hashed passwords
			that.create ({
				email: email,
				passwordDigest: hash
			  }, callback);
			// that.save(function(err, data, hash) {
			// 	if(err) {return res.json(err) };
			// 	return data.
			// })
	       });
		});
	 };

//compare user password with hashed password which is 'passwordDigest'
UserSchema.methods.checkPassword = function (password) {
	//run hashing algorithm with salt on users password and compare with passwordDigest
	return bcrypt.compareSync(password, this.passwordDigest);
};

//authentic user (when user logs in)
UserSchema.statics.authenticate = function (email, password, callback) {
	//find user by email entered at log in
	this.findOne({email: email}, function (err, user) {
		console.log(user);

		//throw error if can't find user
		if (user === null) {
			console.log('Can\'t find user with email ' + email);
			callback(null)
			//if found user, check if password is correct
		} else if (user.checkPassword(password)) {
			callback(null, user);
		}
	});
};


var RestSchema = new Schema({
	name: String,
	location: String
});

var User = mongoose.model('User', UserSchema);

var Restaurant =  mongoose.model('Restaurant', RestSchema);
// export user model
module.exports.User = User;
module.exports.Restaurant = Restaurant;
