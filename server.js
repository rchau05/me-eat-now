var express = require ('express'),
	app = express(),
	mongoose = require('mongoose'),	
	bodyParser = require('body-parser'),
	session = require('express-session'),
	_ = require('underscore'),
	db = require('./models/user'),
	cors = require('cors'),
	// config = require('./config'),
	yelp = require("yelp").createClient({
      	consumer_key: 'VLtNYxt_FA73JfmfrogIug',
      	consumer_secret: 'eh9OnaQ-3Wf7w-QcC-g8srocovM',
      	token: 'PNBDp9eNidZtwFIbFOrpMUjpM9Eh9x5J',
      	token_secret: 'AYk85EXQ12yVfP1xfKp5Agy-Lc4'
     });

if (process.env.PORT) {
  var config = process.env;
} else {
  var config = require('./config');
};

//requiring user express-sessions
app.use(session({
	saveUninitialized: true,
	resave: true,
	secret: config.SESSION_SECRET,
	cookie: {maxAge:60000}
}));

mongoose.connect(config.MONGOLAB_URI); 

var User = require('./models/user')

// Middlewares
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());
app.use(cors());

// serve js and css files from public 
app.use(express.static(__dirname + '/public'));

// middleware to manage sessions
app.use('/', function (req, res, next) {
	req.login = function (user) {
		req.session.userId = user._id;
	};
	// finds user currently logged in
	req.currentUser = function (callback) {
		db.User.findOne({_id: req.session.userId}, function (err, user) {
			req.user = user;
			callback(null, user);
		});
	};
	//destroy to logout user
	req.logout = function() {
		req.session.userId = null;
		req.user = null;
	};
	next(); //required for middleware
});

//Route to homepage on localhost
app.get('/', function(req, res) {
	res.sendFile(__dirname + '/public/views/index.html')
});

//route to signup page
app.get('/signup', function (req, res){
	req.currentUser(function(err, user) {
		if(user) {
			res.redirect('/login')
		} else {
			res.sendFile(__dirname + '/public/views/signup.html')
		};
	});
});


// //user submits signup form
app.post('/users', function (req, res) {
	db.User.createSecure(req.body.email, req.body.password, function (err, user) {
		res.redirect('/login');
	});
});

// user submits login and gets authentication
app.post('/login', function (req, res) {
	db.User.authenticate(req.body.email, req.body.password, function (err, user) {
		if(user) {
			req.login(user);
	  		// res.sendFile(__dirname + '/public/views/welcome.html')
	  		res.redirect('/welcome')
	  		console.log('Welcome to your homepage')
		} else {
			res.redirect('/login')
	}
	});
});

// route to login page
app.get('/login', function (req, res){
	req.currentUser(function(err,user){
		if (user === req.currentUser){
			res.redirect('/welcome')
		}else {
			res.sendFile(__dirname + '/public/views/login.html');		
		}
	})
});

// user profile/welcome page
app.get('/welcome', function (req, res) {
	req.currentUser(function (err, user) { 
	res.sendFile(__dirname + '/public/views/welcome.html')	
	console.log('Welcome to your page!')
	})
})

app.get('/logout', function(req, res) {
	req.logout(function (err, user) {
	res.redirect('/')
	alert('logged out')
	}) 
})

//RESTAURANT SEARCH ENGINE
app.get('/api/restaurants/:q', function(req, res){
	var searchResults = req.params.q;
		console.log(searchResults);
		yelp.search({term: searchResults, location: "san+francisco"}, function(error, data) { // term: 'pizza', 
		res.json(data);
	});
	console.log('oh hi!')
});

// user enters restaurant names and returns json files and search results on map
app.post('/search', function(req, res) {
	console.log('hello');
	console.log(req.body);
	yelp.search({term: req.body.text, location: 'san+francisco', limit: '15'}, function(error, data) {
		res.json(data);
	});	
});

app.listen(process.env.PORT || config.PORT, function() {
	console.log('server starting')
});
// app.listen(config.PORT);