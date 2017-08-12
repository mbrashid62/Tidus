import * as types from './actionTypes';
import * as selectors from '.././selectors/selectors';


export function setOptimizeBtns(btnStatus) {
    return { type: types.SET_OPTIMIZE_BTNS, payload: { btnStatus: btnStatus }};
}

export function setSelectedOptimizeAttribute(attr) {
  return { type: types.SET_SELECTED_OPT_ATTR, payload: { selectedAttr: attr }};
}



export function handleOptimizeBtnChange(oldBtnStatus, clickedBtnId) {
  return (dispatch) => {
    const newBtnStatus = selectors.getNewBtnStatus(oldBtnStatus, clickedBtnId);
    dispatch(setOptimizeBtns(newBtnStatus));
  };
}

export function handleSelectOptAttr(attribute) {
    return (dispatch) => {
      dispatch(setSelectedOptimizeAttribute(attribute));
    };
}