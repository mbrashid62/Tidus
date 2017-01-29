import React, { PropTypes } from 'react';

const TrackTitle= ({track}) => {
    return (
        <div className="spotify-track">
            <h5 className="spotify-track-item ">{track.artist} - {track.name}</h5>
        </div>
    );
};

TrackTitle.propTypes = {
    track: React.PropTypes.object.isRequired
};

export default TrackTitle;
