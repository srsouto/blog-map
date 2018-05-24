/* global google */
/* exported initMap */

'use strict';

import 'whatwg-fetch';

import React, { Fragment } from 'react';
import ReactDOM from 'react-dom';

import Header from './components/Header/Header';
import Map from './components/Map/Map';

const App = () => (
  <Fragment>
    <Header />
    <Map
      googleMapURL="https://maps.googleapis.com/maps/api/js?key=GOOGLE_MAPS_API_KEY_REMOVED"
      loadingElement={<div style={{ height: `100%` }} />}
      containerElement={<div style={{ height: '100vh', position: 'absolute', top: 0, width: '100vw' }} />}
      mapElement={<div style={{ height: `100vh` }} />}
    />
  </Fragment>
)

ReactDOM.render(<App />,
  document.getElementById('root')
);
