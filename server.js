var express = require ('express'),
	app = express(),
	mongoose = require('mongoose'),
	bodyParser = require('body-parser'),
	session = require('express-session'),
	_ = require('underscore'),
	db = require('./models/user')
	cors = require('cors'),
	config = require('./config'),
	yelp = require("yelp").createClient({
      	consumer_key: 'VLtNYxt_FA73JfmfrogIug',
      	consumer_secret: 'eh9OnaQ-3Wf7w-QcC-g8srocovM',
      	token: 'PNBDp9eNidZtwFIbFOrpMUjpM9Eh9x5J',
      	token_secret: 'AYk85EXQ12yVfP1xfKp5Agy-Lc4'
     });

app.use(session({
	saveUninitialized: true,
	resave: true,
	secret: config.SESSION_SECRET,
	cookie: {maxAge:60000}
}));

mongoose.connect(config.MONGO_URI); 

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


app.get('/', function(req, res) {
	var index = __dirname + '/public/views/index.html';
	res.sendFile(index);
});

app.get('/signup', function (req, res){
	req.currentUser(function(err, user) {
		if(user) {
			res.redirect('/login')
		} else {
			res.sendFile(__dirname + '/public/views/signup.html')
		};
	});
});

// USER#CREATE
app.post('/users', function (req, res) {
	// console.log('server received signup form data: ', req.body.user);
	var newUser = req.body.user;
	db.User.createSecure(newUser.email,newUser.password, function (err, user) {
		res.redirect('/');	
	})
})

app.get('/login', function (req, res){
	req.currentUser(function(err,user){
		if (user){
			res.redirect('/')
		}else {
			res.sendFile(__dirname + '/public/views/login.html');		
		}
	})
});

app.post('/login', function (req, res) {
	var userData =  req.body.user ;
	db.User.authenticate(userData.email, userData.password, function (err, user) {
	  	req.login(user);
	  	res.redirect('/')
	  	console.log('Welcome to your homepage')
	});
});


app.get('/welcome', function (req, res) {
	req.currentUser(function (err, user) {
		res.send('Welcome ' + user.email);
	})
})

//USER#QUERY
app.get('/api/users', function(req, res) {
	console.log(User);
	User.find().sort('-_id').exec(function(err, users) {
		console.log(users);
		res.json(users);
	});
});

// USERS#CREATE
app.post('/api/users', function(req, res) {
	// save user to db
	var user = new User({
		text: req.body.text
	});

	user.save(function(err, user) {
		res.redirect('/login')
	});
});


// app.get('/currentUser', (function (req, res) {
// 	req.currentUser(function (err, user) {
// 		res.json(user);
// 	});
// });



// //user submits signup form
// app.post('/users', function (req, res) {
// 	var newUser = req.body.user;
// 	User.createSecure(newUser.email, newUser.password, function (err, user) {
// 		res.send(user);
// 	});
// });

app.get('/api/restaurants/:q', function(req, res){
	var searchResults = req.params.q;
		console.log(searchResults);
		yelp.search({term: searchResults, location: "san+francisco"}, function(error, data) { // term: 'pizza', 
		res.json(data);
	});
	console.log('oh hi!')
});

app.post('/', function(req, res) {
	console.log('hello');
	console.log(req.body);
	yelp.search({term: req.body.text, location: 'san+francisco', limit: '15'}, function(error, data) {
		res.send(data);
	});	
});

app.listen(config.PORT);