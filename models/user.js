var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var RestSchema = new Schema({
	name: String,
	location: String,
	price: Number
});

module.exports = mongoose.model('restaurant', RestSchema);


// client make request to server to external app
// and back to server and back to client

// $.get('url')