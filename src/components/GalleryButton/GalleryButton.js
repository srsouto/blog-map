import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

import './GalleryButton.scss';

export default function GalleryButton({ shown, adventureId }) {

  const galleryButtonClasses = ['galleryButton'];

  if (!shown) {
    galleryButtonClasses.push('hidden');
  }

  return (
    <Link to={`/${adventureId}/gallery`} className={galleryButtonClasses.join(' ')}>
      Gallery View
    </Link>
  );
}

GalleryButton.defaultProps = {
  shown: false,
};

GalleryButton.propTypes = {
  shown: PropTypes.bool.isRequired,
  adventureId: PropTypes.string,
};
