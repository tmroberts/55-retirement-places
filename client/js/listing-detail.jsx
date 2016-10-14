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
        <div className="left-col">
          <div className="actives-container">
            <div className="listing-actives">
              <div className="main-pic">
                <img src={this.state.selectedUrl} />

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
            </div>
              <div className="detail-left">
                  <p>List Price:  {this.state.currentListing.listPrice}</p>
                  <p>Status:   {this.state.currentListing.mls.status}</p>
                  <p>Bedrooms: {this.state.currentListing.property.bedrooms}</p>
                  <p>Full Baths: {this.state.currentListing.property.bathsFull}</p>
                  <p>Half Baths: {this.state.currentListing.property.bathsHalf}</p>
                  <p>Square Feet: {this.state.currentListing.property.area}</p>
              </div>

              <div className="detail-right">
                <p>Year Built: {this.state.currentListing.property.yearBuilt}</p>
                <p>Property Type: {this.state.currentListing.property.type}</p>
                <p>MLS Id:  {this.state.currentListing.listingId}</p>
                <p>Address: {this.state.currentListing.address.full}</p>
                <p>City:   {this.state.currentListing.address.city}  </p>
                <p>Zip Code:   {this.state.currentListing.address.postalCode}  </p>

              </div>

            </div>
            <div className = "return-listings-button" onClick={this.handleClick}>Return to Listings</div>
          </div>
        </div>

        <div className="sidebarBox">
          <div className="scrollingBox">
            <div id="headerBar"><h3>Senior Real Estate Expert</h3></div>
            <div className="scrollingImg">
              <img src="/images/kathy1.jpg"  alt="" />
            </div>
            <div className="scrollingTxt">
              <p>Want to learn more about the North Texas area? Kathy is a real estate expert who specializes in helping buyers and sellers in this and other Over 55 Communities in North Texas. Researching communitiesthat cater to Senior Living  can be overwhelming and frustrating! Kathy can help you find homes for sale!</p>
              <br/><hr />
              <p>Kathy Roberts - Realtor</p>
              <p>Keller Williams Realty</p>
              <p>Phone:  972-370-5400</p>
              <p>www.HomeTexas.com</p>
            </div>
          </div>
        </div>

      </div>
    );
  }
}
module.exports = Detail;
