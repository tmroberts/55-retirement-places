import React from 'react';
import store from './rets-store.jsx';
import { Link } from 'react-router'

//var render = require('react-dom').render;

class Detail extends React.Component {

  findListing() {
    //console.log('the params', this.props.params);
    var listingId = Number(this.props.params.listingId);
    //console.log("The id is: ", listingId);
    var stateObj = store.copyState();
    //console.log("stateObj is: ", stateObj);

    // loop and grab the listing data with the passed in listingId
    for (var i = 0; i < stateObj.listings.length; i++) {
      var compare_id = stateObj.listings[i].listingId;
      //console.log("compare_id",compare_id,"listingId",listingId);
      if (compare_id == listingId) {
        var listing = stateObj.listings[i];
        console.log('The listing', listing);
        listing.selectedUrl=stateObj.selectedUrl;
        this.setState(listing);
      //  store.selectedUrl;
      }
    }
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


  componentDidMount() {
    this.findListing();
    store.addListener(state => {
      console.log("State has changed", state);
      this.findListing();
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
            {this.state.photos.map(function(item,i){
              {/*return <li key={i}><img src={item}/> </li>*/}
              return <li key={i} onClick={self.selectPhoto}>
                   <img src={self.state.photos[i]} />
              </li>
             })
           }
          </ul>

        </div>

        <div id="listing-detail">
          <p>{this.state.address.full}</p>
          <p>"Listing Id: "{this.state.listingId}</p>

          <p>"Address: " {this.state.address.full}  "  "  {this.state.address.city}  "  "   {this.state.address.postalCode} </p>
          <p>"City: "  {this.state.address.city}  </p>
          <p>"Zip Code: "  {this.state.address.postalCode}  </p>
          <p>"MLS Area: "  {this.state.mls.area}  </p>
          <p>"MLS Area: " {this.state.geo.marketArea}  </p>
          <p>"Directions: " {this.state.geo.directions}  </p>
          <p>"MLS Id: "  {this.state.mlsId}  </p>
          <p>"NEW MLS Id: " {this.state.listingId}  </p>
          <p>"Status: "  {this.state.mls.status}  </p>
        </div>

        <div className = "return-listings-button" onClick={this.handleClick}>Return to Listings</div>


      </div>
    );

  }

}


module.exports = Detail;
