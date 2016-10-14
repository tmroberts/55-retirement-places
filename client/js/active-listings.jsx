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
        <div className="left-col">
          <div className="actives-heading">Active Listings</div>
            {this.state.listings.map((listings) => {
            console.log('listings', listings);
            //add var for handling unavail image . . .
            return (
              <div className="actives-container">
                <div className ="listing-actives" key={listings.listing_id}>
                  <br/>
                  <p><span className="address">Address: {listings.address.full}</span></p>
                  <br/>
                  <div className="main-pic">
                    <img src={listings.photos[0]} />
                  </div>
                  <br/>
                  <div className="detail-left">
                    <p>List Price:  {listings.listPrice}</p>
                    <p>Status:   {listings.mls.status}</p>
                    <p>Bedrooms: {listings.property.bedrooms}</p>
                    <p>Full Baths: {listings.property.bathsFull}</p>
                    <p>Half Baths: {listings.property.bathsHalf}</p>
                    <p>Square Feet: {listings.property.area}</p>
                  </div>

                  <div className="detail-right">
                    <p>Year Built: {listings.property.yearBuilt}</p>
                    <p>Property Type: {listings.property.type}</p>
                    <p>MLS Id:  {listings.listingId}</p>
                    <p>Address: {listings.address.full}</p>
                    <p>City:   {listings.address.city}  </p>
                    <p>Zip Code:   {listings.address.postalCode}  </p>
                  </div>
                </div>

                <div className = "listings-button"><Link to={'/detail/' + listings.listingId}>View Listing Detail</Link>
                </div>
                <div className="listings-divider"></div>
              </div>
            );
          })}
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
module.exports = Master;
