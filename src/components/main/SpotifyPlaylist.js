import React, { PropTypes } from 'react';

const SpotifyPlaylist= ({playlist}) => {
    return (
        <div>
            <div>
                <h3 className="playlist-name">{playlist.name}</h3>
            </div>
        </div>
    );
};

SpotifyPlaylist.propTypes = {
    playlist: React.PropTypes.object.isRequired
};

export default SpotifyPlaylist;
