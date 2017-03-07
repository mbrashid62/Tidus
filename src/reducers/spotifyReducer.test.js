import expect from 'expect';
import spotifyReducer from './spotifyReducer';
import * as actions from '../actions/spotifyActions';

const initialState = {
    spotifyData: {
        url: '',
        code: '',
        accessToken: '',
        hasAccessToken: false,
        spotifyUserID: '',
        playlists: [],
        selectedPlaylistTracks: [],
        hasFoundTracks: false,
        error: {}
    }
};

describe('Spotify Reducer', () => {
    it('should add the spotify authorize url on CREATE_SPOTIFY_AUTHORIZE_URL', () => {
        const url = 'https://example.com'; // mock data
        const action = actions.createSpotifyAuthorizeUrl(url); // action
        const newState = spotifyReducer(initialState, action); // mock
        expect(newState.url).toEqual(url);
        expect(newState.hasAccessToken).toNotEqual(true); // todo: figure out why this is undefined
    });

    it('should add the spotify access token on CREATE_ACCESS_TOKEN_SUCCESS', () => {
       const token = 'aa;lkjl;45;l24kj500298';
       const action = actions.createAccessToken(token);
       const newState = spotifyReducer(initialState, action);
       expect(newState.accessToken).toEqual(token);
       expect(newState.hasAccessToken).toEqual(true);
    });

    it('should remove the spotify authorize url on CREATE_ACCESS_TOKEN_SUCCESS', () => {
        const token = 'aa;lkjl;45;l24kj500298';
        const action = actions.createAccessToken(token);
        const newState = spotifyReducer(initialState, action);
        expect(newState.url).toEqual(undefined);
    });

    it('should add the spotify userId on FETCH_SPOTIFY_ID_SUCCESS', () => {
        const spotifyUserId = '123456';
        const action = actions.fetchSpotifyIDSuccess(spotifyUserId);
        const newState = spotifyReducer(initialState, action);
        expect(newState.spotifyUserID).toEqual(spotifyUserId);
    });

    it('should add an error on FETCH_SPOTIFY_ID_ERROR', () => {
       const error = { title: 'user not found' };
       const action = actions.fetchSpotifyIDError(error);
       const newState = spotifyReducer(initialState, action);
       expect(newState.error).toEqual(error);
    });

    it('should add a user\'s Spotify playlists on FETCH_SPOTIFY_PLAYLISTS_SUCCESS', () => {
        const playlists = [{title: 'cool playlist', tracks: [{}]}];
        const action = actions.fetchSpotifyPlaylistsSuccess(playlists);
        const newState= spotifyReducer(initialState, action);
        expect(newState.playlists).toEqual(playlists);
    });

    it('should add an error on FETCH_SPOTIFY_PLAYLIST_ERROR', () => {
        const error = {title: 'there was an error fetching your playlists'};
        const action = actions.fetchSpotifyPlaylistsError(error);
        const newState= spotifyReducer(initialState, action);
        expect(newState.error).toEqual(error);
    });

    it('should add selected playlist tracks on FETCH_PLAYLIST_TRACKS_SUCCESS', () => {
        const tracks = [{trackOne: 'sample'}, {trackTwo: 'other sample'}];
        const action = actions.fetchSpotifyPlaylistTracksSuccess(tracks);
        const newState= spotifyReducer(initialState, action);
        expect(newState.hasFoundTracks).toEqual(true);
        expect(newState.selectedPlaylistTracks).toEqual(tracks);
    });

    it('should add an error on FETCH_PLAYLIST_TRACKS_ERROR', () => {
        const error = {title: 'there was an error this playlist\'s tracks'};
        const action = actions.fetchSpotifyPlaylistTracksError(error);
        const newState= spotifyReducer(initialState, action);
        expect(newState.error).toEqual(error);
    });
});

