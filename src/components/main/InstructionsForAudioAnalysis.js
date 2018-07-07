import React from 'react';
import PropTypes from 'prop-types';

const InstructionsForAudioAnalysis = ({ selectedPlaylistName, fetchAudioFeaturesDataForPlaylist }) => (
  <div className="instructions">
    <h4>To view Spotify audio analysis data for {selectedPlaylistName}, click the button below</h4>
    <button
      className="text-center action-btn"
      onClick={fetchAudioFeaturesDataForPlaylist}
    >
      View audio features for {selectedPlaylistName}
    </button>
  </div>
);

InstructionsForAudioAnalysis.propTypes = {
    selectedPlaylistName: PropTypes.string.isRequired,
    fetchAudioFeaturesDataForPlaylist: PropTypes.func.isRequired
};

export default InstructionsForAudioAnalysis;


