var $ = require('jquery');

var state = {
  listings: []
};

var store = {
  listeners: [], //for keeping tracking of components listening for change events
  actions: {} //for actions, see below
}

//What a component will call so it can pass a callback/listener for change events
store.addListener = function(listener) {
  store.listeners.push(listener);
}

//Makes a copy of the state. This is to protect the state that is managed by the store.
store.copyState = function() {
  return {
    listings: state.listings
  };
}

function changed() {
  console.log('store changed', state);
  var copiedState = store.copyState()
  store.listeners.forEach(function(listener) {
    listener(copiedState);
  });
}


/* ========================================= */
/* Actions                                   */
/* ========================================= */

//Action to increment the state
store.actions.load = function() {
  //load the state
  console.log('load action fired');
  // Dynamic elements:
  // q = 'the community'
  // postalCode = 'zip code'

  //
  //var ref = document.referrer;
      //if(url(ref) =='...robson_ranch.html')
      //{
          // q_param = robson%20ranch
      //}

  // var zip_param =
  // url: 'https://api.simplyrets.com/properties?q={q_param}&status=active&type=residential&postalCode={zip_param}&limit=50'

  if (state.listings.length === 0) {
    $.ajax({
       //these AJAX calls are using the /properties endpoint
       url: 'https://api.simplyrets.com/properties?q=Robson%20Ranch&status=active&type=residential&postalCode=76207&limit=50',

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

module.exports = store;
