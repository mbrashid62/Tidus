// import React from 'react';
// import expect from 'expect';
// import {mount, shallow} from 'enzyme';
// import RegisterPage from './RegisterPage'
// import {StatusMsg} from './StatusMsg';
//
// const initialState = { // this is what the store looks like
//     registeredUser: {
//         user: {},
//         msg: '',
//         isRegistered: false,
//         isSignedIn: false
//     },
//     spotifyData: {
//         url: '',
//         code: '',
//         accessToken: '',
//         hasAccessToken: false,
//         spotifyUserID: '',
//         hasSpotifyID: false,
//         playlists: [],
//         analyzedPlaylistName: '',
//         analyzedTracks: [],
//         selectedPlaylistTracks: [],
//         hasFoundTracks: false,
//         error: {}
//     },
//     ajaxCallsInProgress: 0
// };
//
//
//
// function createMockStore(initialState) {
//     return {
//         subscribe: () => {
//         },
//         dispatch: () => {
//         },
//         getState: () => {
//             return initialState
//         }
//     };
// }
//
// describe ('Register Form Component', () => {
//     it('sets error message when trying to register mismatching passwords', () => {
//         const props = {
//             actions: {
//                 createUser: () => { return Promise.resolve(); },
//                 initStateChangeHook: () => { return Promise.resolve(); }
//             },
//             isSignedIn: false,
//             registerMsg: '',
//             registeredUser: {},
//             store: createMockStore(initialState)
//
//         };
//
//         const wrapper = mount(<RegisterPage {...props}/>);
//         const saveButton = wrapper.find('.action-btn');
//         expect(saveButton.text()).toBe('Sign Up');
//         // saveButton.simulate('click');
//         // expect(wrapper.state().errors.title).toBe('passwords must match');
//     });
// });
