import * as types from './actionTypes';
import SpotifyWebApi from 'spotify-web-api-node';
import _ from 'lodash';

// action creators
export function createSpotifyAuthorizeUrlSuccess(url) {
    return { type: types.CREATE_SPOTIFY_AUTHORIZE_URL_SUCCESS, payload: { url: url }};
}

export function createAccessTokenSuccess(accessToken) {
    return { type: types.CREATE_SPOTIFY_ACCESS_TOKEN_SUCCESS, payload: { accessToken: accessToken, hasAccessToken: true }};
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


const spotifyApi = new SpotifyWebApi({
    clientId: 'b3295b28bbbd4d598f32515c7fdad7bf',
    clientSecret: '564da0f10a104edd9ca4f0aabb479ea0',
    redirectUri: 'http://www.localhost:3000/callback'
});

export function connectToSpotify() {
    return (dispatch) => {
        const clientId = 'b3295b28bbbd4d598f32515c7fdad7bf';
        const scope = 'user-read-private user-read-email';
        // const redirect_uri = "http://www.localhost:3000/callback"; // for local
        const redirect_uri =  "https://tidus-music.herokuapp.com/callback"; // for prod
        const state = 'my-state';
        let url = 'https://accounts.spotify.com/authorize';
        url += '?response_type=token';
        url += '&client_id=' + encodeURIComponent(clientId);
        url += '&scope=' + encodeURIComponent(scope);
        url += '&redirect_uri=' + encodeURIComponent(redirect_uri);
        url += '&state=' + encodeURIComponent(state);

        dispatch(createSpotifyAuthorizeUrlSuccess(url));
    };
}

export function handleSpotifyAccessToken(accessToken) {
    return (dispatch) => {
        spotifyApi.setAccessToken(accessToken);
        dispatch(createAccessTokenSuccess(accessToken));
    };
}

export function fetchSpotifyUserID() {
    return (dispatch) => {
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
        spotifyApi.getUserPlaylists(spotifyID)
            .then((data) => {
                dispatch(fetchSpotifyPlaylistsSuccess(data.body.items));
            })
            .catch((error) => {
                dispatch(fetchSpotifyPlaylistsError(error));
            });
    };
}

export function fetchPlaylistTracks(spotifyUserId, playlistId) {
    return (dispatch) => {
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
