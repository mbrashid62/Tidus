
import * as types from '../actions/actionTypes';
import initialState from './initialState';

export default function spotifyReducer(state = initialState.spotifyData, action) {
    switch (action.type) {
        case types.CREATE_SPOTIFY_AUTHORIZE_URL_SUCCESS:
            return Object.assign({}, state, action.payload);

        case types.CREATE_SPOTIFY_ACCESS_TOKEN_SUCCESS:
            return Object.assign({}, state, action.payload);

        case types.FETCH_SPOTIFY_ID_SUCCESS:
            return Object.assign({}, state, action.payload);

        case types.FETCH_SPOTIFY_ID_ERROR:
            return Object.assign({}, state, action.payload);

        case types.FETCH_SPOTIFY_PLAYLISTS_SUCCESS:
            return Object.assign({}, state, action.payload);

        case types.FETCH_SPOTIFY_PLAYLISTS_ERROR:
            return Object.assign({}, state, action.payload);

        default:
            return state;
    }
}
