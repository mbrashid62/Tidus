import { combineReducers } from 'redux';
import ajaxCallsInProgress from './ajaxStatusReducer';
import spotifyReducer from'./spotifyReducer';
import optimizeReducer from './optimizeReducer';

const rootReducer = combineReducers({
  ajaxCallsInProgress,
  spotifyReducer,
  optimizeReducer
});

export default rootReducer;
