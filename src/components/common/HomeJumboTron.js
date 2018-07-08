import React  from 'react';
import PropTypes from 'prop-types';
import Loader from '../common/Loader';

const HomeJumboTron = ({connectToSpotify, disconnectFromSpotify, loading, shouldShowSpotifyButton}) => {
    return (
        <div className="container-fluid">
            <div className="jumbotron">
                <h1>Welcome to Tidus.</h1>
                <p>Have you ever wondered how Spotify decides what songs are <strong>energetic</strong> enough for your workout playlist?</p>
                <p>Spotify collects audio data for all of their songs. This helps them
                    suggest certain tracks for the gym, for a party, for a lazy sunday at home, etc.</p>
                <p>This app lets you peak underneath the hood and see some of the audio data Spotify has for your playlists.</p>

                {shouldShowSpotifyButton &&
                  <button
                    className="btn btn-lg action-btn"
                    onClick={connectToSpotify}
                  >
                    Go
                  </button>
                }
                {!shouldShowSpotifyButton && !loading &&
                  <button
                    className="btn btn-lg action-btn"
                    onClick={disconnectFromSpotify}
                  >
                    Quit
                  </button>

                }
            </div>
            <Loader loading={loading} />
        </div>
    );
};

HomeJumboTron.propTypes = {
    connectToSpotify: PropTypes.func.isRequired,
    disconnectFromSpotify: PropTypes.func.isRequired,
    loading: PropTypes.bool.isRequired,
    shouldShowSpotifyButton: PropTypes.bool.isRequired
};

export default HomeJumboTron;

