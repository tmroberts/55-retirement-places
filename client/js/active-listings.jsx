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
              //add conditional to handle loading mechanism
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

                  <div className="detail-main-info">

                    <div className="detail-left">
                      <dl>
                         <dt className="detail-label">List Price</dt>
                         <dd className="detail-text listPrice">{listings.listPrice}</dd>
                           <dt className="detail-label">Status</dt>
                           <dd className="detail-text">{listings.mls.status}</dd>
                           <dt className="detail-label">MLS Id</dt>
                           <dd className="detail-text">{listings.listingId}</dd>
                           <dt className="detail-label">Address</dt>
                           <dd className="detail-text">{listings.address.full}</dd>
                           <dt className="detail-label">City</dt>
                           <dd className="detail-text">{listings.address.city}</dd>
                           <dt className="detail-label">Zip Code</dt>
                           <dd className="detail-text">{listings.address.postalCode}</dd>
                      </dl>
                    </div>

                    <div className="detail-right">
                      <dt className="detail-label">Year Built</dt>
                      <dd className="detail-text">{listings.property.yearBuilt}</dd>
                      <dt className="detail-label">Type</dt>
                      <dd className="detail-text">{listings.property.type}</dd>
                      <dt className="detail-label">Bedrooms</dt>
                      <dd className="detail-text">{listings.property.bedrooms}</dd>
                      <dt className="detail-label">Full Baths</dt>
                      <dd className="detail-text">{listings.property.bathsFull}</dd>
                      <dt className="detail-label">Half Baths</dt>
                      <dd className="detail-text">{listings.property.bathsHalf}</dd>
                      <dt className="detail-label">Square Feet</dt>
                      <dd className="detail-text">{listings.property.area}</dd>
                    </div>

                  </div>

                </div>
                <div className="listings-button"><Link to={'/detail/' + listings.listingId}>View Listing Detail</Link></div>
                <div className="listings-divider"></div>
              </div>
            );
          })}
        </div>


      </div>
    );
  }
}
module.exports = Master;
