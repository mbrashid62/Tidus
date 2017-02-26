import expect from 'expect';
import { createStore } from 'redux';
import rootReducer from '../reducers';
import initialState from '../reducers/initialState';
import * as spotifyActions from '../actions/spotifyActions';


describe('Store', function() {
    it('Should handle analyzed tracks', function() {
      const store = createStore(rootReducer, initialState); // arrange
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

  //
  // it('Should handle sorting tracks', function() {
  //     const store = createStore(rootReducer, initialState); // arrange
  //     const analyzedTracks = [{
  //         artist: "Michael Bolton",
  //         name: "my Song"
  //     }, {
  //         artist: "Bee Gees",
  //         name: 'how deep is your love'
  //     }];
  //     // const playlistName = 'my playlist';
  //     // const action = spotifyActions.fetchAudioFeaturesForPlaylistSuccess(playlistName, analyzedTracks); // action
  //     // store.dispatch(action);
  //
  //     const sortAction = spotifyActions.sortTracks("name", analyzedTracks);
  //     store.dispatch(sortAction);
  //
  //     const actual = store.getState().spotifyReducer.analyzedTracks[0]; // assert
  //
  //     const expected = {
  //         artist: "Bee Gees",
  //         name: "how deep is your love"
  //     };
  //     expect(actual).toEqual(expected);
  //
  // });
});
