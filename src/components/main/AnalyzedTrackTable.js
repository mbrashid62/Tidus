import React, { PropTypes } from 'react';
import AnalyzedTrackRow from '../main/AnalyzedTrackRow';
import scrollToComponent from 'react-scroll-to-component';
import ReactTooltip from 'react-tooltip';

const AnalyzedTrackTable = ({tracks, playlistName, sortTracks, loading}) => {
    return (
        <div className="container-fluid">
            <div className="instructions"
                 ref={(c) => {
                     if(!loading) {
                         scrollToComponent(c, {
                             offset: -25,
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
                    <th onClick={sortTracks} data-tip data-for="acousticness">Acousticness</th>
                    <th onClick={sortTracks} data-tip data-for="danceability">Danceability</th>
                    <th onClick={sortTracks} data-tip data-for="energy">Energy</th>
                    <th onClick={sortTracks} data-tip data-for="liveness">Liveness</th>
                    <th onClick={sortTracks} data-tip data-for="loudness">Loudness</th>
                    <th onClick={sortTracks} data-tip data-for="speechiness">Speechiness</th>
                    <th onClick={sortTracks} data-tip data-for="tempo">Tempo</th>
                    <th onClick={sortTracks} data-tip data-for="valence">Valence</th>
                </tr>
                </thead>
                <tbody>
                {tracks.map(track =>
                    <AnalyzedTrackRow key={track.id} track={track}/>
                )}
                </tbody>
            </table>
            <ReactTooltip id="acousticness">
                <span>Acoustincess is a confidence measure from 0 to 1.0. <br/>A value close to 1.0 implies a strong confidences that the track is acoustic.</span>
            </ReactTooltip>
            <ReactTooltip id="danceability">
                <span>Describes how suitable a track is for dancing based on a combination of musical elements.
                    <br/>A value of 0.0 is least danceable and 1.0 is most danceable.</span>
            </ReactTooltip>
            <ReactTooltip id="energy">
                <span>Energy is a measure from 0.0 to 1.0 and represents a perceptual measure of intensity and activity.<br/> Typically, energetic tracks feel fast, loud, and noisy.</span>
            </ReactTooltip>
            <ReactTooltip id="liveness">
                <span>Detects the presence of an audience in the recording.
                    <br/>Higher liveness values represent an increased probability that the track was performed live.</span>
            </ReactTooltip>
            <ReactTooltip id="loudness">
                <span>The overall loudness of a track in decibels (dB).
                    <br/>Values typical range between -60 and 0 db
                </span>
            </ReactTooltip>
            <ReactTooltip id="speechiness">
                <span>Speechiness detects the presence of spoken words in a track.
                    <br/>The more exclusively speech-like the recording (e.g. talk show, audio book, poetry), the closer to 1.0 the attribute value.</span>
            </ReactTooltip>
            <ReactTooltip id="tempo">
                <span>The overall estimated tempo of a track in beats per minute (BPM).
                    <br/>In musical terminology, tempo is the speed or pace of a given piece and derives directly from the average beat duration.</span>
            </ReactTooltip>
            <ReactTooltip id="valence">
                <span>A measure from 0.0 to 1.0 describing the musical positiveness conveyed by a track.
                    <br/>Tracks with high valence sound more happy, cheerful, euphoric, etc. Tracks with low valence sound more sad, depressed, angry, etc.</span>
            </ReactTooltip>
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

