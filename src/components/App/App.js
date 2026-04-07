/* global module, google */

import React, { Fragment } from 'react';
import { Router, Route, Switch } from 'react-router-dom';
import { hot } from 'react-hot-loader';
import { createBrowserHistory } from 'history';

import Entry from '../Entry/Entry';
import Header from '../Header/Header';
import Landing from '../Landing/Landing';
import Map from '../Map/Map';
import Photo from '../Photo/Photo';
import TripSelector from '../TripSelector/TripSelector';

import './App.scss';

const history = createBrowserHistory();
history.listen(function (location) {
  window.ga('set', 'page', location.pathname + location.search);
  window.ga('send', 'pageview', location.pathname + location.search);
});

class App extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      trips: null,
      selectedTrip: null,
      currentZoom: null,
      adventureId: null,
    };
  }

  _onTripLoad(trips, selectedTrip, adventureId) {
    if (selectedTrip) {
      const requestsForCoords = [];
      selectedTrip.entries.forEach((entry, i) => {
        if (entry.address) {
          requestsForCoords.push(new Promise((resolve, reject) => {
            new google.maps.Geocoder().geocode({ address: entry.address }, (results, status) => {
              if (status === 'OK') {
                const location = results[0].geometry.location;
                selectedTrip.entries[i].coords = [location.lat(), location.lng()];
                resolve();
              } else {
                reject(new Error(`Geocoding failed: ${status}`));
              }
            });
          }))
        }
      });
      Promise.all(requestsForCoords).then(() => {
        this.setState({ trips, selectedTrip, adventureId });
      })
    }
    if (!selectedTrip) {
      this.setState({ trips, selectedTrip, adventureId });
    }
    return null;
  }

  _onMapZoomChange(zoom) {
    if (zoom <= 5 && this.state.currentZoom && zoom != this.state.currentZoom) {
      history.push(`/${this.state.adventureId}/`);
    }
    this.setState({ currentZoom: 5 });
  }

  render() {
    const tripSelector = (props) => <TripSelector {...props}
      onLoad={(trips, trip, adventureId) => this._onTripLoad(trips, trip, adventureId)} />;

    return (
      <Router history={history}>
        <Switch>
          <Route exact path="/" component={Landing} />
          <Route>
            <Fragment>
              <Header selectedTrip={this.state.selectedTrip} adventureId={this.state.adventureId} />
              <Map {...this.state}
                onZoomChange={zoom => this._onMapZoomChange(zoom)} />
              <Route exact path="/:adventureId/" render={tripSelector} />
              <Route path="/:adventureId/:tripId/" render={tripSelector} />
              <Route path="/:adventureId/:tripId/:entryId-:entrySlug" component={Entry} />
              <Route path="/:adventureId/:tripId/:entryId-:entrySlug/:photoId" component={Photo} />
            </Fragment>
          </Route>
        </Switch>
      </Router>
    );
  }
}

export default hot(module)(App);
