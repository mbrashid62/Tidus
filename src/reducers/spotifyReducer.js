import _ from 'lodash';
import * as types from '../actions/actionTypes';
import initialState from './initialState';

export default function spotifyReducer(state = initialState.spotifyData, action) {
    switch (action.type) {
        case types.CREATE_SPOTIFY_AUTHORIZE_URL_SUCCESS:
            return Object.assign({}, state, action.payload);

        case types.CREATE_SPOTIFY_ACCESS_TOKEN:
            return Object.assign({}, state, action.payload);

        case types.FETCH_SPOTIFY_ID_SUCCESS:
            return Object.assign({}, state, action.payload);

        case types.FETCH_SPOTIFY_ID_ERROR:
            return Object.assign({}, state, action.payload);

        case types.FETCH_SPOTIFY_PLAYLISTS_SUCCESS:
            return Object.assign({}, state, action.payload);

        case types.FETCH_SPOTIFY_PLAYLISTS_ERROR:
            return Object.assign({}, state, action.payload);

        case types.FETCH_SPOTIFY_PLAYLIST_TRACKS_COMPLETE:
            return Object.assign({}, state, action.payload);

        case types.FETCH_SPOTIFY_PLAYLIST_TRACKS_ISSUE:
            return Object.assign({}, state , action.payload);

        case types.FETCH_AUDIO_FEATURES_FOR_PLAYLIST_COMPLETE:
            return Object.assign({}, state, {
                allAnalyzedTracks: _.concat(state.allAnalyzedTracks, action.payload.analyzedTracks)
            });

        case types.FETCH_AUDIO_FEATURES_FOR_PLAYLIST_ISSUE:
            return Object.assign({}, state, action.payload);

        case types.SORT_SPOTIFY_ANALYZED_TRACKS:
            return Object.assign({}, state, action.payload);

        case types.SET_ACTIVE_PLAYLIST_NAME:
            return Object.assign({}, state, action.payload);

        case types.SET_ACTIVE_TRACKS:
            return Object.assign({}, state, {
                activeAnalyzedTracks: _.filter(state.allAnalyzedTracks, (track) => track.playlistId === action.payload.playlistId)
            });
        case types.CREATE_PLAYLIST_SUCCESS:
            return Object.assign({}, state, {
              createPlaylistStatus: 'SUCCESS',
            });
        case types.CREATE_PLAYLIST_ERROR:
          return Object.assign({}, state, {
            createPlaylistStatus: 'ERROR',
          });
        case types.CREATE_PLAYLIST_RESET:
            return Object.assign({}, state, {
            createPlaylistStatus: 'IDLE',
        });
        case types.SET_TOP_TRACKS:
            return Object.assign({}, state, {
                topTracks: action.payload.topTracks
            });
        default:
            return state;
    }
}
