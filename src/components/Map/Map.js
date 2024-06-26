import React, { Fragment, useState } from 'react';
import PropTypes from 'prop-types';
import GoogleMapReact from 'google-map-react';
import { withRouter } from 'react-router-dom';
import slugify from 'slugify';
import { useEffect } from 'react';

import HomeButton from '../HomeButton/HomeButton';
import Pin from '../Pin/Pin';
import TripLink from '../TripLink/TripLink';

import { getZoomForWidth } from '../../utils';

import './Map.scss';

const Map = ({ onZoomChange, trips, selectedTrip }) => {
  const [markers, setMarkers] = useState([]);

  useEffect(() => {
    createMarkers();
  }, [trips, selectedTrip]);

  const createMarkers = async () => {
    if (selectedTrip) {
      setMarkers(selectedTrip.entries.map(entry => {
        const entrySlug = slugify(entry.title, { lower: true, remove: /[:,]/ });
        if (!entry.coords) {
          return null;
        }
        return (
          <Pin key={`${entry.trip}-${entry.id}`}
            lat={entry.coords[0]} lng={entry.coords[1]}
            href={`/${selectedTrip.id}/${entry.id}-${entrySlug}`}
          >
            {entry.id}
          </Pin>
        );
      }));
    } else if (trips) {
      setMarkers(trips.map(trip => {
        const { lat, lng } = trip.mapCenter;
        return (
          <TripLink key={`${trip.id}`} lat={lat} lng={lng} trip={trip} />
        );
      }));
    }
  }

  let center = { lat: 42.0902321, lng: -5.0199736 };
  let zoomLevels = { desktop: 7, mobile: 6 };
  if (selectedTrip) {
    center = selectedTrip.mapCenter;
    zoomLevels = selectedTrip.mapZoomLevels;
  }

  const onClick = ({ lat, lng }) => {
    const copy = document.createElement('input');
    copy.value = `["${lat}", "${lng}"]`;
    document.body.appendChild(copy);
    copy.select();
    document.execCommand('copy');
    document.body.removeChild(copy);
  };

  const onChange = ({ zoom }) => {
    onZoomChange(zoom);
  };

  const githubButton = (
    <a href="https://github.com/srsouto/blog-map" className="github-corner" aria-label="View source on Github">
      <svg width="50" height="50" viewBox="0 0 250 250" className="github-corner-image" aria-hidden="true">
        <path d="M0,0 L115,115 L130,115 L142,142 L250,250 L250,0 Z"></path>
        <path d="M128.3,109.0 C113.8,99.7 119.0,89.6 119.0,89.6 C122.0,82.7 120.5,78.6 120.5,78.6 C119.2,72.0 123.4,76.3 123.4,76.3 C127.3,80.9 125.5,87.3 125.5,87.3 C122.9,97.6 130.6,101.9 134.4,103.2"
          fill="currentColor" style={{ transformOrigin: '130px 106px' }} className="octo-arm"></path>
        <path d="M115.0,115.0 C114.9,115.1 118.7,116.5 119.8,115.4 L133.7,101.6 C136.9,99.2 139.9,98.4 142.2,98.6 C133.8,88.0 127.5,74.4 143.8,58.0 C148.5,53.4 154.0,51.2 159.7,51.0 C160.3,49.4 163.2,43.6 171.4,40.1 C171.4,40.1 176.1,42.5 178.8,56.2 C183.1,58.6 187.2,61.8 190.9,65.4 C194.5,69.0 197.7,73.2 200.1,77.6 C213.8,80.2 216.3,84.9 216.3,84.9 C212.7,93.1 206.9,96.0 205.4,96.6 C205.1,102.4 203.0,107.8 198.3,112.5 C181.9,128.9 168.3,122.5 157.7,114.1 C157.9,116.9 156.7,120.9 152.7,124.9 L141.0,136.5 C139.8,137.7 141.6,141.9 141.8,141.8 Z"
          fill="currentColor" className="octo-body"></path>
      </svg>
    </a>
  );

  return (
    <Fragment>
      <HomeButton shown={!!selectedTrip} />
      {githubButton}
      <div className="Map">
        <GoogleMapReact onClick={onClick}
          options={() => ({ fullscreenControl: false })}
          bootstrapURLKeys={{ key: process.env.GOOGLE_MAPS_API_KEY || '' }}
          zoom={getZoomForWidth(zoomLevels)}
          center={center}
          onChange={onChange}
        >
          {markers}
        </GoogleMapReact>
      </div>
    </Fragment>
  );
};

Map.propTypes = {
  history: PropTypes.object.isRequired,
  onZoomChange: PropTypes.func.isRequired,
  selectedTrip: PropTypes.object,
  trips: PropTypes.array,
};

export default withRouter(Map);
