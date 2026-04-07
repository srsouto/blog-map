import React, { Fragment } from 'react';
import PropTypes from 'prop-types';

import Overlay from '../Overlay/Overlay';

import './Photo.scss';

export default function Photo(props) {

  const { tripId, photoId } = props.match.params;

  const onClick = props.history.goBack;

  return (
    <Fragment>
      <Overlay onClick={onClick} className="Photo-overlay" zIndex={300} />
      <img onClick={onClick} className="Photo"
        src={`https://res.cloudinary.com/${process.env.CLOUDINARY_CLOUD_NAME}/image/upload/q_auto,f_auto/images/${tripId}/photos/${photoId}`} />
    </Fragment>
  );
}

Photo.propTypes = {
  history: PropTypes.object.isRequired,
  match: PropTypes.object.isRequired,
};
