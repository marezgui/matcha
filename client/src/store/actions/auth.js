import axios from 'axios';
import * as actionTypes from './actionTypes';
import * as actions from './index';

export const authStart = () => ({
  type: actionTypes.AUTH_START,
});

export const authSuccess = (token, user) => ({
  type: actionTypes.AUTH_SUCCESS,
  token,
  user,
});

export const fetchTags = tags => ({
  type: actionTypes.FETCH_TAGS,
  tags,
});

export const authFail = error => ({
  type: actionTypes.AUTH_FAIL,
  error,
});

export const authUpdate = (name, value) => ({
  type: actionTypes.AUTH_UPDATE,
  name,
  value,
});

export const logout = () => {
  localStorage.removeItem('token');
  return {
    type: actionTypes.AUTH_LOGOUT,
  };
};

const getUser = async (token) => {
  let user = false;

  await axios
    .get('http://localhost:8080/api/users/me', { headers: { Authorization: `bearer ${token}` } })
    .then((res) => {
      user = res.data;
    })
    .catch(() => {
      user = false;
    });

  return user;
};

export const getTags = (token, idUser) => (dispatch) => {
  let tags = null;

  axios
    .get(`http://localhost:8080/api/users/usertag/${idUser}`, { headers: { Authorization: `bearer ${token}` } })
    .then((res) => {
      tags = res.data.usertag;
      dispatch(fetchTags(tags));
      console.log(res.data.usertag);
    })
    .catch(() => { tags = null; });
  return tags;
};

export const auth = (username, password) => (dispatch) => {
  dispatch(authStart());

  axios
    .post('http://localhost:8080/api/users/login', { username, password })
    .then(async (res) => {
      const { token } = res.data;
      const user = await getUser(token);
      // const tags = null;

      if (user) {
        localStorage.setItem('token', token);
        dispatch(authSuccess(token, user));
        // tags = await getTags(token, user.idUser);
        // dispatch(fetchTags(tags));
        dispatch(actions.getNotif(token));
      } else {
        dispatch(
          authFail({
            message: "Can't get user informations, please try later.",
          })
        );
      }
    })
    .catch((err) => {
      // dispatch(authFail(err.response.data.error));
    });
};

export const authCheckState = () => async (dispatch) => {
  const token = localStorage.getItem('token');
  // const tags = null;

  if (!token) {
    dispatch(logout());
  } else {
    getUser(token)
      .then(async (user) => {
        dispatch(authSuccess(token, user));
        // tags = await getTags(token, user.idUser);
        // dispatch(fetchTags(tags));
        dispatch(actions.getNotif(token));
      })
      .catch(() => {
        dispatch(logout());
      });
  }/*
  const user = await getUser(token); // Loading...

  if (!user) {
    dispatch(logout());
  } else {
    dispatch(authSuccess(token, user));
  } */
};
