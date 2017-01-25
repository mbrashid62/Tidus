import React, { PropTypes } from 'react';
import SpotifyPlaylist from '../main/SpotifyPlaylist';

const SpotifyPlaylistsContainer = ({playlists}) => {
    return (
        <div>
            <h1 className="text-center">Your Spotify Playlists</h1>
            <div>
                {playlists.map(playlist =>
                    <SpotifyPlaylist key={playlist.id} playlist={playlist}/>
                )}
            </div>
        </div>
    );
};

SpotifyPlaylistsContainer.propTypes = {
    playlists: React.PropTypes.array.isRequired
};

export default SpotifyPlaylistsContainer;
