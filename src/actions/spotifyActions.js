import * as types from './actionTypes';
import SpotifyWebApi from 'spotify-web-api-node';
import gapi from '../gapi';

// action creators
export function createSpotifyAuthorizeUrlSuccess(url) {
    return { type: types.CREATE_SPOTIFY_AUTHORIZE_URL_SUCCESS, payload: { url: url }};
}

export function createYouTubeAuthorizeUrlSuccess(url) {
    return { type: types.CREATE_YOUTUBE_AUTHORIZE_URL_SUCCESS, payload: { ytAuthUrl: url }};
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
    return { type: types.FETCH_SPOTIFY_PLAYLISTS_SUCCESS, payload: { playlists: playlists }};
}

export function fetchSpotifyPlaylistsError(error) {
    return { type: types.FETCH_SPOTIFY_PLAYLISTS_ERROR, payload: { error }};
}

export function fetchSpotifyPlaylistTracksSuccess(tracks) {
    return { type: types.FETCH_SPOTIFY_PLAYLIST_TRACKS_SUCCESS, payload: { selectedPlaylistTracks: tracks, hasFoundTracks: true }};
}

export function fetchSpotifyPlaylistTracksError(error) {
    return { type: types.FETCH_SPOTIFY_PLAYLISTS_ERROR, payload: { error: error }};
}

export function connectYouTubeSuccess(ytAccessToken) {
    return { type: types.CONNECT_YOUTUBE_SUCCESS, payload: { ytAccessToken: ytAccessToken }}
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
        debugger;
        // const redirect_uri = "http://www.localhost:3000/spotify/callback"; // for local
        const redirect_uri =  "https://tidus-music.herokuapp.com/spotify/callback"; // for prod
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

let playListName = '';
let playListTracks = [];

function setSelectedSpotifyData(playlist, tracks) {
    playListName = playlist;
    playListTracks = tracks;
}

export function connectToYouTube(spotifyPlaylistName, spotifyPlaylistTracks) {
    return(dispatch) => {
        function start() {
            const googleClientId = '917361040545-j1c02ddv0onvfa7sfdv1qjern26pjnoh.apps.googleusercontent.com';
            const scope = ['https://www.googleapis.com/auth/youtube'];
            // const redirect_uri = "http://www.localhost:3000/callback"; // for local
            const redirect_uri =  "https://tidus-music.herokuapp.com/youtube/callback"; // for prod

            let url = 'https://accounts.google.com/o/oauth2/auth';
            url += '?client_id=' + encodeURIComponent(googleClientId);
            url += '&redirect_uri=' + encodeURIComponent(redirect_uri);
            url += '&response_type=token';
            url += '&scope=' + encodeURIComponent(scope);

            setSelectedSpotifyData(spotifyPlaylistName, spotifyPlaylistTracks);
            dispatch(createYouTubeAuthorizeUrlSuccess(url));
        }
        start();
    };
}
export function handleYouTubeAccessToken(accessToken) {
    debugger;
    const playlist = playListName;
    const tracks = playListTracks;
    return (dispatch) => {

    };
}