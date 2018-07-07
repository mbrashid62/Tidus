import React  from 'react';
import PropTypes from 'prop-types';

const TrackTitle= ({track}) => {
    return (
        <div className="spotify-track">
            <h5 className="spotify-track-item ">{track.artist} - {track.name}</h5>
        </div>
    );
};

TrackTitle.propTypes = {
    track: PropTypes.object.isRequired
};

export default TrackTitle;
