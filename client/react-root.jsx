import React from 'react';
import { render } from 'react-dom';
import { Router, Route, Link, hashHistory } from 'react-router'

import Master from './js/active-listings.jsx';
import Detail from './js/listing-detail.jsx';


require("./scss/style.scss");

class App extends React.Component {

  render () {
    return (
      <div>
        <p>This is the new REACTIFIED listing page woot!</p>

    </div>
    );
  }
}

// render((
//   <Router history={hashHistory}>
//     <Route path="/" component={App}>
//       <Route path="master" component={Master}/>
//       <Route path="detail/:index" component={Detail} />
//       //<Route path="whateverIwantittobe" component={Third} />
//     </Route>
//   </Router>
// ), document.getElementById('app'));

render(<App/>, document.getElementById('app'));
