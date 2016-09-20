import React from 'react';
import { render } from 'react-dom';

import Header from './js/header.jsx';

require("./scss/style.scss");

class App extends React.Component {

  render () {
    return (
      <div>
        <Header />
          <nav>
            <ul>
              <li><a href="">Home</a></li>
              <li><a href="">Communities</a></li>
              <li><a href="">About North Texas</a></li>
              <li><a href="">Reviews</a></li>
              <li><a href="">Contact Us</a></li>
            </ul>
          </nav>
        <p>Hey Eric, where is my background image :)</p>

          <section class="banner">
              <!--Background image is set in .banner  -->
              <h1>Robson Ranch Landing Page</h1>
          </section>

          <div class="welcome">Welcome to Robson Ranch!  THE premier Over 55 Retirement Community of North Texas!</div>

          <div class="map">
            <img src='./images/Robson-Ranch-Map.jpg'/>
          </div>


          <div class = "communities">
              <div class = "community">
                <img src='./images/frisco_lakes_clubhouse.jpg'/>
              </div>

              <div class = "community">
                <ul class = "the-list">
                  <li>Low $200s - High $700s</li>
                  <li>7,200 Homes</li>
                  <li>Third Item</li>
                  <li>Fourth Item</li>
                </ul>
              </div>

              <div class = "community">
                <a href="frisco_lake_active_listings.html" target="_blank">
                  <div class = "listings-button">View Active Listings</div>
                </a>
              </div>

          </div>
          <footer>
            <p>&copy; Team Trosclair - Keller Williams, 2016</p>
          </footer>
      </div>
    );
  }
}

render(<App/>, document.getElementById('app'));
