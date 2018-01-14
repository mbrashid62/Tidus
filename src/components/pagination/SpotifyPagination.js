import React, { PropTypes } from 'react';
import { chunk, map, isEmpty } from 'lodash';

import { PAGINATION_CONTROLS, PLAYLISTS, TRACKS } from '../pagination/config';

import Pagination from './Pagination';
import SpotifyPlaylist from '../main/SpotifyPlaylist';
import AnalyzedTrackRow from '../main/AnalyzedTrackRow';


export default class SpotifyPagination extends React.Component {

  constructor(props, context) {
    super(props, context);

    this.state = {
      currentPage: 1,
      totalPages: Math.ceil(this.props.items.length / this.props.limit),
      chunkedItems: this.getChunkedItems(1, this.props.items)
    };

    this.setCurrentPage = this.setCurrentPage.bind(this);
    this.getChunkedItems = this.getChunkedItems.bind(this);
  }

  componentWillReceiveProps(nextProps) {
    // once our items get passed down, let's update our state
    if (this.props.items !== nextProps.items) {
      this.setState({
        chunkedItems: this.getChunkedItems(this.state.currentPage, nextProps.items)
      });
    }
  }

  /**
   *
   * @param e - event object
   * @param page - int val of current page
   */
  setCurrentPage (e, page) {
    e.preventDefault();
    let currentPage = page;

    if (this.state.currentPage !== currentPage) {
      if (currentPage === PAGINATION_CONTROLS.NEXT) {
        currentPage = this.state.currentPage + 1;
      } else if (currentPage === PAGINATION_CONTROLS.PREVIOUS) {
        currentPage = this.state.currentPage - 1;
      }

      this.setState({
        currentPage,
        chunkedItems: this.getChunkedItems(currentPage, this.props.items)
      });
    }
  }

  getChunkedItems(currentPage, items = []) {
    return isEmpty(items) ? [] : chunk(items, this.props.limit)[currentPage - 1];
  }

  render() {
    return (
      <div>
        {this.props.type === PLAYLISTS.TYPE &&
          map(this.state.chunkedItems, (item) => (
              <SpotifyPlaylist key={item.id} playlist={item} handlePlaylistSelect={this.props.handleItemSelect} />
            )
          )
        }

        {this.props.type === TRACKS.TYPE &&
          map(this.state.chunkedItems, (item) => (
              <AnalyzedTrackRow key={item.id} track={item}/>
            )
          )
        }

        <Pagination
          totalPages={this.state.totalPages}
          currentPage={this.state.currentPage}
          handleClick={this.setCurrentPage}
          leftIcon="glyphicon glyphicon-chevron-left"
          rightIcon="glyphicon glyphicon-chevron-right"
          showEllipses={true} // eslint-disable-line
        />
      </div>
    );
  }
}

SpotifyPagination.defaultProps = {
  items: [],
  type: {},
  limit: 10
};

SpotifyPagination.propTypes = {
  items: PropTypes.array.isRequired,
  type: PropTypes.string.isRequired,
  limit: PropTypes.number.isRequired,
  handleItemSelect: PropTypes.func,
  leftIcon: PropTypes.string,
  rightIcon: PropTypes.string,
  showEllipses: PropTypes.bool
};
