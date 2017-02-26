import expect from 'expect';
import * as spotifyActions from './spotifyActions';
import * as types from './actionTypes';

describe('Spotify Actions', () => {
    describe('sortSpotifyAnalyzedTracks', () => {
        it('should create a SORT_SPOTIFY_ANALYZED_TRACKS action', () => {
            const payload = { analyzedTracks: [] };
            const expectedAction = {
                type: types.SORT_SPOTIFY_ANALYZED_TRACKS,
                payload: payload
            };
            const action = spotifyActions.sortSpotifyAnalyzedTracks([]); // call the action
            expect(action).toEqual(expectedAction); // make the assertion
        });
    });
});
