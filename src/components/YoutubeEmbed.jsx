import React from 'react';
import PropTypes from 'prop-types';

function YoutubeEmbed({ embedId }) {
  return (
    <div>
      <iframe
        width="853"
        height="480"
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
