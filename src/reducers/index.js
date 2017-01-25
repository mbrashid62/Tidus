import {combineReducers} from 'redux';
import ajaxCallsInProgress from './ajaxStatusReducer';
import registerReducer from './registerReducer';
import spotifyReducer from'./spotifyReducer';
import * as firebase from 'firebase';

let hasInitialized = false;

if(!hasInitialized) {
    const config = {
        apiKey: "AIzaSyBBaYtvWenoWPJrBF__dalQHzLXGFyJW-Y",
        authDomain: "tidus-7b418.firebaseapp.com",
        databaseURL: "https://tidus-7b418.firebaseio.com/",
        storageBucket: "tidus-7b418.appspot.com"
    };
    firebase.initializeApp(config);
}
hasInitialized=true;

const rootReducer = combineReducers({
  registerReducer,
  spotifyReducer,
  ajaxCallsInProgress
});

export default rootReducer;
