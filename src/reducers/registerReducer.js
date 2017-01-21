import * as types from '../actions/actionTypes';
import initialState from './initialState';

export default function registerReducer(state = initialState.registeredUser, action) {
    debugger;
    switch (action.type) {
        case types.CREATE_USER_SUCCESS:
            return [
                ...state, // es6 spread operator - explodes all values in array
                Object.assign({}, action.payload)
            ];

        case types.CREATE_USER_ERROR:
            return [
                ...state,
                Object.assign({}, action.payload)
            ];

        default:
            return state;
    }
}
