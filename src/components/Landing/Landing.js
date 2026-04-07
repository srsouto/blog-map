import React from 'react';
import PropTypes from 'prop-types';

import adventures from '../../adventures/adventures.json';
import './Landing.scss';

function countryCodeToFlag(code) {
  return code.toUpperCase().split('').map(c =>
    String.fromCodePoint(c.charCodeAt(0) - 65 + 0x1F1E6)
  ).join('');
}

export default function Landing({ history }) {
  return (
    <div className="Landing">
      <h1 className="Landing-heading">Choose your adventure</h1>
      <div className="Landing-grid">
        {adventures.map(adventure => (
          <div
            key={adventure.id}
            className="Landing-card"
            onClick={() => history.push(`/${adventure.id}/`)}
          >
            <div className="Landing-card-flags">
              {adventure.countries.map(code => (
                <span key={code}>{countryCodeToFlag(code)}</span>
              ))}
            </div>
            <h2 className="Landing-card-title">{adventure.title}</h2>
            <p className="Landing-card-year">{adventure.year}</p>
            <p className="Landing-card-description">{adventure.description}</p>
            <span className="Landing-card-cta">Explore →</span>
          </div>
        ))}
      </div>
    </div>
  );
}

Landing.propTypes = {
  history: PropTypes.object.isRequired,
};
