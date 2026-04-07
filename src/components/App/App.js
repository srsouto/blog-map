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
    this._pendingTripLoad = null;
    this.state = {
      trips: null,
      selectedTrip: null,
      currentZoom: null,
      adventureId: null,
      mapsApiReady: false,
    };
  }

  _onGoogleApiLoaded() {
    this.setState({ mapsApiReady: true });
    if (this._pendingTripLoad) {
      const { trips, selectedTrip, adventureId } = this._pendingTripLoad;
      this._pendingTripLoad = null;
      this._geocodeAndSetState(trips, selectedTrip, adventureId);
    }
  }

  _onTripLoad(trips, selectedTrip, adventureId) {
    if (!this.state.mapsApiReady) {
      this._pendingTripLoad = { trips, selectedTrip, adventureId };
      return;
    }
    this._geocodeAndSetState(trips, selectedTrip, adventureId);
  }

  _geocodeAndSetState(trips, selectedTrip, adventureId) {
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
          }));
        }
      });
      Promise.all(requestsForCoords).then(() => {
        this.setState({ trips, selectedTrip, adventureId });
      });
    } else {
      this.setState({ trips, selectedTrip, adventureId });
    }
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
                onZoomChange={zoom => this._onMapZoomChange(zoom)}
                onGoogleApiLoaded={() => this._onGoogleApiLoaded()} />
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
