import {combineReducers} from 'redux';
import courses from './courseReducer';
import authors from './authorReducer';
import ajaxCallsInProgress from './ajaxStatusReducer';
import registeredUser from './registerReducer';

const rootReducer = combineReducers({
  courses,
  authors,
  registeredUser,
  ajaxCallsInProgress
});

export default rootReducer;
