import expect from 'expect';
import * as spotifySelectors from './selectors';
import {spotifyCredentials} from '../constants/spotifyAuth';
import {unsortedTracks} from '../constants/testData';

describe('buildSpotifyAuthURL function', () => {
    it('should return a properly formatted url for spotify redirect', () => {
        const expectedURL = 'https://accounts.spotify.com/authorize?response_type=token&client_id=b3295b28bbbd4d598f32515c7fdad7bf&scope=user-read-private%20user-read-email&redirect_uri=http%3A%2F%2Fwww.localhost%3A3000%2Fcallback&state=my-state';
        const actualURL = spotifySelectors.buildSpotifyAuthURL(spotifyCredentials);
        expect(actualURL).toEqual(expectedURL);
    });
});

describe('sortTracks function', () => {
    it('should properly sort a set of tracks by acousticness', () => {
        const actualTracks = spotifySelectors.sortTracks('acousticness', unsortedTracks);
        expect(actualTracks[3].artist).toEqual("Jack Johnson");
        expect(actualTracks[2].artist).toEqual("Bee Gees");
        expect(actualTracks[1].artist).toEqual("Adele");
        expect(actualTracks[0].artist).toEqual("Snoop Dog");
        // now we toggle tracks
        const toggledTracks = spotifySelectors.sortTracks('acousticness', actualTracks);
        expect(toggledTracks[0].artist).toEqual("Jack Johnson");
        expect(toggledTracks[1].artist).toEqual("Bee Gees");
        expect(toggledTracks[2].artist).toEqual("Adele");
        expect(toggledTracks[3].artist).toEqual("Snoop Dog");
    });
});
