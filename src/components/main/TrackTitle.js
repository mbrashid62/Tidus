import React, { PropTypes } from 'react';

const TrackTitle= ({track}) => {
    return (
        <div>
            <h5 className="track-name">{track.name}</h5>
        </div>
    );
};

TrackTitle.propTypes = {
    track: React.PropTypes.object.isRequired
};

export default TrackTitle;
