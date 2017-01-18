import {combineReducers} from 'redux';
import courses from './courseReducer';
import authors from './authorReducer';
import ajaxCallsInProgress from './ajaxStatusReducer';
import login from './loginReducer';

const rootReducer = combineReducers({
  courses,
  authors,
  login,
  ajaxCallsInProgress
});

export default rootReducer;
