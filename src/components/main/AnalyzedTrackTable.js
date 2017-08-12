/* eslint-disable react/jsx-no-bind */
import React, { PropTypes } from 'react';
import AnalyzedTrackRow from '../main/AnalyzedTrackRow';
import scrollToComponent from 'react-scroll-to-component';
import ReactTooltip from 'react-tooltip';

export class AnalyzedTrackTable extends React.Component {

  constructor(props) {
    super(props);
  }

  componentWillReceiveProps(nextProps, nextContext) {
    const { playlistName, loading } = this.props;

    if (!loading && !_.isEqual(playlistName, nextProps.playlistName)) {
      scrollToComponent(this.analyzedTrackTable, {
        offset: -25,
        align: 'top',
        duration: 500
      });
    }
  }

  render () {
    const { playlistName, tracks, sortTracks } = this.props;

    return (
      <div className="container-fluid"
           ref={(ref) => {
             this.analyzedTrackTable = ref;
           }}
      >
        <div className="instructions">
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
            <th onClick={sortTracks} data-tip data-for="loudness">Loudness</th>
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
        <ReactTooltip id="loudness">
                <span>The overall loudness of a track in decibels (dB).
                    <br/>Values typical range between -60 and 0 db
                </span>
        </ReactTooltip>
        <ReactTooltip id="valence">
                <span>A measure from 0.0 to 1.0 describing the musical positiveness conveyed by a track.
                    <br/>Tracks with high valence sound more happy, cheerful, euphoric, etc. Tracks with low valence sound more sad, depressed, angry, etc.</span>
        </ReactTooltip>
      </div>
    );
  }
}

AnalyzedTrackTable.propTypes = {
    tracks: PropTypes.array.isRequired,
    playlistName: PropTypes.string.isRequired,
    sortTracks: PropTypes.func.isRequired,
    loading: PropTypes.bool.isRequired
};

export default AnalyzedTrackTable;

