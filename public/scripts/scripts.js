$(function() {

var restTemplate = _.template($('#rest-template').html());

var restaurants = [
	{name: "Restaurant1", location:"123 Fake St."},
	{name: "Restaurant2", location:"456 Faker St."},
	{name: "Restaurant3", location:"789 Fakest St."},
	{name: "Restaurant4", location:"000 Fakerest St."},
	{name: "Restaurant5", location:"666 Fakestest St."},
	{name: "Restaurant6", location:"042 Fakest infinity + 1 St."}
];

_.each(restaurants, function (restaurant, index) {
	var $restList = $(restTemplate(restaurant));
	$restList.attr('data-index', index);
	$('#rest-list').append($restList);
});

});