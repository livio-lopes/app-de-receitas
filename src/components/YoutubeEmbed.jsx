import React from 'react';
import PropTypes from 'prop-types';
import styles from './YoutubeEmbed.module.css';

function YoutubeEmbed({ embedId }) {
  return (
    <div className={ styles.container__youtube }>
      <iframe
        src={ `https://www.youtube-nocookie.com/embed/${embedId}` }
        allow="accelerometer;
        autoplay;
        clipboard-write;
        encrypted-media;
        gyroscope;
        picture-in-picture"
        allowFullScreen
        title="Embedded youtube"
        data-testid="video"
      />
    </div>
  );
}

YoutubeEmbed.propTypes = {
  embedId: PropTypes.string.isRequired,
};

export default YoutubeEmbed;
