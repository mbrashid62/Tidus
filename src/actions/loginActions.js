import * as types from './actionTypes';
import * as firebase from "firebase";

//action creators
export function signInUserSuccess(user) {
    return { type: types.SIGNIN_USER_SUCCESS, user:user };
}

export function signOutUserSuccess() {
    return { type: types.SIGNOUT_USER_SUCCESS };
}

export function signInUser(email, password) {
    firebase.auth().signInWithUserEmailAndPassword(email, password)
        .then((user) => {
            signInUserSuccess(user);
        })
        .catch(function (error) {
            throw (error);
        });
}

export function signOutUser() {
    firebase.auth().signOut()
        .then(function () {
            signOutUser();
        }, function (error) {
            throw(error);
        });
}
