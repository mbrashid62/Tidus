import React, { PropTypes } from 'react';
import SpotifyTrack from '../main/SpotifyTrack';

const SelectedTracksContainer = ({tracks, selectedPlaylistName}) => {
    return (
        <div>
            <div className="instructions">
                <h1 className="text-right">{selectedPlaylistName}</h1>
                <p className="text-right">The tracks for this playlist are listed below</p>
            </div>

            <div>
                {tracks.map(track =>
                    <SpotifyTrack key={track.id} track={track}/>
                )}
            </div>
        </div>
    );
};

SelectedTracksContainer.propTypes = {
    tracks: React.PropTypes.array.isRequired,
    selectedPlaylistName: React.PropTypes.string.isRequired
};

export default SelectedTracksContainer;

