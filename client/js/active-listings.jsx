import React from 'react';
import store from './rets-store.jsx';
import { Link } from 'react-router'

class Master extends React.Component {

  constructor() {
    super();

    store.actions.load();

    this.state = store.copyState();

    store.addListener(state => {
      this.setState(state);
    });
  }


  render() {
    console.log("This is state:", this.state);
    return (
      <div>
        <h1>Active Listings</h1>

        {this.state.listings.map((c, i) => {
          console.log("***************************");
          console.log("This is search item: ", i+1);
          console.log(c[i]);
          return <li key={i}>{c.address.full} <Link to={'/detail/' + i}>Detail</Link></li>
        })}

      </div>

    );
  }

}

module.exports = Master;
