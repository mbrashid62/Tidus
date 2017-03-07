import expect from 'expect';
import * as spotifySelectors from './selectors';
import {spotifyCredentials} from '../constants/spotifyAuth';
import {unsortedTracks, spotifyPlaylistTracksObj, justTracks, audioFeatures, justTracksGramatik} from '../constants/testData';

describe('formatTacksObjForIdsAndJustTracks function', () => {
   it('should return an object containing a trackIds array and a justTracks array', () => {
       const actual = spotifySelectors.formatTracksObjForIdsAndJustTracks(spotifyPlaylistTracksObj);
       const expectedTrackIds = ['7CJrXIu3mwtSmxzmpe8NlX', '0LyfQWJT6nXafLPZqxe9Of'];
       expect(actual.trackIds).toEqual(expectedTrackIds);
       const expectedJustTracks = justTracks;
       expect(actual.justTracks).toEqual(expectedJustTracks);
   });
});
// todo: fix this test
// describe('addTracknameAndArtist function', () => {
//    it('should return an audio features object with the a track name and arist key value pair', () => {
//         const actual = spotifySelectors.addTrackNameAndArtist(audioFeatures, justTracksGramatik);
//         debugger;
//         const expectedArtistName = 'Gramatik';
//         expect(actual.name).toEqual(expectedArtistName);
//    });
// });

describe('buildSpotifyAuthURL function', () => {
    it('should return a properly formatted url for spotify redirect', () => {
        const expectedURLDev = 'https://accounts.spotify.com/authorize?response_type=token&client_id=b3295b28bbbd4d598f32515c7fdad7bf&scope=user-read-private%20user-read-email&redirect_uri=http%3A%2F%2Fwww.localhost%3A3000%2Fcallback&state=my-state';
        const expectedURLProd = 'https://accounts.spotify.com/authorize?response_type=token&client_id=b3295b28bbbd4d598f32515c7fdad7bf&scope=user-read-private%20user-read-email&redirect_uri=https%3A%2F%2Ftidus-music.herokuapp.com%2Fcallback%20&state=my-state';
        const actualURL = spotifySelectors.buildSpotifyAuthURL(spotifyCredentials);

        if(spotifyCredentials.redirect_uri.includes("localhost")) {
            expect(actualURL).toEqual(expectedURLDev);
        } else {
            expect(actualURL).toEqual(expectedURLProd);
        }
    });
});

describe('sortTracks function', () => {
    it('should properly sort a set of tracks by acousticness', () => {
        const actualTracks = spotifySelectors.sortTracks('acousticness', unsortedTracks);
        expect(actualTracks[3].artist).toEqual("Jack Johnson");
        expect(actualTracks[2].artist).toEqual("Bee Gees");
        expect(actualTracks[1].artist).toEqual("Adele");
        expect(actualTracks[0].artist).toEqual("Snoop Dog");
        // now toggle tracks
        const toggledTracks = spotifySelectors.sortTracks('acousticness', actualTracks);
        expect(toggledTracks[0].artist).toEqual("Jack Johnson");
        expect(toggledTracks[1].artist).toEqual("Bee Gees");
        expect(toggledTracks[2].artist).toEqual("Adele");
        expect(toggledTracks[3].artist).toEqual("Snoop Dog");
    });
});


