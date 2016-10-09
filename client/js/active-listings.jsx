import React from 'react';
import store from './rets-store.jsx';
import { Link } from 'react-router'

class Master extends React.Component {

  constructor() {
    super();

    store.actions.load();

    this.state = store.copyState();

    this.listeningFunc = (state) => {
      console.log("MASTER State has changed", state);
      this.setState(state);
    }
    store.addListener(this.listeningFunc);
  }

  componentWillUnmount() {
    console.log('component will unmount');
    store.removeListener(this.isteningFunc);
  }


  render() {
  console.log("This is state:", this.state);
    return (
      <div className = "detail-container">
        <h1>Active Listings</h1>

        {this.state.listings.map((listings) => {
            console.log('listings', listings);

          return (

            <div id ="listing-actives" key={listings.listing_id}>
              <br/><hr /><br/>

              <div id="main-pic-actives">
                <img src={listings.photos[0]} />
              </div>
              <div id="actives-container">
                <h1><span class="actives-heading">Active</span> Listings</h1>
                <br/><br/>
                <p>List Price:  {listings.listPrice}</p>
                <p>Status:   {listings.mls.status}</p>
                <p>Bedrooms: {listings.property.bedrooms}</p>
                <p>Full Baths: {listings.property.bathsFull}</p>
                <p>Half Baths: {listings.property.bathsHalf}</p>
                <p>Square Feet: {listings.property.area}</p>
                <p>Year Built: {listings.property.yearBuilt}</p>
                <p>Property Type: {listings.property.type}</p>
                <p>MLS Id:  {listings.listingId}</p>
                <p>Address: {listings.address.full}</p>
                <p>City:   {listings.address.city}  </p>
                <p>Zip Code:   {listings.address.postalCode}  </p>
                <p>Directions:  {listings.geo.directions}  </p>
                <br/><br/>
              </div>

              <div className = "listings-button"><Link to={'/detail/' + listings.listingId}>View Listing Detail</Link>
              </div>
              <br/><br/>

            </div>
          );
        })}

      </div>

    );
  }

}
module.exports = Master;
