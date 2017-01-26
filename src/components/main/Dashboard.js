import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import * as spotifyActions from '../../actions/spotifyActions';
import { bindActionCreators } from 'redux';
import { browserHistory } from 'react-router';
import Button from 'react-button';
import SpotifyPlaylistsContainer from './SpotifyPlaylistsContainer';
import SelectedTracksContainer from './SelectedTracksContainer';
import {playlistFormatted} from '../../selectors/selectors';
import * as spotifySelectors from '../../selectors/selectors'
import _ from 'lodash';

export class RegisterPage extends React.Component {
    constructor(props, context) {
        super(props, context);
        this.state = {
            shouldRenderPlaylists: false,
            shouldRenderSelectedPlaylistTracks: false,
            selectedPlaylistName: ''
        };
        this.redirectToHomePage = this.redirectToHomePage.bind(this);
        this.connectToSpotify = this.connectToSpotify.bind(this);
        this.handlePlaylistSelect = this.handlePlaylistSelect.bind(this);
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

        if(nextProps.spotifyUrl !== '') { // if redirect url has not be clearned
            window.location = nextProps.spotifyUrl;
        }

        if(nextProps.hasAccessToken && !nextProps.hasSpotifyID) { // if we have the access token but haven't fetched the user yet
            this.props.actions.fetchSpotifyUserID();
        }

        if(nextProps.hasAccessToken && !nextProps.hasSpotifyID) { // if we have teh access token and have fetched the user already
            this.props.actions.fetchSpotifyPlaylists();
        }

        if(nextProps.playlists.length > 0) { // if we have fetched the playlists
            this.setState({
                shouldRenderPlaylists: true,
            });
        }

        if(nextProps.selectedPlaylistTracks.length > 0) { // if we have fetched the track for the user selected playlist
            this.setState({
                shouldRenderSelectedPlaylistTracks: true
            });
        }
    }

    redirectToHomePage() {
        browserHistory.push('/');
    }

    connectToSpotify() {
        this.props.actions.connectToSpotify();
    }

    handlePlaylistSelect(event) {
        const playlistSelected = event.target.innerHTML;
        this.setState({
            selectedPlaylistName: playlistSelected
        });
        const playListIndex = _.findIndex(this.props.playlists, function (p) { // I LOVE LODASH
            return p.name == playlistSelected;
        });
        const playListId = this.props.playlists[playListIndex].id;
        const spotifyUserId = this.props.spotifyUserID;
        this.props.actions.fetchPlaylistTracks(spotifyUserId, playListId);
    }

    render () {
        return (
            <div className="container-fluid">
                <div className="jumbotron">
                    <h1>Welcome to the Tidus dashboard</h1>
                    <p>Here you can connect your Spotify playlists.</p>
                    {this.props.playlists.length == 0 && <Button className="btn btn-lg" onClick={this.connectToSpotify}>Click here to connect to Spotify</Button>}
                </div>


                {
                    this.state.shouldRenderSelectedPlaylistTracks &&
                    <div className="row">
                        <div className="col-md-12 text-center">
                            <h4>To build a corresponding YouTube playlist for {this.state.selectedPlaylistName} click the button below</h4>
                            <Button className="text-center">Use Tidus for {this.state.selectedPlaylistName}</Button>
                        </div>
                    </div>
                }
                {
                    this.state.shouldRenderPlaylists &&
                    <div className="col-lg-6">
                        <SpotifyPlaylistsContainer
                            playlists={this.props.playlists}
                            handlePlaylistSelect={this.handlePlaylistSelect}
                        />
                    </div>
                }
                {
                    this.state.shouldRenderSelectedPlaylistTracks &&
                    <div className="col-lg-6">
                        <SelectedTracksContainer
                            selectedPlaylistName={this.state.selectedPlaylistName}
                            tracks={this.props.selectedPlaylistTracks}
                        />
                    </div>
                }
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
    playlists: React.PropTypes.array,
    selectedPlaylistTracks: React.PropTypes.array,
    hasFoundTracks: React.PropTypes.bool
};
function mapStateToProps(store) { // connect props to global state object
    return {
        registeredUser: store.registerReducer.user,
        isSignedIn: store.registerReducer.isSignedIn,
        spotifyUrl: store.spotifyReducer.url,
        hasAccessToken: store.spotifyReducer.hasAccessToken,
        spotifyUserID: store.spotifyReducer.spotifyUserID,
        hasSpotifyID: store.spotifyReducer.hasSpotifyID,
        playlists: spotifySelectors.playlistFormatted(store.spotifyReducer.playlists),
        selectedPlaylistTracks: spotifySelectors.selectedTracksFormatted(store.spotifyReducer.selectedPlaylistTracks),
        hasFoundTracks: store.spotifyReducer.hasFoundTracks
    };
}

function mapDispatchToProps(dispatch) {
    return {
        actions: bindActionCreators(spotifyActions, dispatch)
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(RegisterPage);
