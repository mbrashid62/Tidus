import {combineReducers} from 'redux';
import courses from './courseReducer';
import authors from './authorReducer';
import ajaxCallsInProgress from './ajaxStatusReducer';
import registeredUser from './registerReducer';
import loggedInUser from './loginReducer';

const rootReducer = combineReducers({
  courses,
  authors,
  registeredUser,
  loggedInUser,
  ajaxCallsInProgress
});

export default rootReducer;
