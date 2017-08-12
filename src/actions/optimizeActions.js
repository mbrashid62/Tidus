import * as types from './actionTypes';
import * as selectors from '.././selectors/selectors';


export function setOptimizeBtns(btnStatus) {
    return { type: types.SET_OPTIMIZE_BTNS, payload: { btnStatus: btnStatus }};
}

export function updateOptimizeBtns(btnstats) {
    return { type: types, payload: {}};
}

export function handleOptimizeBtnChange(oldBtnStatus, clickedBtnId) {
  return (dispatch) => {
    const newBtnStatus = selectors.getNewBtnStatus(oldBtnStatus, clickedBtnId);
    dispatch(setOptimizeBtns(newBtnStatus));
  };
}