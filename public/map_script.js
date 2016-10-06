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
    console.log('Map is invoked!');
    // code to draw map
    var map;
    var col = '#FF0000';
    //var col = '#0000FF';
    var link ;
    var latLng;
    var polypoints;

    function initialize() {
      console.log('Inside function initialize!');
      var community_locations = [
         ['Robson Ranch', 33.138827, -97.2443139, 1, './images/robson_ranch_pin.png', 'http://localhost:5000/robson_ranch.html'],
         ['Frisco Lakes', 33.140053, -96.898784, 1, './images/frisco_lakes_pin.png', 'frisco_lakes.html'],
         ['Heritage Ranch', 33.138434, -96.594068, 1, './images/heritage_ranch_pin.png', 'heritage_ranch.html'],
         ['Craig Ranch', 33.149372, -96.731690, 1, './images/craig_ranch_pin.png', 'craig_ranch.html']
      ];
      var markersArray = [];
      var markers = {};
      var mapOptions = {
        center: new google.maps.LatLng(33.0212642, -96.9076653),
        //center: new google.maps.LatLng(33.57801474614399, -96.85546875),
        zoom: 10,
        scrollwheel: true,
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

     //***  Communities
      var marker, i;
      var id = 'community';

      for (i = 0; i < community_locations.length; i++) {
        var id = 'community' + (i+1);
          console.log('This is community_locations[i][4]: ',community_locations[i][4]);
          console.log('The value of id is: ',id);
          marker = new google.maps.Marker({
          position: new google.maps.LatLng(community_locations[i][1], community_locations[i][2]),
          map: map
          ,id: id
          //,icon: 'red_circle.png'
          ,icon:'pin-red.png'
          ,url: community_locations[i][5]
          ,zIndex:100
          //,size: new google.maps.Size(20, 32)
          ,altIcon: community_locations[i][4]
          //,altIcon: 'robson_ranch.jpg'
        });

          google.maps.event.addListener(marker, 'mouseover', function(event) {
              //this.setIcon(this.altIcon);
              this.setIcon('pin-blue.png');
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
