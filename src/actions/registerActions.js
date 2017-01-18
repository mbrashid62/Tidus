import * as types from './actionTypes';
import * as firebase from 'firebase';
import {beginAjaxCall, ajaxCallError} from './ajaxStatusActions';

const config = {
    apiKey: "AIzaSyBBaYtvWenoWPJrBF__dalQHzLXGFyJW-Y",
    authDomain: "tidus-7b418.firebaseapp.com",
    databaseURL: "https://tidus-7b418.firebaseio.com/",
    storageBucket: "tidus-7b418.appspot.com",
};

debugger;
firebase.initializeApp(config);

export function createUserSuccess() {
    return { type: types.CREATE_USER_SUCCESS, error: '' };
}

export function createUserError(error) {
    return { type: types.CREATE_USER_ERROR, error: error };
}

export function createUser(email, password) {
    debugger;
    return function (dispatch, getState) {
        dispatch(beginAjaxCall());
        return firebase.auth().createUserWithEmailAndPassword(email, password)
        .then(() => {
            dispatch(createUserSuccess());
        })
        .catch((error) => {
            dispatch(createUserError(error));
        });
    };
}
