var express = require ('express'),
	// favicon = require('express-favicon'),
	mongoose = require('mongoose'),
	bodyParser = require('body-parser'),

	app = express();
	// app.use(favicon(__dirname + '/public/favicon.ico'));

// mongoose.connect(
//   process.env.MONGOLAB_URI ||
//   process.env.MONGOHQ_URL ||
//   'mongodb://localhost/test' // plug in the db name you've been using
// );

// var Restaurant = require('./models/user');

// // serve js and css files from public 
app.use(express.static(__dirname + '/public/views'));

// // tell app to use bodyParser middleware
// // this will let us get data from POST
// app.use(bodyParser.urlencoded({extended: true}));
// app.use(bodyParser.json());

//routes for api
var router = express.Router();

// router.use(function(req, res, next) {
// 	//do logging
// 	console.log('Something is happening');
// 	next();
// });

router.get('/', function(req, res) {
    res.sendFile('/index.html');   
});

// router.route('/restaurants') 
// 	//create a bear assessed at POST localhost:8080
// 	.post(function(req, res) {
// 		var restaurant = new Restaurant();
// 		restaurant.name = req.body.name,
// 		restaurant.location = req.body.location,
// 		restaurant.price = req.body.price;

// 		restaurant.save(function(err) {
// 			if (err)
// 				res.send(err);

// 			res.json({message: 'Restaurant listed!'});
// 		});
// 	});

// router.route('/restaurants')
// 	//get all restaurant listings
// 	.get(function(req, res) {
// 		Restaurant.find(function(err, restaurants) {
// 			if(err)
// 				res.send(err);

// 			res.json(restaurants);
// 		});
// 	});

// router.route('/restaurants/:restaurant_id')
// //getting one restaurant
// 	.get(function(req, res) {
	
// 	Restaurant.findById(req.params.restaurant_id, function(err, restaurant) {
// 		if(err);
// 			res.send(err);
// 			res.json(restaurant);
// 		});
// 	})
// 	.put(function(req, res) {

// 	Restaurant.findById(req.params.bear_id, function(err, restaurant) {
// 		if (err);
// 			res.send(err);

// 		restaurant.name = req.body.name,
// 		restaurant.location = req.body.location,
// 		restaurant.price = req.body.price

// 		//save the restaurant
// 		restaurant.save(function(err) {
// 			if(err)
// 				res.send(err)

// 		res.json({message: 'restaurant updated!'})
// 	})
//   })
// 	.delete(function(req, res) {
// 		Restaurant.remove({
// 			_id: req.params.restaurant_id
// 		}, function(err, restaurant) {
// 			if(err)
// 				res.send(err);

// 			res.json({message: 'Successfully deleted'})
// 		})
// 	})
// })
	
// //register our routes
// app.use('/api', router)

app.listen(process.env.PORT || 3000, function(){
console.log('It works!')
});