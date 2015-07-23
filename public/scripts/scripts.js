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

	// sign up form
	$('#signup-form').submit(function(e) {
		e.preventDefault();
		console.log('Im submitting a form')
		var userData = {
			email: $('#signup-email').val(),
			password: $('#password').val()
		}
		$.ajax({
			url: 'api/users',
			type: 'POST',
			data: userData,
			success: function(data) {
				console.log(data)
			error: function() {
				console.log('Error, can\'t sign new user')
			};
		});
	});


	$('#login-form').submit, function(e) {
		console.log('form submitted');
		e.preventDefault();
		var userData = {
			email: $('#login-user-email').val(),
			password: $('#login-user-password').val()
		};
		$.post('/login', function(user) {
			console.log(user);
		});
	});

	// 	$.post('/api/login', user, function(data) {
	// 		console.log(data)
	// 		// $('#users').prepend($user(data))
	// 	});
	// });

	// $.get('/api/restaurants', function(data) {
	// 	_.each(data.businesses, function (restaurant, index) {
	// 		console.log(restaurant);
	// 		var $restList = $(restTemplate(restaurant));
	// 		$restList.attr('data-index', index);
	// 		$('#rest-list').append($restList);
	// 	});
	// });



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