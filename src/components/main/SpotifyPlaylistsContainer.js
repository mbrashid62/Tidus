import React, { PropTypes } from 'react';
import scrollToComponent from 'react-scroll-to-component';

import { PLAYLISTS } from '../pagination/config';
import SpotifyPagination from '../pagination/SpotifyPagination';

export default class SpotifyPlaylistsContainer extends React.Component {

  componentDidMount() {
    scrollToComponent(this.playlistsContainer, {
      align: 'top',
      duration: 500
    });
  }

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
