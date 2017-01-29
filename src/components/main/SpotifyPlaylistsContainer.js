import React, { PropTypes } from 'react';
import SpotifyPlaylist from '../main/SpotifyPlaylist';

const SpotifyPlaylistsContainer = ({playlists, handlePlaylistSelect}) => {
    return (
        <div>
            <h1 className="text-left">Your Spotify Playlists</h1>
            <p className="text-left">Double click to select one</p>
            <div>
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
