import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import * as spotifyActions from '../../actions/spotifyActions';
import { bindActionCreators } from 'redux';
import { browserHistory } from 'react-router';
import SpotifyPlaylistsContainer from './SpotifyPlaylistsContainer';
import SelectedTracksContainer from './SelectedTracksContainer';
import AnalyzedTrackTable from './AnalyzedTrackTable';
import StatusMsg from '../common/StatusMsg';
import DashJumboTron from '../common/DashJumboTron';
import InstructionsForAudioAnalysis from './InstructionsForAudioAnalysis';
import * as spotifySelectors from '../../selectors/selectors';
import _ from 'lodash';

export class Dashboard extends React.Component {
    constructor(props, context) {
        super(props, context);
        this.state = {
            shouldRenderPlaylists: false,
            shouldRenderSelectedPlaylistTracks: false,
            shouldShowAnalyzedData: false,
            shouldShowSpotifyButton: true,
            shouldHandleError: false,
            errorMsg: '',
            error: {}
        };
        this.redirectToHomePage = this.redirectToHomePage.bind(this);
        this.connectToSpotify = this.connectToSpotify.bind(this);
        this.handlePlaylistSelect = this.handlePlaylistSelect.bind(this);
        this.fetchAudioFeaturesDataForPlaylist = this.fetchAudioFeaturesDataForPlaylist.bind(this);
        this.sortTracks = this.sortTracks.bind(this);
    }

    componentWillMount() { // called before render method
        if(this.props.location.hash.split('=')[1] !== undefined) { // if redirected with access token
            const accessToken = this.props.location.hash.split('=')[1].split('&')[0]; // todo: fix this with regex or something...
            const pathname = this.props.location.pathname;
            if(accessToken !== '' && accessToken !== undefined) {
                if(pathname.includes('callback')) { // spotify redirect
                    this.props.actions.handleSpotifyAccessToken(accessToken);
                }
            }
        }
        // these if statements allows data to persist if user navigates away from the Dashboard and back
        if(this.props.spotifyUserID !== "") {
            this.setState({
                shouldRenderPlaylists: true,
                shouldShowSpotifyButton: false
            });
        }

        if(this.props.selectedPlaylistTracks.length > 0) {
            this.setState({ shouldRenderSelectedPlaylistTracks: true });
        }

        if(this.props.analyzedTracks.length > 0) {
            this.setState({ shouldShowAnalyzedData: true });
        }
    }
    componentDidMount() { // called after render method. DOM can be accessed in this method + data fetch
    }

    componentWillReceiveProps(nextProps) { // only called when props have changed. can update the state depending on the upcoming props w/o triggering a re-render

        if(this.props.hasSpotifyID) {
            this.setState({ shouldShowSpotifyButton: false });
        }

        if(nextProps.playlists.length > 0) { // if we have fetched the playlists
            this.setState({ shouldRenderPlaylists: true });
        }

        if(nextProps.selectedPlaylistTracks.length > 0) { // if we have fetched the tracks for the user selected playlist
            this.setState({ shouldRenderSelectedPlaylistTracks: true });
        }

        if(nextProps.analyzedTracks.length > 0) {
            this.setState({ shouldShowAnalyzedData: true });
        }

        if(!_.isEmpty(nextProps.error)) {
            this.setState({
                shouldHandleError: true,
                errorMsg: nextProps.error.message,
                errors: nextProps.error
            });
        } else {
            this.setState({
                shouldHandleError: false,
                errorMsg: '',
                errors: {}
            });
        }
    }

    componentDidUpdate(prevProps, prevState) { // called immediately after updating occurs. good place for network requests
        if(!prevProps.isSignedIn) {
            this.redirectToLoginPage();
        }
        if(prevProps.spotifyUrl == '' && this.props.spotifyUrl !== '') { // if redirect url has been set and has not be cleared
            window.location = this.props.spotifyUrl;
        }

        if(this.props.hasAccessToken && !this.props.hasSpotifyID) { // if we have the access token but haven't fetched the user yet
            if(!this.props.loading) { // this prevents stacking multiple requests in call stack. same technique used below
                this.props.actions.fetchSpotifyUserID();
            }
        }

        if(this.props.hasAccessToken && this.props.hasSpotifyID) { // if we have the access token and have fetched the user already
            if(!this.props.loading  && this.props.playlists.length == 0) { // todo fix this for the case a user logs in and doesn't have any playlists
                this.props.actions.fetchSpotifyPlaylists(this.props.spotifyUserID);
            }
        }
    }

    redirectToHomePage() {
        browserHistory.push('/');
    }

    redirectToLoginPage() {
        browserHistory.push('/login');
    }

    connectToSpotify() {
        this.props.actions.connectToSpotify();

        if(_.isEmpty(this.state.error)) {
            this.setState({ shouldShowSpotifyButton: false });
        }

    }
    fetchAudioFeaturesDataForPlaylist() {
        this.props.actions.fetchAudioFeaturesDataForPlaylist(this.props.selectedPlaylistName, this.props.selectedPlaylistTracks);
    }

    handlePlaylistSelect(event) {
        const playlistSelected = event.target.innerHTML;
        this.props.actions.handlePlaylistSelect(playlistSelected);
        const playListIndex = _.findIndex(this.props.playlists, function (p) { // Lodash rules
            return p.name == playlistSelected;
        });
        const playListId = this.props.playlists[playListIndex].id;
        const spotifyUserId = this.props.spotifyUserID;
        this.props.actions.fetchPlaylistTracks(spotifyUserId, playListId);
    }

    sortTracks(event) {
        const attributeSelected = event.target.innerHTML.toLowerCase();
        const tracks = this.props.analyzedTracks;
        this.props.actions.sortTracks(attributeSelected, tracks);
    }
    render () {
        return (
            <div className="container-fluid">
                <div className="center-block">
                    <DashJumboTron connectToSpotify={this.connectToSpotify}
                                   loading={this.props.loading}
                                   shouldShowSpotifyButton={this.state.shouldShowSpotifyButton}
                    />
                </div>

                {
                    this.state.shouldHandleError &&
                        <div className="row">
                            <div className="col-md-12 text-center">
                                <StatusMsg msg={this.state.errorMsg} errors={this.state.errors}/>
                            </div>
                        </div>
                }
                {
                    this.state.shouldShowAnalyzedData && !this.state.shouldHandleError &&
                    <div className="row">
                        <div className="col-md-12 text-center">
                            <AnalyzedTrackTable tracks={this.props.analyzedTracks} playlistName={this.props.analyzedPlaylistName} sortTracks={this.sortTracks}/>
                        </div>
                    </div>
                }

                {
                    this.state.shouldRenderSelectedPlaylistTracks && !this.state.shouldHandleError &&
                    <div className="row">
                        <div className="col-md-12 text-center">
                            <InstructionsForAudioAnalysis
                                selectedPlaylistName={this.props.selectedPlaylistName}
                                fetchAudioFeaturesDataForPlaylist={this.fetchAudioFeaturesDataForPlaylist}
                            />
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
                    this.state.shouldRenderSelectedPlaylistTracks && !this.state.shouldHandleError &&
                    <div className="col-lg-6">
                        <SelectedTracksContainer
                            selectedPlaylistName={this.props.selectedPlaylistName}
                            tracks={this.props.selectedPlaylistTracks}
                        />
                    </div>
                }

            </div>
        );
    }
}

Dashboard.propTypes = {

    isSignedIn: React.PropTypes.bool.isRequired,
    spotifyUrl: React.PropTypes.string,
    hasAccessToken: React.PropTypes.bool,
    spotifyUserID: React.PropTypes.string,
    hasSpotifyID: React.PropTypes.bool,
    playlists: React.PropTypes.array,
    selectedPlaylistName: React.PropTypes.string,
    selectedPlaylistTracks: React.PropTypes.array,
    analyzedPlaylistName: React.PropTypes.string,
    analyzedTracks: React.PropTypes.array,
    error: React.PropTypes.object,
    actions: React.PropTypes.object,
    location: React.PropTypes.object,
    loading: React.PropTypes.bool.isRequired
};
function mapStateToProps(store) { // connect props to global state object
    return {
        isSignedIn: store.registerReducer.isSignedIn,
        spotifyUrl: store.spotifyReducer.url,
        hasAccessToken: store.spotifyReducer.hasAccessToken,
        spotifyUserID: store.spotifyReducer.spotifyUserID,
        hasSpotifyID: store.spotifyReducer.hasSpotifyID, // todo: unnecessary prop
        playlists: spotifySelectors.playlistFormatted(store.spotifyReducer.playlists),
        selectedPlaylistName: store.spotifyReducer.selectedPlaylistName,
        selectedPlaylistTracks: spotifySelectors.selectedTracksFormatted(store.spotifyReducer.selectedPlaylistTracks),
        analyzedPlaylistName: store.spotifyReducer.analyzedPlaylistName,
        analyzedTracks: store.spotifyReducer.analyzedTracks,
        error: store.spotifyReducer.error,
        loading: store.ajaxCallsInProgress > 0
    };
}

function mapDispatchToProps(dispatch) {
    return {
        actions: bindActionCreators(spotifyActions, dispatch)
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(Dashboard);
