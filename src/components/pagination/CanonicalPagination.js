import React, { PropTypes } from 'react';
import { chunk, map } from 'lodash';

import {
  PAGINATION_CONTROLS,
  PLAYLISTS_LIMIT as LIMIT
} from '../pagination/config';

import Pagination from './Pagination';
import SpotifyPlaylist from "../main/SpotifyPlaylist";

export default class CanonicalPagination extends React.Component {

  constructor(props, context) {
    super(props, context);

    this.state = {
      currentPage: 1,
      limit: LIMIT,
      totalPages: Math.ceil(this.props.items.length / LIMIT),
      chunkedItems: this.getChunkedItems(1)
    };

    this.setCurrentPage = this.setCurrentPage.bind(this);
    this.getChunkedItems = this.getChunkedItems.bind(this);
  }


  componentWillReceiveProps(nextProps) {
    if (this.props.items !== nextProps.items) {
      this.setState({
        chunkedItems: this.getChunkedItems(this.state.currentPage)
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
        chunkedItems: this.getChunkedItems(currentPage)
      });
    }
  }

  getChunkedItems(currentPage) {
    return chunk(this.props.items, LIMIT)[currentPage - 1];
  }

  render() {
    return (
      <div>
        {map(this.state.chunkedItems, (item) => (
          <SpotifyPlaylist key={item.id} playlist={item} handlePlaylistSelect={this.props.handleItemSelect}/>
        ))}

        <Pagination
          totalPages={this.state.totalPages}
          currentPage={this.state.currentPage}
          handleClick={this.setCurrentPage}
        />
      </div>
    );
  }
}

CanonicalPagination.defaultProps = {
  items: []
};

CanonicalPagination.propTypes = {
  items: PropTypes.array.isRequired,
  handleItemSelect: PropTypes.func
};
