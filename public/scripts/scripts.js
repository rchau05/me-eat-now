$(function() {

	var restTemplate = _.template($('#rest-template').html());

	$('#search-box').submit(function(e) {
		e.preventDefault();
		console.log('form submitted: now searching')
		var searchResult = {
			text: $('#search-input').val()
		}
		$.post('/', searchResult).done(function(data) {
			console.log('I finished');
			console.log(data);
	
		// Append data location, name to the list side-bar
		//for each function going through all the data and just appending the name and the location
		_.each(data.businesses, function (restaurant, index) {
			console.log(restaurant);
			var $resultList = $(restTemplate(restaurant));
			$resultList.attr('data-index', index);
			$('#rest-list').append($resultList);
			console.log('restaurants posted!')
			});
		});
	});

	$.get('/api/restaurants', function(data) {
		_.each(data.businesses, function (restaurant, index) {
			console.log(restaurant);
			var $restList = $(restTemplate(restaurant));
			$restList.attr('data-index', index);
			$('#rest-list').append($restList);
		});
	});

	$('#signup-form').submit(function(e) {
		e.preventDefault();
		console.log('Im submitting a form')
		var user = {
			text: $('#user-text').val()
		}
		$.post('/api/users', user, function(data) {
			console.log(data)
			$('#users').prepend($user(data))
		});
	});

	$('#login-form').on('submit', function(event) {
		var userData = {
			email: $('#login-user-email').val(),
			password: $('#login-user-password').val()
		};
		$.post('/login', function(response) {
			console.log(response);
		});
	});

	// var options = {
	//   enableHighAccuracy: true,
	//   timeout: 5000,
	//   maximumAge: 0
	// };

	// function success(pos) {
	//   var crd = pos.coords;

	//   console.log('Your current position is:');
	//   console.log('Latitude : ' + crd.latitude);
	//   console.log('Longitude: ' + crd.longitude);
	//   console.log('More or less ' + crd.accuracy + ' meters.');
	// };

	// function error(err) {
	//   console.warn('ERROR(' + err.code + '): ' + err.message);
	// };

	// navigator.geolocation.getCurrentPosition(success, error, options);

// grab input
// save onto server
// append it to sidebar

});