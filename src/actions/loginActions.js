import * as types from './actionTypes';
import * as firebase from "firebase";

//action creators
export function signInUserSuccess(user) {
    return { type: types.SIGNIN_USER_SUCCESS };
}

export function signOutUserSuccess() {
    return { type: types.SIGNOUT_USER_SUCCESS}
}

export function siginInUser(email, password) {
    firebase.auth().signInWithUserEmailAndPassword
        .catch(function (error) {
            console.log('error code: ' + error.code);
            console.log('error msg: ' + error.message);
        });
}

export function signOutUser() {
    firebase.auth().signOut()
        .then(function () {
            console.log('sign out successful...');
        }, function (error) {
            console.log('error in signing out...');
        });
}
