import React, { PropTypes } from 'react';
import Button from 'react-button';

const InstructionsForAudioAnalysis = ({selectedPlaylistName, fetchAudioFeaturesDataForPlaylist}) => {
    const buttonTheme = { overStyle: { background: 'black' } };
    return (
        <div className="instructions">
            <h4>To view Spotify audio analysis data for {selectedPlaylistName} click the button below</h4>
            <Button className="text-center action-btn"
                    onClick={fetchAudioFeaturesDataForPlaylist}
                    theme={buttonTheme}>
                View audio features for {selectedPlaylistName}</Button>
        </div>

    );
};

InstructionsForAudioAnalysis.propTypes = {
    selectedPlaylistName: React.PropTypes.string.isRequired,
    fetchAudioFeaturesDataForPlaylist: React.PropTypes.func.isRequired
};

export default InstructionsForAudioAnalysis;


