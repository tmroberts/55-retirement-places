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
    return (
      <div>
        <h1>Active Listings</h1>

        {this.state.listings.map((c, i) => {
          return <li key={i}>{c.name} <Link to={'/detail/' + i}>Detail</Link></li>
        })}

      </div>

    );
  }


}

module.exports = Master;
