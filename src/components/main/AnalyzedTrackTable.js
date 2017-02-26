import React, { PropTypes } from 'react';
import AnalyzedTrackRow from '../main/AnalyzedTrackRow';

const AnalyzedTrackTable = ({tracks, playlistName, sortTracks}) => {
    return (
        <div>
            <div className="instructions">
                <h1 className="text-center">{playlistName}</h1>
                <p className="text-center">The data is below</p>
            </div>
            <table className="table data-table">
                <thead className="data-table-header">
                <tr>
                    <th onClick={sortTracks}>Artist</th>
                    <th onClick={sortTracks}>Name</th>
                    <th onClick={sortTracks}>Acousticness</th>
                    <th onClick={sortTracks}>Danceability</th>
                    <th onClick={sortTracks}>Energy</th>
                    <th onClick={sortTracks}>Liveness</th>
                    <th onClick={sortTracks}>Loudness</th>
                    <th onClick={sortTracks}>Speechiness</th>
                    <th onClick={sortTracks}>Tempo</th>
                    <th onClick={sortTracks}>Valence</th>
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
    playlistName: React.PropTypes.string.isRequired,
    sortTracks: React.PropTypes.func.isRequired
};

export default AnalyzedTrackTable;

