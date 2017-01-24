import * as types from '../actions/actionTypes';
import initialState from './initialState';

export default function registerReducer(state = initialState.registeredUser, action) {
    switch (action.type) {
        case types.CREATE_USER_SUCCESS:
            return Object.assign({}, state, action.payload);

        case types.CREATE_USER_ERROR:
            return Object.assign({}, state, action.payload);

        case types.SIGNIN_USER_SUCCESS:
            return Object.assign({}, state, action.payload);

        case types.SIGNIN_USER_ERROR:
            return Object.assign({}, state, action.payload);

        case types.SIGNOUT_USER_SUCCESS:
            return Object.assign({}, state, action.payload);

        default:
            return state;
    }
}
