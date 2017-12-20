/* eslint-disable react/jsx-no-bind */
import React, { PropTypes } from 'react';
import scrollToComponent from 'react-scroll-to-component';

import SpotifyPlaylist from '../main/SpotifyPlaylist';

export default class SpotifyPlaylistsContainer extends React.Component {

  constructor(props) {
    super(props);
  }

  componentDidMount() {
    scrollToComponent(this.spotifyPlaylistsContainer, {
      align: 'top',
      duration: 500
    });
  }


  render() {
    const { playlists, handlePlaylistSelect} = this.props;

    return (
      <div
        className="spotify-playlists-container"
         ref={(ref) => {
           this.spotifyPlaylistsContainer = ref;
         }}
      >
        <div className="instructions">
          <h1 className="text-left">Your Spotify Playlists</h1>
          <p className="text-left">Click to select one.</p>
        </div>

        <div className="playlists-list">
          {playlists.map(playlist =>
            <SpotifyPlaylist
              key={playlist.id}
              playlist={playlist}
              handlePlaylistSelect={handlePlaylistSelect}
            />
          )}
        </div>
      </div>
    );
  }
}

SpotifyPlaylistsContainer.propTypes = {
    playlists: PropTypes.array.isRequired,
    handlePlaylistSelect: PropTypes.func.isRequired
};
