$(function() {
	console.log('scripts');

	//initializing Google Map
	function makeMap(data) {
		console.log(data)
		var map = new GMaps({
			div: '#map',
			lat: data.region.center.latitude,
			lng: data.region.center.longitude
		});

// loop through businesses and displaying each marker on map
		_.each(data.businesses, function(business){
			map.addMarker({
				lat: business.location.coordinate.latitude,
				lng: business.location.coordinate.longitude,
				title: 'Find It, Eat It!',	
			    infoWindow:{
        		content: '<p> <img src=https://secure.gravatar.com/avatar/f2f0cff2a7f6c10ae90cb133b9ec776e.jpg?s=72&d=https%3A%2F%2Fslack.global.ssl.fastly.net%2F3654%2Fimg%2Favatars%2Fava_0010-72.png <br>Awesome Restaurant <br> Price : $$$$ <br> Ratings : 5</p>'
    			}
			});
		})
		
	}

	//creating a restaurant template
	//populating it with Yelp data and 
	//appending it to side search bar
	var restTemplate = _.template($('#rest-template').html());

	$('#search-box').submit(function(e) {
		e.preventDefault();
		console.log('form submitted: now searching')
		var searchResult = {
			text: $('#search-input').val()
		}
		console.log(searchResult);

		$.post('/search', searchResult).done(function(data) {
			console.log(data);
			makeMap(data);

			// Append data location, name to the list side-bar
			//for each function going through all the data and just appending the name and the location
			_.each(data.businesses, function (restaurant, index) {
				console.log(restaurant);
				var $resultList = $(restTemplate(restaurant));
				$resultList.attr('data-index', index);
				$('#rest-list').append($resultList);
				console.log('restaurants posted!')
			});
		})
	});

	//Location to start in map by default upon landing on homepage
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


