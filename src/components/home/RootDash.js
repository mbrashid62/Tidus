import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { browserHistory } from 'react-router';
import * as spotifyActions from '../../actions/spotifyActions';
import * as spotifySelectors from '../../selectors/selectors';
import _ from 'lodash';

import SpotifyPlaylistsContainer from '../main/SpotifyPlaylistsContainer';
import AnalyzedTrackTable from '../main/AnalyzedTrackTable';
import StatusMsg from '../common/StatusMsg';
import HomeJumboTron from '../common/HomeJumboTron';
import NoPlaylist from '../common/NoPlaylist';
import OptimizeContainer from '../Optimize/OptimizeContainer';

export class RootDash extends React.Component {
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
        this.disconnectFromSpotify = this.disconnectFromSpotify.bind(this);
        this.handlePlaylistSelect = this.handlePlaylistSelect.bind(this);
        this.fetchAudioFeaturesDataForPlaylist = this.fetchAudioFeaturesDataForPlaylist.bind(this);
        this.sortTracks = this.sortTracks.bind(this);
    }

    componentWillMount() { // called before render method
        const { location, actions, spotifyUserID, analyzedTracks } = this.props;

        if(location.hash.split('=')[1] !== undefined) { // if redirected with access token
            const accessToken = location.hash.split('=')[1].split('&')[0]; // todo: fix this with regex or something...
            const pathname = location.pathname;
            if(accessToken !== '' && accessToken !== undefined) {
                if(pathname.includes('callback')) { // spotify redirect
                    actions.handleSpotifyAccessToken(accessToken);
                }
            }
        }

        // allow data to persist if user navigates away from the Dashboard and back
        if(spotifyUserID !== "") {
            this.setState({
                shouldRenderPlaylists: true,
                shouldShowSpotifyButton: false
            });
        }

        if(analyzedTracks.length > 0) {
            this.setState({ shouldShowAnalyzedData: true });
        }
    }

    componentDidMount() {

    }

    componentWillReceiveProps(nextProps) { // only called when props have changed. can update the state depending on the upcoming props w/o triggering a re-render
        const { hasSpotifyID } = this.props;

        if (hasSpotifyID) {
            this.setState({shouldShowSpotifyButton: false});
        }

        if (nextProps.playlists.length > 0) { // if we have fetched the playlists
            this.setState({shouldRenderPlaylists: true});
        }

        if (nextProps.analyzedTracks.length > 0) {
            this.setState({shouldShowAnalyzedData: true});
        }

        if (!_.isEmpty(nextProps.error)) {
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
        const { loading, actions, spotifyUserID, hasSpotifyID, hasAccessToken, spotifyUrl, playlists } = this.props;

        if(_.isEqual(prevProps.spotifyUrl, '') && !_.isEqual(spotifyUrl, '')) { // if redirect url has been set and has not be cleared
            window.location = spotifyUrl;
        }

        if(hasAccessToken && !hasSpotifyID) { // if we have the access token but haven't fetched the user yet
            if(!loading) { // this prevents stacking multiple requests in call stack. same technique used below
                actions.fetchSpotifyUserID();
            }
        }

        if(hasAccessToken && hasSpotifyID) { // if we have the access token and have fetched the user already
            if(!loading  && playlists.length === 0) { // todo fix this for the case a user logs in and doesn't have any playlists
                actions.fetchSpotifyPlaylists(spotifyUserID);
            }
        }
    }

    redirectToHomePage() {
        browserHistory.push('/');
    }

    connectToSpotify() {
        const { actions } = this.props;
        actions.connectToSpotify();

        if(_.isEmpty(this.state.error)) {
            this.setState({ shouldShowSpotifyButton: false });
        }
    }

    disconnectFromSpotify() {
        this.redirectToHomePage();
        location.reload(true);
    }

    handlePlaylistSelect(event) {
        const { actions, spotifyUserID, playlists } = this.props;

        const playlistSelected = event.target.innerHTML;
        actions.handlePlaylistSelect(playlistSelected);
        const playListIndex = _.findIndex(playlists, function (p) { // Lodash rules
            return p.name === playlistSelected;
        });
        const playListId = playlists[playListIndex].id;
        actions.fetchPlaylistTracks(spotifyUserID, playListId, playlistSelected);
    }

    fetchAudioFeaturesDataForPlaylist() {
        const { actions, selectedPlaylistName, selectedPlaylistTracks } = this.props;
        actions.fetchAudioFeaturesDataForPlaylist(selectedPlaylistName, selectedPlaylistTracks);
    }

    sortTracks(event) {
        const { actions, analyzedTracks } = this.props;
        const attributeSelected = event.target.innerHTML.toLowerCase();
        actions.sortTracks(attributeSelected, analyzedTracks);
    }

    render() {
        const { loading, hasSpotifyID, playlists, analyzedTracks, analyzedPlaylistName } = this.props;
        const { shouldShowSpotifyButton, shouldHandleError, errorMsg, errors, shouldShowAnalyzedData, shouldRenderPlaylists } = this.state;

        return (
            <div className="container-fluid">
                <div className="home-jumbo-block">
                    <HomeJumboTron
                        connectToSpotify={this.connectToSpotify}
                        disconnectFromSpotify={this.disconnectFromSpotify}
                        loading={loading}
                        shouldShowSpotifyButton={shouldShowSpotifyButton}
                    />
                </div>
                {
                    shouldHandleError &&
                    <div className="row">
                        <div className="col-md-12 text-center">
                            <StatusMsg msg={errorMsg} errors={errors}/>
                        </div>
                    </div>
                }
                {
                    shouldRenderPlaylists &&
                    <div className="col-md-4 text-center">
                        <SpotifyPlaylistsContainer
                            playlists={playlists}
                            handlePlaylistSelect={this.handlePlaylistSelect}
                        />
                    </div>
                }
                {
                    <div className="analyzed-track-table col-md-8">
                      {shouldShowAnalyzedData && !shouldHandleError &&
                        <AnalyzedTrackTable
                            tracks={analyzedTracks}
                            playlistName={analyzedPlaylistName}
                            sortTracks={this.sortTracks}
                            loading={loading}
                        />
                      } {!shouldShowAnalyzedData && hasSpotifyID && <NoPlaylist/>}
                    </div>
                }
                {
                    <div className="col-md-12">
                        <hr className="divider"/>
                        <OptimizeContainer/>
                    </div>
                }
            </div>


        );
    }
}

RootDash.propTypes = {
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
        spotifyUrl: store.spotifyReducer.url,
        hasAccessToken: store.spotifyReducer.hasAccessToken,
        spotifyUserID: store.spotifyReducer.spotifyUserID,
        hasSpotifyID: store.spotifyReducer.spotifyUserID !== '',
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

export default connect(mapStateToProps, mapDispatchToProps)(RootDash);