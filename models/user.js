var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var RestSchema = new Schema({
	name: String,
	location: String,
	price: Number
});

// $.ajax({
//      type: 'GET',
//      url: 'http://search.ams.usda.gov/farmersmarkets/v1/data.svc/mktDetail?id=' + id,
//      async: false,
//      success: function ....
// })

module.exports = mongoose.model('restaurant', RestSchema);


// client make request to server to external app
// and back to server and back to client

// $.get('url')