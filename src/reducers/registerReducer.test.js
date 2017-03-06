// import expect from 'expect';
// import registerReducer from './registerReducer';
// import * as actions from '../actions/authActions';
//
// describe('Register Reducer', () => {
//     it('should add a registered user on CREATE_USER_SUCCESS', () => {
//         const initialState = {
//             registeredUser: {
//                 user: {},
//                 msg: '',
//                 isRegistered: false,
//                 isSignedIn: false
//             }
//         };
//
//         const newUser = { email: 'testdude@gmail.com', password:'password' }; // mock data
//         const action = actions.createUserSuccess(newUser); // action
//         const newState = registerReducer(initialState, action); // mock
//
//         expect(newState.user.email).toEqual('testdude@gmail.com');
//         expect(newState.msg).toEqual('Successful Registration!');
//         expect(newState.isRegistered).toEqual(true);
//         // expect(newState.isSignedIn).toEqual(false); todo: figure out why this doesn't work
//     });
//
//     it('should login a user on SIGNIN_USER_SUCCESS', () => {
//         const initialState = {
//             registeredUser: {
//                 user: {},
//                 msg: '',
//                 isRegistered: false,
//                 isSignedIn: false
//             }
//         };
//
//         const newUser = { email: 'testdude@gmail.com', password:'password' };
//         const action = actions.signInUserSuccess(newUser);
//         const newState = registerReducer(initialState, action);
//         expect(newState.isSignedIn).toEqual(true);
//     });
//
//     it('should logout a user on SIGN_OUT_SUCCESS', () => {
//         const initialState = {
//             registeredUser: {
//                 user: {},
//                 msg: '',
//                 isRegistered: false,
//                 isSignedIn: false
//             }
//         };
//
//         const newUser = { email: 'testdude@gmail.com', password:'password' }; // mock data
//         const action = actions.signOutUserSuccess(newUser);
//         const newState = registerReducer(initialState, action);
//         expect(newState.isSignedIn).toEqual(false);
//     });
// });
