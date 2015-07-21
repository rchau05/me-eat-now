var express = require ('express'),
	// favicon = require('express-favicon'),
	mongoose = require('mongoose'),
	bodyParser = require('body-parser'),
	yelp = require("yelp").createClient({
      	consumer_key: 'VLtNYxt_FA73JfmfrogIug',
      	consumer_secret: 'eh9OnaQ-3Wf7w-QcC-g8srocovM',
      	token: 'PNBDp9eNidZtwFIbFOrpMUjpM9Eh9x5J',
      	token_secret: 'AYk85EXQ12yVfP1xfKp5Agy-Lc4'
     });
	app = express();
	// app.use(favicon(__dirname + '/public/favicon.ico'));

mongoose.connect(
  process.env.MONGOLAB_URI ||
  process.env.MONGOHQ_URL ||
  'mongodb://localhost/test' // plug in the db name you've been using
);

// var Restaurant = require('./models/user');

// // serve js and css files from public 
app.use(express.static(__dirname + '/public'));

// // tell app to use bodyParser middleware
// // this will let us get data from POST
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());

app.get('/', function(req, res) {
	res.sendFile(__dirname + '/public/views/index.html')   
});

app.get('/api/restaurants', function(req, res){
	yelp.search({term: 'pizza', location: "San Francisco"}, function(error, data) {
		res.json(data);
	});

	// res.sendFile(__dirname + '/public/views/welcome.html');
});


app.listen(process.env.PORT || 3000, function(){
console.log('It works!')
});