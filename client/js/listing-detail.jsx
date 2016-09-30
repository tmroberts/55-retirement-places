import React from 'react';
import store from './rets-store.jsx';
import { Link } from 'react-router'

//var render = require('react-dom').render;

class Detail extends React.Component {

  mapStoreState(state){
    if (state.listings.length === 0) {
      store.actions.load();
      return;
    }

    var componentState = {};
    // take state and map the detail view
    var listingId = Number(this.props.params.listingId);
    for (var i = 0; i < state.listings.length; i++) {
      var compare_id = state.listings[i].listingId;
      //console.log("compare_id",compare_id,"listingId",listingId);
      if (compare_id == listingId) {
        var listing = state.listings[i];
        console.log('The listing', listing);
        componentState.currentListing=listing;
      }
    }
    componentState.selectedUrl=state.selectedUrl;
    //If componentStateUrl is 'undefined', that means we just entered the Detail and no thumbnail
    //has been selected.  Defaulting the selection to [0] causes the first image to display
    //as the default 'main-pic'.
    if (componentState.selectedUrl == undefined){
      componentState.selectedUrl = componentState.currentListing.photos[0];
    }

    console.log('This is componentState: ', componentState);
    this.setState(componentState);
  }

  handleClick() {
    var historyObj = window.history;
    history.back();
  }

  selectPhoto(evt) {
    console.log('You selected thumbnail', evt.target);
    var url = evt.target.src;
    //call the store
    store.actions.updateImage(url);
    console.log('This is the url',url);
  }

  componentWillUnmount(){
    store.actions.updateImage(undefined);
    store.removeListener(this.listeningFunc);
  }

  componentDidMount() {
    var stateObj = store.copyState();
    this.mapStoreState(stateObj)

    store.addListener(state => {
      console.log("State has changed", state);
      this.mapStoreState(state);
    });
  }
  render() {
    console.log('This is DETAIL state: ', this.state);

    if (this.state === null) {
      return (<div>loading listing...</div>)
    }


    var self = this;
    //var selectedPhoto = this.state.photo;
    //console.log('This is selectedPhoto: ', selectedPhoto);


    return (
      <div className = "detail-container">

        <h1>Listing Detail</h1>
        <br/><br/>

        <div id="main-pic">
          <img src={this.state.selectedUrl} />
        </div>

        <div className="images">
          <ul id="thumbnails">
            {this.state.currentListing.photos.map(function(item,i){
              {/*return <li key={i}><img src={item}/> </li>*/}
              return <li key={i} onClick={self.selectPhoto}>
                   <img src={self.state.currentListing.photos[i]} />
              </li>
             })
           }
          </ul>

        </div>

        <div id="listing-detail">
          <p>{this.state.currentListing.address.full}</p>
          <p>"Listing Id: "{this.state.currentListing.listingId}</p>

          <p>"Address: " {this.state.currentListing.address.full}  "  "  {this.state.currentListing.address.city}  "  "   {this.state.currentListing.address.postalCode} </p>
          <p>"City: "  {this.state.currentListing.address.city}  </p>
          <p>"Zip Code: "  {this.state.currentListing.address.postalCode}  </p>
          <p>"MLS Area: "  {this.state.currentListing.mls.area}  </p>
          <p>"MLS Area: " {this.state.currentListing.geo.marketArea}  </p>
          <p>"Directions: " {this.state.currentListing.geo.directions}  </p>
          <p>"MLS Id: "  {this.state.currentListing.mlsId}  </p>
          <p>"NEW MLS Id: " {this.state.currentListing.listingId}  </p>
          <p>"Status: "  {this.state.currentListing.mls.status}  </p>
        </div>

        <div className = "return-listings-button" onClick={this.handleClick}>Return to Listings</div>


      </div>
    );

  }

}


module.exports = Detail;
