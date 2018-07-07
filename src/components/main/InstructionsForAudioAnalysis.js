import React from 'react';
import PropTypes from 'prop-types';
import Button from 'react-button';

const BUTTON_THEME = {
  overStyle: {
    background: 'black'
  }
};

const InstructionsForAudioAnalysis = ({ selectedPlaylistName, fetchAudioFeaturesDataForPlaylist }) => (
  <div className="instructions">
    <h4>To view Spotify audio analysis data for {selectedPlaylistName}, click the button below</h4>
    <Button
      className="text-center action-btn"
      onClick={fetchAudioFeaturesDataForPlaylist}
      theme={BUTTON_THEME}
    >
      View audio features for {selectedPlaylistName}
    </Button>
  </div>
);

InstructionsForAudioAnalysis.propTypes = {
    selectedPlaylistName: PropTypes.string.isRequired,
    fetchAudioFeaturesDataForPlaylist: PropTypes.func.isRequired
};

export default InstructionsForAudioAnalysis;


