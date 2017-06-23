import React, {PropTypes} from 'react';
const AnalyzedTrackRow = ({track}) => {
    return (
        <tr className="text-left">
            <td>{track.artist}</td>
            <td>{track.name}</td>
            <td>{track.acousticness}</td>
            <td>{track.danceability}</td>
            <td>{track.energy}</td>
            <td>{track.liveness}</td>
            <td>{track.valence}</td>
        </tr>
    );
};

AnalyzedTrackRow.propTypes = {
    track: PropTypes.object.isRequired
};

export default AnalyzedTrackRow;
