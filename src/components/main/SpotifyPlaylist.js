import React, { PropTypes } from 'react';
import PlaylistTitle from '../main/PlaylistTitle';

const SpotifyPlaylist= ({playlist, handlePlaylistSelect}) => {
    return (
        <div>
            <div className="row">
                <div className="col-md-12 text-left">
                    <PlaylistTitle playlist={playlist} handlePlaylistSelect={handlePlaylistSelect}/>
                </div>
            </div>
        </div>
    );
};

SpotifyPlaylist.propTypes = {
    playlist: React.PropTypes.object.isRequired,
    handlePlaylistSelect: React.PropTypes.func.isRequired
};

export default SpotifyPlaylist;
