$(function() {
	console.log('scripts');

	function makeMap(data) {
		console.log(data)
		var map = new GMaps({
			div: '#map',
			lat: data.region.center.latitude,
			lng: data.region.center.longitude
		});

// loop through businesses and displaying each to sidebar
		_.each(data.businesses, function(business){
			map.addMarker({
				lat: business.location.coordinate.latitude,
				lng: business.location.coordinate.longitude,
				title: 'Find It, Eat It!',	
			    infoWindow:{
        		content: '<p>Restaurants</p>'
    			}
			});
		})
		
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

			_.each(data.businesses, function (restaurant, index) {
				console.log(restaurant);
				var $resultList = $(restTemplate(restaurant));
				$resultList.attr('data-index', index);
				$('#rest-list').append($resultList);
				console.log('restaurants posted!')
			});
		})
	// Append data location, name to the list side-bar
	//for each function going through all the data and just appending the name and the location
	
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
	var intro = {
			region: 
				{
					center: 
						{
							latitude: 37.7909317,
							longitude: -122.4016418

						}
				}
		};
		
	console.log(makeMap);
	makeMap(intro);
});


