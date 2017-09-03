import React, { PropTypes } from 'react';
import SpotifyPlaylist from '../main/SpotifyPlaylist';

const SpotifyPlaylistsContainer = ({playlists, handlePlaylistSelect}) => {
    return (
        <div className="spotify-playlists-container">
            <div className="instructions">
                <h1 className="text-left">Your Spotify Playlists</h1>
                <p className="text-left">Click to select one.</p>
            </div>

            <div className="playlists-list">
                {playlists.map(playlist =>
                    <SpotifyPlaylist key={playlist.id}
                                     playlist={playlist}
                                     handlePlaylistSelect={handlePlaylistSelect}
                    />
                )}
            </div>
        </div>
    );
};

SpotifyPlaylistsContainer.propTypes = {
    playlists: React.PropTypes.array.isRequired,
    handlePlaylistSelect: React.PropTypes.func.isRequired
};

export default SpotifyPlaylistsContainer;
