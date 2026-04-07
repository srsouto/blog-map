import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

import './TripLink.scss';

export default function TripLink({ trip }) {
  return (
    <Link to={`/${trip.id}/`}>
      <div className="TripLink">
        <div className="TripLink-label">{trip.linkTitle}</div>
        <div className="TripLink-stem" />
        <div className="TripLink-dot" />
      </div>
    </Link>
  );
}

TripLink.propTypes = {
  trip: PropTypes.object.isRequired,
};
