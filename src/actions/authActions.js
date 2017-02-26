import * as types from './actionTypes';
import * as firebase from 'firebase';
import { beginAjaxCall } from './ajaxStatusActions';

export function initStateChangeHook() {
    return (dispatch) => {
        dispatch(beginAjaxCall());
        firebase.auth().onAuthStateChanged((user) => {
            if(user) {
                dispatch(signInUserSuccess(user));

            } else {
                dispatch(signOutUserSuccess(user));
            }
        });
    };
}

// action creators
export function createUserSuccess(user) {
    return { type: types.CREATE_USER_SUCCESS, payload: { user: user, msg: 'Successful Registration!', isRegistered: true  }};
}

export function createUserError(error) {
    return { type: types.CREATE_USER_ERROR, payload: { user: {}, msg: error.message, isRegistered: false }};
}

export function signInUserSuccess(user) {
    return { type: types.SIGNIN_USER_SUCCESS, payload: { user: user, isSignedIn: true, msg: 'Successful login!' }};
}

export function signInUserError(error) {
    return { type: types.SIGNIN_USER_ERROR, payload: { user: {}, isSignedIn: false, msg: error.message  }};
}

export function signOutUserSuccess() {
    return { type: types.SIGNOUT_USER_SUCCESS, payload: { user: {}, isSignedIn: false, msg: ''}};
}
export function signOutUserError(error) {
    return { type: types.SIGNOUT_USER_ERROR, payload: { isSignedIn: true, msg: error.message }};
}

export function createUser(email, pw) { // async
    return (dispatch) => {
        dispatch(beginAjaxCall());
        return firebase.auth().createUserWithEmailAndPassword(email, pw)
            .then((user) => {
                dispatch(createUserSuccess(user));
            })
            .catch((error) => {
                dispatch(createUserError(error));
            });
    };
}

export function signInUser(email, password) {
    return (dispatch) => {
        dispatch(beginAjaxCall());
        firebase.auth().signInWithEmailAndPassword(email, password)
            .then((user) => {
                // sign in state change will be handled but hook
            })
            .catch(function (error) {
                dispatch(signInUserError(error));
            });
    };
}

export function signOutUser() {
    return (dispatch) => {
      dispatch(beginAjaxCall());
      return firebase.auth().signOut()
          .then(() => {
              // state change handled by hook
          })
          .catch((error) => {
              dispatch(signOutUserError(error));
          });
    };
}