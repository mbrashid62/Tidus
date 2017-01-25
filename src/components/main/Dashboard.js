import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import * as spotifyActions from '../../actions/spotifyActions';
import { bindActionCreators } from 'redux';
import { browserHistory } from 'react-router';
import Button from 'react-button';
import SpotifyPlaylistsContainer from './SpotifyPlaylistsContainer';

export class RegisterPage extends React.Component {
    constructor(props, context) {
        super(props, context);
        this.state = {
            shouldRenderPlaylists: false,
            playlists: []
        };
        this.redirectToHomePage = this.redirectToHomePage.bind(this);
        this.connectToSpotify = this.connectToSpotify.bind(this);
    }

    componentWillMount() {
        if(this.props.location.hash.split('=')[1] !== undefined) {
            const access_token = this.props.location.hash.split('=')[1].split('&')[0]; // todo: fix this with regex or something...
            // const state = this.props.location.query.state;

            if(access_token !== '' && access_token !== undefined) {
                this.props.actions.handleSpotifyAccessToken(access_token);
            }
        }
    }
    componentDidMount() {

    }
    componentWillReceiveProps(nextProps) {

        if(nextProps.spotifyUrl !== '') {
            window.location = nextProps.spotifyUrl;
        }

        if(nextProps.hasAccessToken && !nextProps.hasSpotifyID) {
            // todo: make all them spotify requests
            this.props.actions.fetchSpotifyUserID();
        }

        if(nextProps.hasAccessToken && !nextProps.hasSpotifyID) {
            this.props.actions.fetchSpotifyPlaylists();
        }

        if(nextProps.playlists.length > 0) {
            this.setState({
                shouldRenderPlaylists: true,
                playlists: nextProps.playlists
            });
        }
    }

    redirectToHomePage() {
        browserHistory.push('/');
    }

    connectToSpotify() {
        this.props.actions.connectToSpotify();
    }

    render () {
        return (
            <div className="container-fluid">
                <div className="jumbotron">
                    <h1>Welcome to the Tidus dashboard</h1>
                    <p>Here you can connect your Spotify playlists.</p>
                    {this.state.playlists.length == 0 && <Button className="btn btn-lg" onClick={this.connectToSpotify}>Click here to connect to Spotify</Button>}
                </div>
                {this.state.shouldRenderPlaylists && <SpotifyPlaylistsContainer playlists={this.state.playlists}/>}
            </div>
        );
    }
}

RegisterPage.propTypes = {
    registeredUser: React.PropTypes.object.isRequired,
    isSignedIn: React.PropTypes.bool.isRequired,
    spotifyUrl: React.PropTypes.string,
    hasAccessToken: React.PropTypes.bool,
    spotifyUserID: React.PropTypes.string,
    hasSpotifyID: React.PropTypes.bool,
    playlists: React.PropTypes.array
};
function mapStateToProps(store) { // connect props to global state object
    return {
        registeredUser: store.registerReducer.user,
        isSignedIn: store.registerReducer.isSignedIn,
        spotifyUrl: store.spotifyReducer.url,
        hasAccessToken: store.spotifyReducer.hasAccessToken,
        spotifyUserID: store.spotifyReducer.spotifyUserID,
        hasSpotifyID: store.spotifyReducer.hasSpotifyID,
        playlists: store.spotifyReducer.playlists
    };
}

function mapDispatchToProps(dispatch) {
    return {
        actions: bindActionCreators(spotifyActions, dispatch)
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(RegisterPage);
