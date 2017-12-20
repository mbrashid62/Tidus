/* eslint-disable react/jsx-no-bind */
import React, { PropTypes } from 'react';
import ReactTooltip from 'react-tooltip';
import _ from 'lodash';

import { TOOL_TIP_MARKUP } from'../../constants/const';
import AnalyzedTrackRow from '../main/AnalyzedTrackRow';
import ToolTip from  '../common/ToolTip';
import scrollToComponent from 'react-scroll-to-component';

export default class AnalyzedTrackTable extends React.Component {

  constructor(props) {
    super(props);

     this.state = {
       rowWidth: 0
    };

    this.setHeaderWidths = this.setHeaderWidths.bind(this);
    this.setHeaderWidthsThrottled = _.throttle(this.setHeaderWidths, 150);
    this.handleTableSort = this.handleTableSort.bind(this);
  }

  componentDidMount() {
    window.addEventListener('resize', this.setHeaderWidthsThrottled);
    this.setHeaderWidths();
  }


  componentWillReceiveProps(nextProps) {
    const { playlistName, loading } = this.props;

    if (!loading && !_.isEqual(playlistName, nextProps.playlistName)) {
      scrollToComponent(this.analyzedTrackTable, {
        offset: -25,
        align: 'top',
        duration: 500
      });

    }
  }

  componentDidUpdate(prevProps) {
    const { playlistName, loading} = this.props;

    if (!loading && !_.isEqual(prevProps.playlistName, playlistName)) {
      this.setHeaderWidths();
    }
  }


  setHeaderWidths() {
    const dataTable = document.querySelector('.data-table');

    this.setState({
      rowWidth: dataTable.offsetWidth - 12
    });
  }

  handleTableSort(e) {
    e.preventDefault();
    this.props.sortTracks(e);

    // hide our tooltips on sort
    ReactTooltip.hide();
  }

  render () {
    const { playlistName, tracks } = this.props;
    const { rowWidth } = this.state;

    return (
      <div
        className="analyzed-track-table"
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
          <tr className="header-row" style={{width: rowWidth}}>
            <th onClick={this.handleTableSort} style={{width: '20%'}}>Artist</th>
            <th onClick={this.handleTableSort} style={{width: '32%'}}>Name</th>
            <th onClick={(e) => this.handleTableSort(e)} style={{width: '12%'}} data-tip data-for="Acousticness">Acousticness</th>
            <th onClick={(e) => this.handleTableSort(e)} style={{width: '12%'}} data-tip data-for="Danceability">Danceability</th>
            <th onClick={(e) => this.handleTableSort(e)} style={{width: '12%'}} data-tip data-for="Energy">Energy</th>
            <th onClick={(e) => this.handleTableSort(e)} style={{width: '12%'}} data-tip data-for="Valence">Valence</th>
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

AnalyzedTrackTable.defaultProps = {
  playlistName: ''
};

