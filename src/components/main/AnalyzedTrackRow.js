import React, {PropTypes} from 'react';
const AnalyzedTrackRow = ({track}) => {
    return (
        <tr className="text-left track-row">
            <td className="track-artist" style={{width: '20%'}}>{track.artist}</td>
            <td className="track-name" style={{width: '32%'}}>{track.name}</td>
            <td className="track-acousticness" style={{width: '12%'}}>{track.acousticness}</td>
            <td className="track-danceability" style={{width: '12%'}}>{track.danceability}</td>
            <td className="track-energy" style={{width: '12%'}}>{track.energy}</td>
            <td className="track-valence" style={{width: '12%'}}>{track.valence}</td>
        </tr>
    );
};

AnalyzedTrackRow.propTypes = {
    track: PropTypes.object.isRequired
};

export default AnalyzedTrackRow;
