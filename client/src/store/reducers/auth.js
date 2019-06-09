import { updateObject } from '../../shared/utility';
import * as actionTypes from '../actions/actionTypes';

const inititalState = {
  token: null,
  user: null,
  error: null,
  loading: false,
};

const authStart = state =>
  updateObject(state, { error: null, loading: true });

const authSuccess = (state, action) =>
  updateObject(state, {
    token: action.token,
    user: action.user,
    error: null,
    loading: false,
  });


const fetchTags = (state, action) => {
  const { user } = state;
  return updateObject(state, { user: { ...user, tags: action.tags } });
};

const authFail = (state, action) =>
  updateObject(state, { error: action.error, loading: false });

const authUpdate = (state, action) => {
  const { user } = state;
  return updateObject(state, { user: { ...user, [action.name]: action.value } });
};

const authLogout = state =>
  updateObject(state, { token: null, user: null });

const reducer = (state = inititalState, action) => {
  switch (action.type) {
    case actionTypes.AUTH_START:
      return authStart(state, action);
    case actionTypes.AUTH_SUCCESS:
      return authSuccess(state, action);
    case actionTypes.FETCH_TAGS:
      return fetchTags(state, action);
    case actionTypes.AUTH_FAIL:
      return authFail(state, action);
    case actionTypes.AUTH_UPDATE:
      return authUpdate(state, action);
    case actionTypes.AUTH_LOGOUT:
      return authLogout(state, action);
    default:
      return state;
  }
};

export default reducer;
