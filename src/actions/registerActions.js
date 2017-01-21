import * as types from './actionTypes';
import * as firebase from 'firebase';
// import { beginAjaxCall, ajaxCallError } from './ajaxStatusActions';
// import { signInUser } from './loginActions';
// import thunk from 'redux-thunk';

const config = {
    apiKey: "AIzaSyBBaYtvWenoWPJrBF__dalQHzLXGFyJW-Y",
    authDomain: "tidus-7b418.firebaseapp.com",
    databaseURL: "https://tidus-7b418.firebaseio.com/",
    storageBucket: "tidus-7b418.appspot.com"
};

firebase.initializeApp(config);

export function createUserSuccess(user) {
    return { type: types.CREATE_USER_SUCCESS, payload: { registeredUser: user, registerMsg: 'Successful Registration!'  }};
}

export function createUserError(error) {
    return { type: types.CREATE_USER_ERROR, payload: { registeredUser: {}, registerMsg: error.message }};
}

export function createUser(email, pw) { // async
    return (dispatch) => {
        return firebase.auth().createUserWithEmailAndPassword(email, pw)
            .then((user) => {
                dispatch(createUserSuccess(user));
            })
            .catch((error) => {
                dispatch(createUserError(error));
            });
    };
}