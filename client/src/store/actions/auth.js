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

export const notifFetch = notifications => ({
  type: actionTypes.NOTIF_FETCH,
  notifications,
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

const getNotif = async (token) => {
  let notif = false;

  await axios
    .get('http://localhost:8080/api/notifchat/getallnotif', { headers: { Authorization: `bearer ${token}` } })
    .then((res) => {
      notif = res.data.resultNotif;
      // console.log(notif);
    })
    .catch(() => {
      notif = false;
    });

  return notif;
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
        const notifications = await getNotif(token, user.idUser);
        dispatch(notifFetch(notifications));
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
      .then(async (user) => {
        dispatch(authSuccess(token, user));
        const notifications = await getNotif(token);
        dispatch(notifFetch(notifications));
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
