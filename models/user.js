var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var RestSchema = new Schema({
	name: String
});

module.exports = mongoose.model('restaurant', RestSchema);
