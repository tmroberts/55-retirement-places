'use strict'
if (this.Explore === undefined) this.Explore = {};

(function(context) {

  function getListingsApi()  {
    $.ajax({
       //these AJAX calls are using the /properties endpoint
       //url: 'https://api.simplyrets.com/properties?q=76207',
       //url: 'https://api.simplyrets.com/properties?q=76207&status=Active',
       //url: 'https://api.simplyrets.com/properties?q=13442957',
       url: 'https://api.simplyrets.com/properties?q=Robson%20Ranch&status=active&type=residential&postalCode=76207&limit=50',
       //url: 'https://api.simplyrets.com/properties?q=Frisco%20Lakes&status=Active',
       //url: 'https://api.simplyrets.com/properties?q=Ladera%20Mansfield',
       //url: 'https://api.simplyrets.com/properties?q=Village%20at%20Prestonwood&status=Active',
       //url: 'https://api.simplyrets.com/properties?q=The%20Legends&status=Active',
       //url: 'https://api.simplyrets.com/properties?q=13442957',
       beforeSend: function (xhr) {
           xhr.setRequestHeader ("Authorization", "Basic " + btoa('tmrob_3503e746'+ ":" + '4221b62v5493lg44'));
       }
     })
     .done(function(data){
       for(var i=0; i < data.length; i++) {
         $("#app").append("<br>" + "<hr />" + "<br>");
         $("#app").append("<img src= \"" + decodeURIComponent(data[i].photos[0]) + "\"/>");
         console.log("***************************");
         console.log("This is search item: ", i+1);
         console.log(data[i]);
         $("#app").append("<p>" +  "Address: " + data[i].address.full + "  " + data[i].address.city + "  " +  data[i].address.postalCode + "</p>");
         $("#app").append("<p>" +  "City: " + data[i].address.city + "</p>");
         $("#app").append("<p>" +  "Zip Code: " + data[i].address.postalCode + "</p>");
         $("#app").append("<p>" +  "MLS Area: " + data[i].mls.area + "</p>");
         $("#app").append("<p>" +  "MLS Area: " + data[i].geo.marketArea + "</p>");

         $("#app").append("<p>" +  "Directions: " + data[i].geo.directions + "</p>");
         $("#app").append("<p>" +  "MLS Id: " + data[i].mlsId + "</p>");
         $("#app").append("<p>" +  "NEW MLS Id: " + data[i].listingId + "</p>");
         $("#app").append("<p>" +  "Status: " + data[i].mls.status + "</p>");
         $("#app").append("<p>" +  "Listing Type: " + data[i].mlsId + "</p>");
         $("#app").append("<p>" +  "List Price: " + data[i].listPrice + "</p>");
         $("#app").append("<p>" +  "Old Subdivision: " + data[i].property.subdivision + "</p>");
         var subdivision = data[i].property.subdivision
         subdivision = subdivision.slice(0,12);
         $("#app").append("<p>" +  "New Subdivision: " + subdivision + "</p>");
         $("#app").append("<p>" +  "This is the LAT: " + data[i].geo.lat + "</p>");
         $("#app").append("<p>" +  "This is the LNG: " + data[i].geo.lng + "</p>");
         $("#app").append("<br>" + "<hr />" + "<br>");
         //$("#app").append("<p>" +  "Square Feet: " + data[i]. + "</p>");
         //need to grab what is in betwee the double quotes

 //http://matrixmedia.ntreis.net/mediaserver/GetMedia.ashx?Key=64819367&amp;TableID=9&amp;Type=1&amp;Number=0&amp;Size=3&amp;NNF=1&amp;x=UGFkSWZOZWVkZWQ9ZmFsc2U)&amp;ufk=B*6bOXuLPJCnhpqNbEBlmj5*mNI)
         //var string = JSON.stringify(data, null, '\t');
         //$('#output').html(string);
         //console.log('data', data);
         //console.log(xhr);
        }
     });
  }

  function start()  {
    getListingsApi();
  }

  context.start = start;

})(window.Explore);
