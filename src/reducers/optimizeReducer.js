import * as types from '../actions/actionTypes';
import initialState from './initialState';

export default function optimizeReducer(state = initialState.optimizeData, action) {
    switch (action.type) {
        case types.SET_OPTIMIZE_BTNS:
            return Object.assign({}, state, action.payload);

        default:
            return state;
    }
}

