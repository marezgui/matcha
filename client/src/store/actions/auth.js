import axios from 'axios';
import * as actionTypes from './actionTypes';

export const authStart = () => ({
  type: actionTypes.AUTH_START,
});

export const authSuccess = (token, user) => ({
  type: actionTypes.AUTH_SUCCESS,
  token,
  user,
});

export const authFail = error => ({
  type: actionTypes.AUTH_FAIL,
  error,
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

export const auth = (mail, password) => (dispatch) => {
  dispatch(authStart());

  axios
    .post('http://localhost:8080/api/users/login', { mail, password })
    .then(async (res) => {
      const { token } = res.data;
      const user = await getUser(token);

      if (user) {
        localStorage.setItem('token', token);
        dispatch(authSuccess(token, user));
      } else {
        dispatch(
          authFail({
            message: "Can't get user informations, please try later.",
          })
        );
      }
    })
    .catch((err) => {
      dispatch(authFail(err.response.data.error));
    });
};

export const authCheckState = () => async (dispatch) => {
  const token = localStorage.getItem('token');

  if (!token) {
    dispatch(logout());
  } else {
    getUser(token)
      .then((user) => {
        dispatch(authSuccess(token, user));
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
