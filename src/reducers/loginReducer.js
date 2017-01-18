import * as types from '../actions/actionTypes';
import initialState from './initialState';

export default function loginReducer(state = initialState.user, action) {
    debugger;
    switch (action.type) {
        case types.SIGNIN_USER_SUCCESS:
            return action.user;

        case types.CREATE_USER_SUCCESS:
            return [
                ...state, // es6 spread operator - explodes all values in array
                Object.assign({}, action.user)
            ];

        case types.CREATE_USER_ERROR:
            return [
                ...state,
                Object.assign({}, action.error.message)
            ];

        case types.SIGNOUT_USER_SUCCESS: return;
            // return [
            //     ...state.filter(course => course.id !== action.course.id),
            //     Object.assign({}, {})
            // ];

        default:
            return state;
    }
}
