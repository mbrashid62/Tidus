import React  from 'react';
import PropTypes from 'prop-types';
import PlaylistTitle from '../main/PlaylistTitle';

const SpotifyPlaylist = ({playlist, handlePlaylistSelect}) => {
  return (
    <div className="col-md-12 text-left">
      <PlaylistTitle
        playlist={playlist}
        handlePlaylistSelect={handlePlaylistSelect}
      />
    </div>
  );
};

SpotifyPlaylist.propTypes = {
    playlist: PropTypes.object.isRequired,
    handlePlaylistSelect: PropTypes.func.isRequired
};

export default SpotifyPlaylist;
