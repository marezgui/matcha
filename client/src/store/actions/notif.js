import axios from 'axios';
import * as actionTypes from './actionTypes';

export const notifFetch = (notifications, count) => ({
  type: actionTypes.NOTIF_FETCH,
  notifications,
  count,
});

export const getNotif = token => (dispatch) => {
  let notif = false;

  axios
    .get('http://localhost:8080/api/notifchat/getallnotif', { headers: { Authorization: `bearer ${token}` } })
    .then((res) => {
      let alert = 0;
      let chat = 0;

      notif = res.data.resultNotif;
      notif.forEach((el) => {
        if (!el[0].vue) {
          if (el[0].type === 'NEWMESSAGE') { chat += 1; } else { alert += 1; }
        }
      });
      dispatch(notifFetch(notif, { alert, chat }));
      // console.log(notif);
    })
    .catch(() => {
      notif = false;
    });
};
