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
      <div>
        <h2>{this.state.address.full}</h2>
        <p>Listing Id: {this.state.listingId}</p>
      </div>
    );
  }

}

module.exports = Detail;
