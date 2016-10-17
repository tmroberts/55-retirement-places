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
    window.scrollTo(0,0);
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
        <div className="sidebarBox">
          <div className="scrollingBox">
            <div id="headerBar"><h3>Senior Real Estate Expert</h3></div>
            <div className="scrollingImg">
              <img src="/images/kathy1.jpg"  alt="" />
            </div>
            <div className="scrollingTxt">
              <p>Want more information about Over 55 Communities in North Texas?  Kathy is a senior real estate specialist who will listen deeply, ask the right questions, take time to get to know your family’s situation and help develop available options so the outcome is one that will suit your family the best.  She has a 30+ year career in the real estate/mortgage industry with a strong focus on providing the best customer service whether you are buying, selling or investing in real estate.  Following the golden rule and treating her clients the way she would want to be treated is top priority and always goes the extra mile to shows that dedication.  Call Kathy so you can experience this exceptional level of service for yourself.</p>
              <br/><hr />
              <p>Kathy Roberts - Realtor</p>
              <p>Keller Williams Realty</p>
              <p>Phone:  972-370-5400</p>
              <p>www.HomeTexas.com</p>
            </div>
          </div>
        </div>

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


              <div className="detail-main-info">

                <div className="detail-bar"></div>
                <div className="detail-left">
                  <dl>
                    <dt className="detail-label">List Price</dt>
                    <dd className="detail-text">{this.state.currentListing.listPrice}</dd>
                    <dt className="detail-label">Status</dt>
                    <dd className="detail-text">{this.state.currentListing.mls.status}</dd>
                    <dt className="detail-label">Bedrooms</dt>
                    <dd className="detail-text">{this.state.currentListing.property.bedrooms}</dd>
                    <dt className="detail-label">Full Baths</dt>
                    <dd className="detail-text">{this.state.currentListing.property.bathsFull}</dd>
                    <dt className="detail-label">Half Baths</dt>
                    <dd className="detail-text">{this.state.currentListing.property.bathsHalf}</dd>
                    <dt className="detail-label">Square Feet</dt>
                    <dd className="detail-text">{this.state.currentListing.property.area}</dd>
                    <dt className="detail-label">Year Built</dt>
                    <dd className="detail-text">{this.state.currentListing.property.yearBuilt}</dd>
                    <dt className="detail-label">Property Type</dt>
                    <dd className="detail-text">{this.state.currentListing.property.type}</dd>
                    <dt className="detail-label">MLS Id</dt>
                    <dd className="detail-text">{this.state.currentListing.listingId}</dd>
                    <dt className="detail-label">Address</dt>
                    <dd className="detail-text">{this.state.currentListing.address.full}</dd>
                    <dt className="detail-label">City</dt>
                    <dd className="detail-text">{this.state.currentListing.address.city}</dd>
                    <dt className="detail-label">Zip Code</dt>
                    <dd className="detail-text">{this.state.currentListing.address.postalCode}</dd>
                  </dl>
                </div>
              </div>

              <div className="detail-description">
                  <div className="detail-label">Description</div>
                  <div className="detail-text">{this.state.currentListing.remarks}</div>
              </div>

              <div className="courtesyBox">
                <div className="courtesyImg">
                  <img src="images/NTREISlogo_CMYK_60.png"  alt="" />
                </div>
                <div className="courtesyTxt">
                  <p>Listing courtesy of Jim Swiggert of ABC Realty
                    © 2016 North Texas Real Estate Information Systems. All rights reserved. Information is deemed reliable, but is not guaranteed accurate by the MLS or NTREIS. The information being provided is for the consumers personal, non-commercial use, and may not be reproduced, redistributed or used for any purpose other than to identify prospective properties consumers may be interested in purchasing.
                  </p>
                </div>
              </div>

            </div>

            <div className = "return-listings-button" onClick={this.handleClick}>Return to Listings</div>
          </div>
        </div>



      </div>
    );
  }
}
module.exports = Detail;
