import React from 'react';
import PropTypes from 'prop-types';

const PlaylistTitle= ({playlist, handlePlaylistSelect}) => {
    return (
        <div>
            <h3 onClick={handlePlaylistSelect}
                className="playlist-name">{playlist.name}</h3>

        </div>
    );
};

PlaylistTitle.propTypes = {
    playlist: PropTypes.object.isRequired,
    handlePlaylistSelect: PropTypes.func.isRequired
};

export default PlaylistTitle;
