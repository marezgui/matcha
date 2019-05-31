import { updateObject } from '../../shared/utility';
import * as actionTypes from '../actions/actionTypes';

const inititalState = {
  notifications: null,
};

const fetchNotifSuccess = (state, action) =>
  updateObject(state, {
    notifications: action.notifications,
  });

const reducer = (state = inititalState, action) => {
  switch (action.type) {
    case actionTypes.NOTIF_FETCH:
      return fetchNotifSuccess(state, action);
    default:
      return state;
  }
};

export default reducer;
