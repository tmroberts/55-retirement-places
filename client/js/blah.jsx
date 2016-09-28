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


  

    );
  }

}

module.exports = Master;
