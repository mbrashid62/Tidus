import React, { PropTypes } from 'react';

const PlaylistTitle= ({playlist, handlePlaylistSelect}) => {
    return (
        <div>
            <h3 onDoubleClick={handlePlaylistSelect}
                className="playlist-name">{playlist.name}</h3>

        </div>
    );
};

PlaylistTitle.propTypes = {
    playlist: React.PropTypes.object.isRequired,
    handlePlaylistSelect: React.PropTypes.func.isRequired,
};

export default PlaylistTitle;
