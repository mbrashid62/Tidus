/* eslint-disable react/jsx-no-bind */
import React, { PropTypes } from 'react';
import _ from 'lodash';

import { TOOL_TIP_MARKUP } from'../../constants/const';
import AnalyzedTrackRow from '../main/AnalyzedTrackRow';
import ToolTip from  '../common/ToolTip';
import scrollToComponent from 'react-scroll-to-component';

export default class AnalyzedTrackTable extends React.Component {

  constructor(props) {
    super(props);
    this.renderHeadRows = this.renderHeadRows.bind(this);
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
            <th onClick={sortTracks} data-tip data-for="Acousticness">Acousticness</th>
            <th onClick={sortTracks} data-tip data-for="Danceability">Danceability</th>
            <th onClick={sortTracks} data-tip data-for="Energy">Energy</th>
            <th onClick={sortTracks} data-tip data-for="Loudness">Loudness</th>
            <th onClick={sortTracks} data-tip data-for="Valence">Valence</th>
          </tr>
          </thead>
          <tbody>
          {tracks.map(track =>
            <AnalyzedTrackRow key={track.id} track={track}/>
          )}
          </tbody>
        </table>

        {TOOL_TIP_MARKUP.map(attribute =>
            <ToolTip key={attribute.id} toolTipId={attribute.id} copy={attribute.copy}/>
        )}
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

