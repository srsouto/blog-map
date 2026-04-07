import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

import './Pin.scss';

export default function Pin({ href, children, entry, tripId }) {
  const [hovered, setHovered] = useState(false);

  const classes = ['Pin'];
  if (href) {
    classes.push('clickable');
  }

  const photos = entry && entry.photos && entry.photos.slice(0, 4);

  const preview = photos && photos.length > 0 && (
    <div className={`Pin-preview${hovered ? ' Pin-preview--visible' : ''}`}>
      <p className="Pin-preview-title">{entry.title}</p>
      <div className="Pin-preview-thumbs">
        {photos.map(photo => (
          <img
            key={photo.id}
            className="Pin-preview-thumb"
            src={`https://res.cloudinary.com/${process.env.CLOUDINARY_CLOUD_NAME}/image/upload/w_360,h_240,c_fill,q_auto,f_auto/images/${tripId}/photos/${photo.id}`}
            alt=""
          />
        ))}
      </div>
    </div>
  );

  const content = (
    <div
      className="Pin-wrapper"
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      {preview}
      <div className={classes.join(' ')}>{children}</div>
    </div>
  );

  if (href) {
    return <Link to={href}>{content}</Link>;
  }

  return content;
}

Pin.defaultProps = {
  onClick: null
};

Pin.propTypes = {
  children: PropTypes.string.isRequired,
  entry: PropTypes.object,
  href: PropTypes.string,
  tripId: PropTypes.string,
};
