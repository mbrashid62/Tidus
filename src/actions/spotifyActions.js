import _ from 'lodash';
import SpotifyWebApi from 'spotify-web-api-node';

import * as types from './actionTypes';
import { beginAjaxCall } from './ajaxStatusActions';
import * as spotifySelectors from '.././selectors/selectors';
import { spotifyCredentials, wrapperCredentials } from '.././constants/spotifyAuth';

// action creators
export function createSpotifyAuthorizeUrlSuccess(url) {
    return { type: types.CREATE_SPOTIFY_AUTHORIZE_URL_SUCCESS, payload: { url: url }};
}

export function createAccessToken(accessToken) {
    return { type: types.CREATE_SPOTIFY_ACCESS_TOKEN, payload: { accessToken: accessToken, hasAccessToken: true }};
}

export function fetchSpotifyIDSuccess(userID) {
    return { type: types.FETCH_SPOTIFY_ID_SUCCESS, payload: { spotifyUserID: userID }};
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
    return { type: types.FETCH_SPOTIFY_PLAYLIST_TRACKS_COMPLETE, payload: { hasFoundTracks: true,  error: {}  }};
}

export function fetchSpotifyPlaylistTracksError(error) {
    return { type: types.FETCH_SPOTIFY_PLAYLIST_TRACKS_ISSUE, payload: { error: error }};
}

export function fetchAudioFeaturesForPlaylistComplete(playlistName, analyzedTracks) {
    return { type: types.FETCH_AUDIO_FEATURES_FOR_PLAYLIST_COMPLETE, payload: { analyzedPlaylistName: playlistName, analyzedTracks: analyzedTracks }};
}

export function fetchAudioFeaturesForPlaylistIssue(error) {
    return { type: types.FETCH_AUDIO_FEATURES_FOR_PLAYLIST_ISSUE, payload: { error: error }};
}

export function sortSpotifyAnalyzedTracks(sortedTracks) {
    return { type: types.SORT_SPOTIFY_ANALYZED_TRACKS, payload: { activeAnalyzedTracks: sortedTracks }};
}

export function createPlaylistSuccess(playlistId) {
    return { type: types.CREATE_PLAYLIST_SUCCESS, payload: { playlistId }};
}
export const spotifyApi = new SpotifyWebApi(wrapperCredentials);

export function connectToSpotify() {
    return (dispatch) => {
        dispatch(beginAjaxCall());
        const url = spotifySelectors.buildSpotifyAuthURL(spotifyCredentials);
        setTimeout(()=> {
            dispatch(createSpotifyAuthorizeUrlSuccess(url));
        }, 1000);
    };
}

export function handleSpotifyAccessToken(accessToken) {
    return (dispatch) => {
        spotifyApi.setAccessToken(accessToken);
        dispatch(createAccessToken(accessToken));
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
                dispatch(fetchSpotifyPlaylistsSuccess(data.body.items));
            })
            .catch((error) => {
                dispatch(fetchSpotifyPlaylistsError(error));
            });
    };
}

export function setActivePlaylistName(name) {
    return {
        type: types.SET_ACTIVE_PLAYLIST_NAME,
        payload: { activePlaylistName: name }
    };
}

export function setActiveTracks(playlistId) {
    return {
        type: types.SET_ACTIVE_TRACKS,
        payload: {
            playlistId
        }
    };
}

export function fetchPlaylistTracks(spotifyUserId, playlistId, playlistSelected){
    return (dispatch) => {
        spotifyApi.getPlaylistTracks(spotifyUserId, playlistId)
            .then((tracks) => {
                const spotifyTracks = tracks.body.items;
                dispatch(fetchSpotifyPlaylistTracksSuccess(spotifyTracks));
                dispatch(fetchAudioFeaturesDataForPlaylist(playlistSelected, spotifyTracks, playlistId));
            })
            .catch((error) => {
                dispatch(fetchSpotifyPlaylistTracksError(error));
            });
    };
}

export function fetchAudioFeaturesDataForPlaylist(spotifyPlaylistName, spotifyPlaylistTracksObj, playListId) {
    const formattedTrackData = spotifySelectors.formatTracksObjForIdsAndJustTracks(spotifyPlaylistTracksObj);
    const trackIds = formattedTrackData.trackIds;
    const justTracks = formattedTrackData.justTracks;

    return (dispatch) => {
        spotifyApi.getAudioFeaturesForTracks(trackIds)
            .then((data) => {
                const audioFeaturesWithNameAndArtists = spotifySelectors.addTrackNameAndArtist(data.body.audio_features, justTracks, playListId);
                dispatch(fetchAudioFeaturesForPlaylistComplete(spotifyPlaylistName, audioFeaturesWithNameAndArtists));
            }).catch((error) => {
                dispatch(fetchAudioFeaturesForPlaylistIssue(error));
            });
    };
}

export function getOnlyUserPlaylists(playlists, id) {
    let userOnlyPlaylists = [];

    _.forEach(playlists, ((playlist) => {
        if (playlist.owner.id === id) {
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

export const formatTracksForApi = (tracks) => _.map(tracks, (track) => `spotify:track:${track.id}`);

export const createPlaylist = (userId = '', tracks = [], name = 'My Cool Playlist') => {
    return (dispatch) => {
      spotifyApi.createPlaylist(userId, name, { public: false })
        .then((response) => {
            const playlistId = response.body.id;
            const tracksFormattedForApi = formatTracksForApi(tracks);
            spotifyApi.addTracksToPlaylist(userId, playlistId, tracksFormattedForApi)
              .then(() => dispatch(createPlaylistSuccess(playlistId)))
              .catch((error) => {
                  throw new Error(error);
              });
        })
        .catch((error) => {
            throw new Error(error);
        });
    };
};


export const setTopTracks = (topTracks) => {
    return {
        type: types.SET_TOP_TRACKS,
        payload: {
            topTracks,
        },
    };
};

export const resetCreatePlaylistStatus = () => {
    return {
        type: types.CREATE_PLAYLIST_RESET,
    };
};
