import * as types from './actionTypes';
import SpotifyWebApi from 'spotify-web-api-node';
import _ from 'lodash';
import { beginAjaxCall } from './ajaxStatusActions';
import * as spotifySelectors from '.././selectors/selectors';
import { spotifyCredentials, wrapperCredentials } from '.././constants/spotifyAuth';

// action creators
export function createSpotifyAuthorizeUrl(url) {
    return { type: types.CREATE_SPOTIFY_AUTHORIZE_URL, payload: { url: url }};
}

export function createAccessToken(accessToken) {
    return { type: types.CREATE_SPOTIFY_ACCESS_TOKEN, payload: { accessToken: accessToken, hasAccessToken: true }};
}

export function fetchSpotifyIDSuccess(userID) {
    return { type: types.FETCH_SPOTIFY_ID_SUCCESS, payload: { spotifyUserID: userID, hasSpotifyID: true }};
}

export function fetchSpotifyIDError(error) {
    return { type: types.FETCH_SPOTIFY_ID_ERROR, payload: { error: error }};
}

export function fetchSpotifyPlaylistsSuccess(playlists) {
    return { type: types.FETCH_SPOTIFY_PLAYLISTS_SUCCESS, payload: { playlists: playlists}};
}

export function fetchSpotifyPlaylistsError(error) {
    return { type: types.FETCH_SPOTIFY_PLAYLISTS_ERROR, payload: { error }};
}

export function fetchSpotifyPlaylistTracksSuccess(tracks) {
    return { type: types.FETCH_SPOTIFY_PLAYLIST_TRACKS_SUCCESS, payload: { selectedPlaylistTracks: tracks, hasFoundTracks: true,  error: {}  }};
}

export function fetchSpotifyPlaylistTracksError(error) {
    return { type: types.FETCH_SPOTIFY_PLAYLISTS_ERROR, payload: { error: error }};
}

export function fetchAudioFeaturesForPlaylistSuccess(playlistName, analyzedTracks) {
    return { type: types.FETCH_AUDIO_FEATURES_FOR_PLAYLIST_SUCCESS, payload: { analyzedPlaylistName: playlistName, analyzedTracks: analyzedTracks }};
}

export function fetchAudiFeaturesForPlaylistError(error) {
    return { type: types.FETCH_AUDIO_FEATURES_FOR_PLAYLIST_ERROR, payload: { error: error }};
}

export function sortSpotifyAnalyzedTracks(sortedTracks) {
    return { type: types.SORT_SPOTIFY_ANALYZED_TRACKS, payload: { analyzedTracks: sortedTracks }};
}

export function handleSelectedPlaylist(selectedPlaylist) {
    return { type: types.HANDLE_PLAYLIST_SELECT, payload: { selectedPlaylistName: selectedPlaylist }};
}

const spotifyApi = new SpotifyWebApi(wrapperCredentials);

export function connectToSpotify() {
    return (dispatch) => {
        const url = spotifySelectors.buildSpotifyAuthURL(spotifyCredentials);
        dispatch(createSpotifyAuthorizeUrl(url));
    };
}

export function handleSpotifyAccessToken(accessToken) {
    return (dispatch) => {
        spotifyApi.setAccessToken(accessToken);
        dispatch(createAccessToken(accessToken));
    };
}

export function handlePlaylistSelect(selectedPlaylist) {
    return (dispatch) => {
      dispatch(handleSelectedPlaylist(selectedPlaylist));
    };
}

export function fetchSpotifyUserID() {
    return (dispatch) => {
        dispatch(beginAjaxCall());
        spotifyApi.getMe()
            .then((data)=> {
                dispatch(fetchSpotifyIDSuccess(data.body.id));
            }).catch((error)=> {
                dispatch(fetchSpotifyIDError(error));
            });
    };
}

export function fetchSpotifyPlaylists(spotifyID) {
    return (dispatch) => {
        dispatch(beginAjaxCall());
        spotifyApi.getUserPlaylists(spotifyID)
            .then((data) => {
                const userOnlyPlaylists = getOnlyUserPlaylists(data.body.items, spotifyID);
                dispatch(fetchSpotifyPlaylistsSuccess(userOnlyPlaylists));
            })
            .catch((error) => {
                dispatch(fetchSpotifyPlaylistsError(error));
            });
    };
}

export function fetchPlaylistTracks(spotifyUserId, playlistId) {
    return (dispatch) => {
        dispatch(beginAjaxCall());
        spotifyApi.getPlaylistTracks(spotifyUserId, playlistId)
            .then((tracks) => {
                dispatch(fetchSpotifyPlaylistTracksSuccess(tracks.body.items));
            })
            .catch((error) => {
                dispatch(fetchSpotifyPlaylistTracksError(error));
            });
    };
}

export function fetchAudioFeaturesDataForPlaylist(spotifyPlaylistName, spotifyPlaylistTracks) {
    let trackIds = [];

    _.forEach(spotifyPlaylistTracks, ((track) => {
           trackIds.push(track.id);
    }));

    return(dispatch) => {
        dispatch(beginAjaxCall());
        spotifyApi.getAudioFeaturesForTracks(trackIds)
            .then((data) => {
                _.forEach(data.body.audio_features, ((trackAudioData) => { // add track name and artist to trackAudioData array
                    const id = trackAudioData.id;
                    const track = _.find(spotifyPlaylistTracks, {id: id});
                    trackAudioData.name = track.name;
                    trackAudioData.artist = track.artist;
                }));
                dispatch(fetchAudioFeaturesForPlaylistSuccess(spotifyPlaylistName, data.body.audio_features));
            }).catch((error) => {
                dispatch(fetchAudiFeaturesForPlaylistError(error));
            });
    };
}

export function getOnlyUserPlaylists(playlists, id) {
    let userOnlyPlaylists = [];

    _.forEach(playlists, ((playlist) => {
        if(playlist.owner.id == id) {
            userOnlyPlaylists.push(playlist);
        }
    }));

    return userOnlyPlaylists;
}

export function sortTracks(attribute, tracks) {
    return (dispatch) => {
        const sortedTracks = spotifySelectors.sortTracks(attribute, tracks);
        dispatch(sortSpotifyAnalyzedTracks(sortedTracks));
    };
}
