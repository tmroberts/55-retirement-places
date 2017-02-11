// 'use strict';
// if (this.maptest === undefined) this.maptest = {};
//
// console.log('This is working');
//
// (function(context) {
//
//   function start() {
//console.log('Map is invoked!');
// code to draw map
var map;
var col = '#FF0000';
var link ;
var latLng;
var polypoints;

function initialize() {
  console.log('Inside function initialize!');
  // Determine which community was chosen based on pathname in the window.location object:
  var community_chosen = window.location.pathname;
  console.log('The community chosen is: ', community_chosen);
  //Drop the leading '/'
  community_chosen = community_chosen.substr(1,community_chosen.length-1);
  console.log('The NEW community_chosen substring is: ', community_chosen);
  // ONLY robson-ranch has been updated with new lat,lon
  var community_locations = [
   ['Robson Ranch', 33.138892, -97.240776, 1, './images/robson_ranch_pin.png', 'robson_ranch.html'],
   ['Frisco Lakes', 33.140053, -96.898784, 1, './images/frisco_lakes_pin.png', 'frisco_lakes.html'],
   ['Heritage Ranch', 33.139119, -96.601123, 1, './images/heritage_ranch_pin.png', 'heritage_ranch.html'],
   ['Craig Ranch', 33.149372, -96.731690, 1, './images/craig_ranch_pin.png', 'craig_ranch.html'],
   ['Villas in the Park', 33.133693, -96.643290, 1, './images/villas_in_the_park_pin.png', 'villas_in_the_park.html'],
   ['Ladera Mansfield', 32.607163, -97.105536, 1, './images/ladera_mansfield_pin.png', 'ladera_mansfield.html'],
   ['Isabella Village', 33.227600, -96.915194, 1, './images/isabella_village_pin.png', 'isabella_village_at_savannah.html'],
   ['Villas at Willow Grove', 33.173003, -96.71903, 1, './images/villas_at_willow_grove_pin.png', 'villas_at_willow_grove.html'],
   ['Village at Prestonwood', 33.035732, -96.85276, 1, './images/village_at_prestonwood_pin.png', 'village_at_prestonwood.html'],
   ['Villas of Stone Glen', 32.939097, -97.240327, 1, './images/villas_of_stone_glen_pin.png', 'villas_of_stone_glen.html'],
   ['Tuscan Hills', 33.170507, -97.098617, 1, './images/tuscan_hills_pin.png', 'tuscan_hills.html'],
   ['Orchard Flower', 33.011265, -97.02919, 1, './images/orchard_flower_pin.png', 'orchard_flower.html'],
   ['The Legends', 33.067828, -97.0863, 1, './images/the_legends_pin.png', 'the_legends.html'],
   ['Cottages at Lyndhurst', 32.916637, -97.187317, 1, './images/cottages_lyndhurst_pin.png', 'cottages_at_lyndhurst.html']
  ];

  //Settings for the community map
  for (i = 0; i < community_locations.length; i++) {
    location_chosen = community_locations[i][5];
    // Loop thru community_locations[5] to find the chosen_location, then set map accordingly
    if (location_chosen == community_chosen) {
      console.log('location_chosen is: ', location_chosen);
      var markersArray = [];
      var markers = {};
      var community_lat = community_locations[i][1];
      var community_lon = community_locations[i][2];
      console.log('community_lat is: ', community_lat);
      console.log('community_lon is: ', community_lon);
      var mapOptions = {
        center: new google.maps.LatLng(community_lat, community_lon),
        zoom: 15,
        scrollwheel: false,
        scaleControl: true,
        mapTypeId: google.maps.MapTypeId.ROADMAP,
        zoomControl: true,
        zoomControlOptions: {
          style: google.maps.ZoomControlStyle.LARGE,
          position: google.maps.ControlPosition.RIGHT_TOP
        },
        panControl: true,
        panControlOptions: {
          position: google.maps.ControlPosition.TOP_RIGHT
        }
      };
      map = new google.maps.Map(document.getElementById('map'),
      mapOptions);
    }
  }
}
google.maps.event.addDomListener(window, 'load', initialize);

//   context.start = start;
//
// })(window.maptest);
