import React from 'react';
import store from './rets-store.jsx';
import { Link } from 'react-router'

class Master extends React.Component {

  constructor() {
    super();

    store.actions.load();

    this.state = store.copyState();

    store.addListener(state => {
      console.log("State has changed", state);
      this.setState(state);
    });
  }

  render() {
  console.log("This is state:", this.state);
    return (
      <div className = "listings">
        <h1>Active Listings</h1>

        {this.state.listings.map((listings) => {
            console.log('listings', listings);

          return (

            <div className ="listings-container" key={listings.listing_id}>
              <br/><hr /><br/>
              <div id="image"><img src={listings.photos[0]} /></div>
              <p>{listings.address.full}</p>
              <p>"Address: " {listings.address.full}  "  "  {listings.address.city}  "  "   {listings.address.postalCode} </p>
              <p>"City: "  {listings.address.city}  </p>
              <p>"Zip Code: "  {listings.address.postalCode}  </p>
              <p>"MLS Area: "  {listings.mls.area}  </p>
              <p>"MLS Area: " {listings.geo.marketArea}  </p>
              <p>"Directions: " {listings.geo.directions}  </p>
              <p>"MLS Id: "  {listings.mlsId}  </p>
              <p>"NEW MLS Id: " {listings.listingId}  </p>
              <p>"Status: "  {listings.mls.status}  </p>
              <div className = "listings-button"><Link to={'/detail/' + listings.listingId}>View Listing Detail</Link></div>

            </div>
          );
        })}

      </div>

    );
  }

}

module.exports = Master;
