$(function() {

	var restTemplate = _.template($('#rest-template').html());

	// var restaurants = [
	// 	{name: "Restaurant1", location:"123 Fake St."},
	// 	{name: "Restaurant2", location:"456 Faker St."},
	// 	{name: "Restaurant3", location:"789 Fakest St."},
	// 	{name: "Restaurant4", location:"000 Fakerest St."},
	// 	{name: "Restaurant5", location:"666 Fakestest St."},
	// 	{name: "Restaurant6", location:"042 Fakest infinity + 1 St."}
	// ];

	$.get('/api/restaurants', function(data) {
		_.each(data.businesses, function (restaurant, index) {
			console.log(restaurant);
			var $restList = $(restTemplate(restaurant));
			$restList.attr('data-index', index);
			$('#rest-list').append($restList);
		});
		console.log(restaurants)
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


});