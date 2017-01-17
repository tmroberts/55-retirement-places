// 'use strict';
// if (this.maptest === undefined) this.maptest = {};
//
// console.log('This is working');
//
// (function(context) {
//
//
//
//   function start() {

    //Call your code here
    //console.log('Map is invoked!');
    // code to draw map
    var map;
    var link ;
    var latLng;
    var polypoints;

    function initialize() {
      console.log('Inside function initialize!');
      var community_locations = [
         ['Robson Ranch', 33.138827, -97.2443139, 1, './images/robson_ranch_pin.png', 'robson_ranch.html'],
         ['Frisco Lakes', 33.140053, -96.898784, 1, './images/frisco_lakes_pin.png', 'frisco_lakes.html'],
         ['Heritage Ranch', 33.138434, -96.594068, 1, './images/heritage_ranch_pin.png', 'heritage_ranch.html'],
         ['Craig Ranch', 33.149372, -96.731690, 1, './images/craig_ranch_pin.png', 'craig_ranch.html'],
         ['Villas in the Park', 33.133693, -96.643290, 1, './images/villas_in_the_park_pin.png', 'villas_in_the_park.html'],
         ['Ladera Mansfield', 32.607163, -97.105536, 1, './images/ladera_mansfield_pin.png', 'ladera_mansfield.html'],
         ['Isabella Village', 33.227600, -96.915194, 1, './images/isabella_village_pin.png', 'isabella_village.html'],
         ['Villas at Willow Grove', 33.173003, -96.71903, 1, './images/villas_at_willow_grove_pin.png', 'villas_at_willow_grove.html'],
         ['Village at Prestonwood', 33.035732, -96.85276, 1, './images/village_at_prestonwood_pin.png', 'village_at_prestonwood.html'],
         ['Villas of Stone Glen', 32.939097, -97.240327, 1, './images/villas_of_stone_glen_pin.png', 'villas_of_stone_glen.html'],
         ['Tuscan Hills', 33.170507, -97.098617, 1, './images/tuscan_hills_pin.png', 'tuscan_hills.html'],
         ['Orchard Flower', 33.011265, -97.02919, 1, './images/orchard_flower_pin.png', 'orchard_flower.html'],
         ['The Legends', 33.067828, -97.0863, 1, './images/the_legends_pin.png', 'the_legends.html'],
         ['Cottages at Lyndhurst', 32.916637, -97.187317, 1, './images/cottages_lyndhurst_pin.png', 'cottages_lyndhurst.html']
      ];
      var markersArray = [];
      var markers = {};
      var mapOptions = {
        center: new google.maps.LatLng(33.140053, -96.898784),
        zoom: 10,
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

      /*
      - create the map object
      Two parameters:
        -- page/html element where the map will be loaded
        -- mapOptions - tells Google how we want the mapto display
      */
      map = new google.maps.Map(document.getElementById('map'),
      mapOptions);

     //***  Communities
      var marker, i;
      var id = 'community';

      for (i = 0; i < community_locations.length; i++) {
        var id = 'community' + (i+1);
          //console.log('This is community_locations[i][4]: ',community_locations[i][4]);
          //console.log('The value of id is: ',id);
          marker = new google.maps.Marker({
          position: new google.maps.LatLng(community_locations[i][1], community_locations[i][2]),
          map: map
          ,id: id
          ,icon:'pin-red.png'
          ,url: community_locations[i][5]
          ,zIndex:100
          ,altIcon: community_locations[i][4]
        });

          google.maps.event.addListener(marker, 'mouseover', function(event) {
              this.setIcon(this.altIcon);
              //this.setIcon('pin-blue.png');
          });
          google.maps.event.addListener(marker, 'mouseout', function(event) {
              //this.setIcon('blue_circle.png');
              this.setIcon('pin-red.png');
          });
      }
    }
    google.maps.event.addDomListener(window, 'load', initialize);
  //
  //
  // }

//   context.start = start;
//
// })(window.maptest);
