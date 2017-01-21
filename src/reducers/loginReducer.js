import * as types from '../actions/actionTypes';
import initialState from './initialState';

export default function loginReducer(state = initialState.loggedInUser, action) {
    debugger;
    switch (action.type) {
        case types.SIGNIN_USER_SUCCESS:
            return action.user;
        case types.SIGNOUT_USER_SUCCESS: return;
            // return [
            //     ...state.filter(course => course.id !== action.course.id),
            //     Object.assign({}, {})
            // ];

        default:
            return state;
    }
}
