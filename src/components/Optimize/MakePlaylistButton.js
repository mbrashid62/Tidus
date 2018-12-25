/* eslint-disable no-undef */
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import * as spotifyActions from '../../actions/spotifyActions';

class MakePlaylistButton extends Component {

  static displayName = 'src/components/Optimize/MakePlaylistButton';

  static propTypes = {
    spotifyUserID: PropTypes.string.isRequired,
    createPlaylist: PropTypes.func.isRequired,
    topTracks: PropTypes.array.isRequired,
    createPlaylistStatus: PropTypes.string.isRequired,
    resetCreatePlaylistStatus: PropTypes.func.isRequired,
    selectedAttribute: PropTypes.string.isRequired,
  };

  static defaultProps = {
    spotifyUserID: '',
    createPlaylist: () => {},
    topTracks: [],
    createPlaylistStatus: '',
  };

  state = {
    inputValue: '',
    displaySuccessMessage: false,
    cache: {},
  };

  inputRef = {};

  onButtonClick = (e) => {
    e.preventDefault();
    this.addAttributeToCache(this.props.selectedAttribute);
    this.props.createPlaylist(this.props.spotifyUserID, this.props.topTracks, this.state.inputValue);
  };

  onInputChange = (e) => {
    e.preventDefault();
    this.setState({
      inputValue: this.inputRef.value,
    });
  };

  addAttributeToCache = (attr) => {
    this.setState({
      cache: {
        ...this.state.cache,
        [attr]: attr,
      },
    });
  };

  componentDidUpdate(prevProps) {
    if ((prevProps.createPlaylistStatus === 'IDLE' || prevProps.createPlaylistStatus === 'ERROR')  && this.props.createPlaylistStatus === 'SUCCESS') {
      this.setSuccessMsgState(true);
      this.props.resetCreatePlaylistStatus();
    }
    if (prevProps.selectedAttribute !== this.props.selectedAttribute) {
      if (this.state.displaySuccessMessage) {
        this.setSuccessMsgState(false);
      }
    }
  }

  setSuccessMsgState = (show) => this.setState({ displaySuccessMessage: show });

  getPlaylistSuggestion = (attr) => {
    switch (attr) {
      case 'Acousticness':
        return 'Awesome Acousticness';
      case 'Danceability':
        return 'Lose Yourself to Dance';
      case 'Energy':
        return 'For the Gym';
      case 'Loudness':
        return 'Blow The Top Off!';
      case 'Valence':
        return 'Happy Sounds';
      default:
        return '';
    }
  };


  render() {
    const isAttrInCache = this.state.cache[this.props.selectedAttribute];
    return (
      <div className="optimize-action col-md-6">
        {this.state.displaySuccessMessage && (
          <div>
            <span>Successfully created your playlist. Enjoy it (:</span>
          </div>
        )}
        {!this.state.displaySuccessMessage && !isAttrInCache && (
          <div className="make-playlist-wrapper">
            <span>Like these songs? Put them in a playlist.</span>
            <div>
              <input
                type="text"
                placeholder={`Enter a Playlist name. How about, '${this.getPlaylistSuggestion(this.props.selectedAttribute)}'?`}
                onChange={this.onInputChange}
                ref={(ref) => this.inputRef = ref}
              />

            </div>
            <button
              className="btn btn-primary action-btn"
              onClick={this.onButtonClick}
              disabled={!this.state.inputValue}
            >Create Playlist
            </button>
          </div>
        )}
        {!this.state.displaySuccessMessage && isAttrInCache && (
          <div>
            <span>You already made a playlist for {this.props.selectedAttribute}. Try something else.</span>
          </div>
        )}

      </div>
    );
  }
}

export default connect((state) => ({
  spotifyUserID: state.spotifyReducer.spotifyUserID,
  topTracks: state.spotifyReducer.topTracks,
  createPlaylistStatus: state.spotifyReducer.createPlaylistStatus,
  selectedAttribute: state.optimizeReducer.selectedAttr,
}), ({
  createPlaylist: spotifyActions.createPlaylist,
  resetCreatePlaylistStatus: spotifyActions.resetCreatePlaylistStatus,
}))(MakePlaylistButton);
