import 'whatwg-fetch';

import React, { Fragment } from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import { Helmet } from 'react-helmet';

import Entry from '../Entry/Entry';
import Header from '../Header/Header';
import Map from '../Map/Map';

export default () => (
  <Router>
    <Fragment>
      <Helmet>
        <title>Road trip en Islande</title>
      </Helmet>
      <Header />
      <Map
        googleMapURL="https://maps.googleapis.com/maps/api/js?key=GOOGLE_MAPS_API_KEY_REMOVED"
        loadingElement={<div style={{ height: `100%` }} />}
        containerElement={<div style={{ height: '100vh', position: 'fixed', top: 0, width: '100vw' }} />}
        mapElement={<div style={{ height: `100vh` }} />}
      />
      <Switch>
        <Route path="/entry/:id" component={Entry} />
      </Switch>
    </Fragment>
  </Router>
);
