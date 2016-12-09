var $ = require('jquery');
var state = {listings: []};
var store = {
  listeners: [], //for keeping tracking of components listening for change events
  actions: {} //for actions, see below
}

//What a component will call so it can pass a callback/listener for change events
store.addListener = function(listener) {
  store.listeners.push(listener);
}

store.removeListener = function(listener) {
  var index = store.listeners.indexOf(listener);
  store.listeners.splice(index, 1);
  console.log('listener length (remove)', store.listeners.length);
}

//Makes a copy of the state. This is to protect the state that is managed by the store.
store.copyState = function() {
  return {
    listings: state.listings,
    selectedUrl: state.selectedUrl
  };
}

function changed() {
  console.log('store changed', state);
  var copiedState = store.copyState()
  store.listeners.forEach(function(listener) {
    listener(copiedState);
  });
}

// Parameterize the query string so that all 14 communities can be handled here.
function getParameterByName(name, url) {
    if (!url) url = window.location.href;
    name = name.replace(/[\[\]]/g, "\\$&");
    var regex = new RegExp("[?&]" + name + "(=([^&#]*)|&|#|$)"),
        results = regex.exec(url);
    if (!results) return null;
    if (!results[2]) return '';
    return decodeURIComponent(results[2].replace(/\+/g, " "));
}

/* ========================================= */
/* Actions                                   */
/* ========================================= */
//Action to increment the state
store.actions.load = function() {
  //load the state
  console.log('load action fired');
  // Dynamic elements:
  var q = getParameterByName('q');
  var postalCode = getParameterByName('postalCode');

  // th 9/28/2016: to stop extraneous api calls
  // I have data already! Don't make ajax call.
  // if (state.listings.length > 0) {
  //   changed();
  //   return;
  // }

  if (state.listings.length === 0) {
    $.ajax({
       //the AJAX call uses the /properties endpoint
       //url: 'https://api.simplyrets.com/properties?q=Robson%20Ranch&status=active&type=residential&postalCode=76207&limit=50',

       url: 'https://api.simplyrets.com/properties?limit=50&type=residential&status=active&q='+ q + '&postalCode=' + postalCode,

       beforeSend: function (xhr) {
           xhr.setRequestHeader ("Authorization", "Basic " + btoa('tmrob_3503e746'+ ":" + '4221b62v5493lg44'));
       }
     })
     .done(function(returnedData) {
       console.log('data', returnedData);
       state.listings = returnedData;
       changed();
     });
  }
}

store.actions.updateImage = function(url) {
  state.selectedUrl=url;
  changed();
}

module.exports = store;
