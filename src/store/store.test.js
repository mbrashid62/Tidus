import expect from 'expect';
import { createStore } from 'redux';
import rootReducer from '../reducers';
import initialState from '../reducers/initialState';
import * as spotifyActions from '../actions/spotifyActions';

describe('The single applciation state tree', function() {
    const store = createStore(rootReducer, initialState); // arrange
    it('Should handle creating a Spotify Authorize URL', function() {
        const expectedURL = '';
        const action = spotifyActions.createSpotifyAuthorizeUrl(expectedURL);
        store.dispatch(action);
        const actualURL = store.getState().spotifyReducer.url;
        expect(actualURL).toEqual(expectedURL);
    });

    it('Should add track data on fetchAudioFeatureForPlaylistSuccess', function() {
        const store = createStore(rootReducer, initialState);
        const analyzedTracks = [{
            artist: "Michael Bolton",
            name: "my Song"
            }, {
            artist: "Bee Gees",
            name: 'how deep is your love'
        }];
        const playlistName = 'my playlist';
        const action = spotifyActions.fetchAudioFeaturesForPlaylistSuccess(playlistName, analyzedTracks); // action
        store.dispatch(action);
        const actual = store.getState().spotifyReducer.analyzedTracks[0]; // assert
        const expected = {
            artist: "Michael Bolton",
            name: "my Song"
        };
        expect(actual).toEqual(expected);
    });
    it('Should give us an error on fetchAudioFeatureForPlaylistFailure', function() {
        const store = createStore(rootReducer, initialState); // arrange
        const expectedError = {code: 404, msg: 'Uh Oh'};
        const action = spotifyActions.fetchAudiFeaturesForPlaylistError(expectedError); // action
        store.dispatch(action);
        const actualAnalyzedTracks = store.getState().spotifyReducer.analyzedTracks; // assert
        const emptyArray = [];
        expect(actualAnalyzedTracks).toEqual(emptyArray);
        const actualError= store.getState().spotifyReducer.error; // assert
        expect(actualError).toEqual(expectedError);
    });
});
