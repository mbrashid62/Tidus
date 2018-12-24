import React from 'react';
import ReactDom from 'react-dom';
import PropTypes from 'prop-types';

import { PLAYLISTS } from '../pagination/config';
import SpotifyPagination from '../pagination/SpotifyPagination';

export default class SpotifyPlaylistsContainer extends React.Component {

  componentDidMount() {
    this.scrollToComponent();
  }

  scrollToComponent = () => { // eslint-disable-line
    const el = ReactDom.findDOMNode(this.playlistsContainer);
    window.scrollTo({
      top: el.offsetHeight - 150,
      left: 0,
      duration: 500,
      behavior: 'smooth',
    });
  };
  render() {
    const { playlists, handlePlaylistSelect } = this.props;

    return (
      <div
        className="spotify-playlists-container"
         ref={(ref) => { // eslint-disable-line
           this.playlistsContainer = ref;
         }}
      >
        <div className="instructions">
          <h1 className="text-left">Spotify Playlists</h1>
          <p className="text-left">Click to select one.</p>
        </div>

        <div className="playlists-list">
          <SpotifyPagination
            items={playlists}
            type={PLAYLISTS.TYPE}
            limit={PLAYLISTS.LIMIT}
            handleItemSelect={handlePlaylistSelect}
          />
        </div>
      </div>
    );
  }
}

SpotifyPlaylistsContainer.propTypes = {
    playlists: PropTypes.array.isRequired,
    handlePlaylistSelect: PropTypes.func.isRequired
};
