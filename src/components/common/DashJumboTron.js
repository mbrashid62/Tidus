import React, { PropTypes } from 'react';
import Button from 'react-button';
import Loading from 'react-loading-animation';

const DashJumboTron = ({connectToSpotify, loading, shouldShowSpotifyButton}) => {
    return (
        <div className="container-fluid">
            <div className="jumbotron">
                <h1>Welcome to the Tidus Dashboard.</h1>
                <p>Here you can connect your Spotify playlists.</p>
                {shouldShowSpotifyButton && <Button className="btn btn-lg action-btn" onClick={connectToSpotify} theme={{overStyle:{background:'black'}}}>Connect to Spotify</Button>}
            </div>
            <Loading isLoading={loading} />
        </div>
    );
};

DashJumboTron.propTypes = {
    connectToSpotify: React.PropTypes.func.isRequired,
    loading: React.PropTypes.bool.isRequired,
    shouldShowSpotifyButton: React.PropTypes.bool.isRequired
};

export default DashJumboTron;

