import React, { PropTypes } from 'react';
import AnalyzedTrackRow from '../main/AnalyzedTrackRow';
import scrollToComponent from 'react-scroll-to-component';

const AnalyzedTrackTable = ({tracks, playlistName, sortTracks, loading}) => {
    return (
        <div>
            <div className="instructions"
                 ref={(c) => {
                     if(!loading) {
                         scrollToComponent(c, {
                             offset: -100,
                             align: 'top',
                             duration: 500
                         });
                     }
                 }}>
                <h1 className="text-center">You selected <strong>"{playlistName}"</strong></h1>
                <p className="text-center">Audio Feature data for this playlist is below. Click one of the table headers to sort this data.</p>
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
    sortTracks: React.PropTypes.func.isRequired,
    loading: React.PropTypes.bool.isRequired
};

export default AnalyzedTrackTable;

