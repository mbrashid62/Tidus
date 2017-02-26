
import React, { PropTypes } from 'react';
import AnalyzedTrackRow from '../main/AnalyzedTrackRow';

const AnalyzedTrackTable = ({tracks, playlistName}) => {
    return (
        <div>
            <div className="instructions">
                <h1 className="text-center">{playlistName}</h1>
                <p className="text-center">The data is below</p>
            </div>
            <table className="table data-table">
                <thead>
                <tr>
                    {/*<th>&nbsp;</th>*/}
                    <th>Artist</th>
                    <th>Song</th>
                    <th>Acousticness</th>
                    <th>Danceability</th>
                    <th>Energy</th>
                    <th>Liveness</th>
                    <th>Loudness</th>
                    <th>Speechiness</th>
                    <th>Tempo</th>
                    <th>Valence</th>
                </tr>
                </thead>
                <tbody>
                {tracks.map(track =>
                    <AnalyzedTrackRow key={track.id} track={track}/>
                )}
                </tbody>
            </table>
        </div>
    );
};

AnalyzedTrackTable.propTypes = {
    tracks: React.PropTypes.array.isRequired,
    playlistName: React.PropTypes.string.isRequired
};

export default AnalyzedTrackTable;

