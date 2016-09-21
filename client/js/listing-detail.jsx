import React from 'react';
import store from './rets-store.jsx';


class Detail extends React.Component {

  componentDidMount() {
    console.log('the params', this.props.params);
    var id = Number(this.props.params.index);
    var stateObj = store.copyState();
    var dude = stateObj.listings[id];
    console.log('teh dude', dude);
    this.setState(dude);
  }


  render() {
    console.log('detail state is what?', this.state);

    if (this.state === null) {
      return (<div>loading listing...</div>)
    }


    return (
      <div className = "listings">
        <h1>Active Listings</h1>

        {this.state.listings.map((listings, i) => {
            console.log('listings', listings);
            console.log("***************************");
            console.log("This is search item: ", i+1);
            console.log(listings[i]);
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
              <div class = "listings-button"><Link to={'/detail/' + listings.listingId}>Return to  Listings</Link></div>

            </div>
          );
        })}

      </div>
    );
  }

}


module.exports = Detail;
