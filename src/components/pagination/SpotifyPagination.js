import React from 'react';
import PropTypes from 'prop-types';
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
    this.resetPaginationState = this.resetPaginationState.bind(this);
  }

  componentDidUpdate(prevProps) {
    // if we have received a new set of items to paginate, let's re-initialize our state
    if (prevProps.items !== this.props.items) {
      this.resetPaginationState(this.props);
    }
  }

  resetPaginationState (props) {
    this.setState({
      currentPage: 1,
      chunkedItems: this.getChunkedItems(1, props.items),
      totalPages: Math.ceil(props.items.length / props.limit)
    });
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
      <div className="pagination-parent">
        <div className="paginated-items">
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
        </div>

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
