import {combineReducers} from 'redux';
import ajaxCallsInProgress from './ajaxStatusReducer';
import spotifyReducer from'./spotifyReducer';

const rootReducer = combineReducers({
  spotifyReducer,
  ajaxCallsInProgress
});

export default rootReducer;
