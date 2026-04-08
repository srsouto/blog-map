import React, { Fragment, useState } from 'react';
import PropTypes from 'prop-types';

import Overlay from '../Overlay/Overlay';

import trips from '../../trips/trips.json';

import './Gallery.scss';

export default function Gallery({ history, match }) {
  const { adventureId } = match.params;
  const [lightbox, setLightbox] = useState(null);

  const cloudName = process.env.CLOUDINARY_CLOUD_NAME;

  const thumbUrl = (tripId, photoId) =>
    `https://res.cloudinary.com/${cloudName}/image/upload/w_400,h_300,c_fill,q_auto,f_auto/images/${tripId}/photos/${photoId}`;

  const fullUrl = (tripId, photoId) =>
    `https://res.cloudinary.com/${cloudName}/image/upload/q_auto,f_auto/images/${tripId}/photos/${photoId}`;

  const onClose = () => history.push(`/${adventureId}/`);

  return (
    <Fragment>
      <Overlay onClick={lightbox ? () => setLightbox(null) : onClose} className="Gallery-overlay" />

      {lightbox && (
        <img
          className="Gallery-lightbox"
          src={fullUrl(lightbox.tripId, lightbox.photoId)}
          alt={lightbox.caption}
          onClick={() => setLightbox(null)}
        />
      )}

      <div className="Gallery">
        <button className="Gallery-close" onClick={onClose}>×</button>
        <div className="Gallery-scroll">
          {trips.map(trip => {
            const tripPhotos = trip.entries.flatMap(entry =>
              (entry.photos || []).map(photo => ({ ...photo, entryTitle: entry.title }))
            );
            if (tripPhotos.length === 0) return null;
            return (
              <section key={trip.id} className="Gallery-trip">
                <div className="Gallery-trip-header">
                  <h2 className="Gallery-trip-title">{trip.title}</h2>
                  <span className="Gallery-trip-subtitle">{trip.subtitle}</span>
                </div>
                <div className="Gallery-grid">
                  {tripPhotos.map(photo => (
                    <div
                      key={`${trip.id}-${photo.id}`}
                      className="Gallery-item"
                      onClick={() => setLightbox({ tripId: trip.id, photoId: photo.id, caption: photo.caption })}
                    >
                      <img
                        className="Gallery-thumb"
                        src={thumbUrl(trip.id, photo.id)}
                        alt={photo.caption}
                      />
                      <span className="Gallery-entry-label">{photo.entryTitle}</span>
                    </div>
                  ))}
                </div>
              </section>
            );
          })}
        </div>
      </div>
    </Fragment>
  );
}

Gallery.propTypes = {
  history: PropTypes.object.isRequired,
  match: PropTypes.object.isRequired,
};
