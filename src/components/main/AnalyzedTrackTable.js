/* eslint-disable react/jsx-no-bind */
import React  from 'react';
import PropTypes from 'prop-types';
import ReactTooltip from 'react-tooltip';
import _ from 'lodash';

import { TOOL_TIP_MARKUP } from'../../constants/const';
import { TRACKS } from '../pagination/config';
import SpotifyPagination from '../pagination/SpotifyPagination';
import ToolTip from  '../common/ToolTip';
import scrollToComponent from 'react-scroll-to-component';

export default class AnalyzedTrackTable extends React.Component {

  constructor(props) {
    super(props);

    this.handleTableSort = this.handleTableSort.bind(this);
  }

  componentDidMount() {
    // window.addEventListener('resize', this.setHeaderWidthsThrottled);
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

  handleTableSort(e) {
    e.preventDefault();
    this.props.sortTracks(e);

    // hide our tooltips on sort
    ReactTooltip.hide();
  }

  render () {
    const { playlistName, tracks } = this.props;

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
        <div className="table data-table container">
          <div className="header-row row">
            <div className="col-md-2" onClick={this.handleTableSort}>Artist</div>
            <div className="col-md-2" onClick={this.handleTableSort}>Name</div>
            <div className="col-md-2" onClick={(e) => this.handleTableSort(e)} data-tip data-for="Acousticness">Acousticness</div>
            <div className="col-md-2" onClick={(e) => this.handleTableSort(e)} data-tip data-for="Danceability">Danceability</div>
            <div className="col-md-2" onClick={(e) => this.handleTableSort(e)} data-tip data-for="Energy">Energy</div>
            <div className="col-md-2" onClick={(e) => this.handleTableSort(e)} data-tip data-for="Valence">Valence</div>
          </div>
          <SpotifyPagination items={tracks} type={TRACKS.TYPE} limit={TRACKS.LIMIT}/>
        </div>

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

