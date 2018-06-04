import expect from 'expect';
import { createStore } from 'redux';
import rootReducer from '../reducers';
import initialState from '../reducers/initialState';
import * as spotifyActions from '../actions/spotifyActions';

describe('The single applciation state tree', function() {
    const store = createStore(rootReducer, initialState); // arrange
    it('Should handle creating a Spotify Authorize URL', function() {
        const expectedURL = '';
        const action = spotifyActions.createSpotifyAuthorizeUrlSuccess(expectedURL);
        store.dispatch(action);
        const actualURL = store.getState().spotifyReducer.url;
        expect(actualURL).toEqual(expectedURL);
    });
    it('Should give us an error on fetchAudioFeatureForPlaylistFailure', function() {
        const store = createStore(rootReducer, initialState); // arrange
        const expectedError = {code: 404, msg: 'Uh Oh'};
        const action = spotifyActions.fetchAudioFeaturesForPlaylistIssue(expectedError); // action
        store.dispatch(action);
        const actualAnalyzedTracks = store.getState().spotifyReducer.activeAnalyzedTracks; // assert
        const emptyArray = [];
        expect(actualAnalyzedTracks).toEqual(emptyArray);
        const actualError= store.getState().spotifyReducer.error; // assert
        expect(actualError).toEqual(expectedError);
    });
});
