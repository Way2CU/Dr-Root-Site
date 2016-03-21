/**
 * Main JavaScript
 * Site Name
 *
 * Copyright (c) 2015. by Way2CU, http://way2cu.com
 * Authors:
 */

// create or use existing site scope
var Site = Site || {};

// make sure variable cache exists
Site.variable_cache = Site.variable_cache || {};


/**
 * Check if site is being displayed on mobile.
 * @return boolean
 */
Site.is_mobile = function() {
	var result = false;

	// check for cached value
	if ('mobile_version' in Site.variable_cache) {
		result = Site.variable_cache['mobile_version'];

	} else {
		// detect if site is mobile
		var elements = document.getElementsByName('viewport');

		// check all tags and find `meta`
		for (var i=0, count=elements.length; i<count; i++) {
			var tag = elements[i];

			if (tag.tagName == 'META') {
				result = true;
				break;
			}
		}

		// cache value so next time we are faster
		Site.variable_cache['mobile_version'] = result;
	}

	return result;
};

/**
 * Function called when document and images have been completely loaded.
 */
Site.on_load = function() {
	if (Site.is_mobile())
		Site.mobile_menu = new Caracal.MobileMenu();

	// function for home page slider
	Site.slider = new PageControl('section#slider', 'figure');
	Site.slider
		.setInterval(6000)
		.setWrapAround(true);

	// create function for rotating between testimonials
	Site.testimonials = new PageControl('section#testimonial', 'article');
	Site.testimonials
		.setInterval(8000)
		.setWrapAround(true)
		.setAutoResize(true);

	// create lightbox function for about us page gallery
	Site.lightbox = new LightBox('div.gallery_container a', false, false, true);

	// google maps
	if ($('div#canvas').length) {
		var mapOptions = {
			zoom: 17,
			center: new google.maps.LatLng(32.3307741,34.8549944), 
			mapTypeId: google.maps.MapTypeId.ROADMAP
		}

		var marker=new google.maps.Marker(
			{
				position:mapOptions.center,
			}
		)

		var infowindow = new google.maps.InfoWindow(
			{
				content:"רחוב דיזינגוף 15, כניסה ב', קומה ב', נתניה"
			}
		);	

		var map = new google.maps.Map(document.getElementById('canvas'), mapOptions);
		marker.setMap(map);
		infowindow.open(map,marker);
	}
};


// connect document `load` event with handler function
$(Site.on_load);
