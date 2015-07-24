$(function() {
	console.log('scripts');

	function makeMap(data) {
		console.log(data)
		var map = new GMaps({
			div: '#map',
			lat: data.region.center.latitude,
			lng: data.region.center.longitude
		});

		_each(makeMap, function(data.businesses[0], name, location[0], rating, price, image_url;)){
			map.append(closeRestaurants)
		}

		map.addMarker({
			lat: data.businesses[0].location.coordinate.latitude,
			lng: data.businesses[0].location.coordinate.longitude,
			title: 'Find It, Eat It!',	
			click: function(e) {
				alert(data.businesses[0].name);
			}
		});
	}



	var restTemplate = _.template($('#rest-template').html());

	$('#search-box').submit(function(e) {
		e.preventDefault();
		console.log('form submitted: now searching')
		var searchResult = {
			text: $('#search-input').val()
		}
		console.log(searchResult);

		$.post('/search', searchResult).done(function(data) {
			console.log('I finished');
			console.log(data);
			makeMap(data);
		})
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


	// $('#login-form').submit(function(e) {
	// 	console.log('form submitted');
	// 	e.preventDefault();
	// 	var userData = {
	// 		email: $('#login-user-email').val(),
	// 		password: $('#login-user-password').val()
	// 	};
	// 	$.post('/login', function(user) {
	// 		console.log(user);
	// 	});
	// });

	// $('#logout').submit(function() {

	// })


});
