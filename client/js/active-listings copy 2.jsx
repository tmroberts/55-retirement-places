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
      <div className = "listings">
        <h1>Active Listings</h1>

        {this.state.listings.map((listings) => {
            console.log('listings', listings);

          return (


            <div className ="listings-container" key={listings.listing_id}>
              <br/><hr /><br/>
              <div id="image"><img src={listings.photos[0]} /></div>
              <p>List Price:  {listings.geo.listPrice}</p>
              <p>Status:   {listings.mls.status}</p>
              <p>Bedrooms: {listings.property.bedrooms}</p>
              <p>Full Baths: {listings.property.bathsFull}</p>
              <p>Half Baths {listings.property.bathsHalf}</p>
              <p>Square Feet: {listings.mls.area}</p>


              <p>NEW MLS Id:  {listings.listingId}  </p>
              <p>{listings.address.full}</p>
              <p>Address:  {listings.address.full}  "  "  {listings.address.city}  "  "   {listings.address.postalCode} </p>
              <p>City:   {listings.address.city}  </p>
              <p>Zip Code:   {listings.address.postalCode}  </p>
              <p>Directions:  {listings.geo.directions}  </p>






              <p>"MLS Area: "  {listings.mls.area}  </p>
              <p>"MLS Area: " {listings.geo.marketArea}  </p>




              //<p>"Subdivision:" {listings.subdivision}</p>

              <div className = "listings-button"><Link to={'/detail/' + listings.listingId}>View Listing Detail</Link></div>
              <br/><br/>
            </div>
          );
        })}

      </div>

    );
  }

}

module.exports = Master;
