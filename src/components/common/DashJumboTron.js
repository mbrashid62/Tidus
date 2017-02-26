import React, { PropTypes } from 'react';
import Button from 'react-button';
import Loading from 'react-loading-animation';

const DashJumboTron = ({connectToSpotify, loading}) => {
    return (
        <div className="container">
            <div className="jumbotron">
                <h1>Welcome to the Tidus dashboard</h1>
                <p>Here you can connect your Spotify playlists.</p>
                <Button className="btn btn-lg action-btn" onClick={connectToSpotify}>Click here to connect to Spotify</Button>
            </div>
            <Loading isLoading={loading} />
        </div>
    );
};

DashJumboTron.propTypes = {
    connectToSpotify: React.PropTypes.func.isRequired,
    loading: React.PropTypes.bool.isRequired
};

export default DashJumboTron;

