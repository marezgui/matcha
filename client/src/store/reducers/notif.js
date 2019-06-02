import { updateObject } from '../../shared/utility';
import * as actionTypes from '../actions/actionTypes';

const inititalState = {
  notifications: null,
  messages: null,
  count: {
    alert: 0,
    chat: 0,
  },
};

const fetchNotifSuccess = (state, action) =>
  updateObject(state, {
    notifications: action.notifications,
    count: action.count,
  });

const authLogout = state =>
  updateObject(state, { notifications: null });

const reducer = (state = inititalState, action) => {
  switch (action.type) {
    case actionTypes.NOTIF_FETCH:
      return fetchNotifSuccess(state, action);
    case actionTypes.AUTH_LOGOUT:
      return authLogout(state, action);
    default:
      return state;
  }
};

export default reducer;
