import React from 'react';
import PropTypes from 'prop-types';

const AnalyzedTrackRow = ({ track }) => {
    return (
        <div className="text-left track-row row">
            <div className="track-artist col-md-2">{track.artist}</div>
            <div className="track-name col-md-2">{track.name}</div>
            <div className="track-acousticness col-md-2">{track.acousticness}</div>
            <div className="track-danceability col-md-2">{track.danceability}</div>
            <div className="track-energy col-md-2">{track.energy}</div>
            <div className="track-valence col-md-2">{track.valence}</div>
        </div>
    );
};

AnalyzedTrackRow.propTypes = {
    track: PropTypes.object.isRequired
};

export default AnalyzedTrackRow;
