import { addNewMessageToDatabase } from '../controllers/notifchatctrl';

//
// ─── CONNEXION TAB ──────────────────────────────────────────────────────────────
//  tab format -> connexiontab[[id, isOnline], [id, isOnline], ...]
const stockInTab = (connexiontab, idUser, isOnline) => {
  let action = 0;
  const resultTab = connexiontab;
  if (resultTab !== undefined) {
    for (let i = 0; i < resultTab.length; i += 1) {
      if (resultTab[i][0] === idUser) {
        resultTab[i][1] = isOnline;
        action = 1;
      }
    }
  }
  if (action === 0) {
    resultTab[resultTab.length] = [];
    resultTab[resultTab.length][0].push(idUser);
    resultTab[resultTab.length][1].push(isOnline);
  }
  return resultTab;
};

//
// ─── SOCKET FUNCTIONS ───────────────────────────────────────────────────────────
//
const socketFunction = (io) => {

  let connexiontab = [];

  io.on('connection', (client) => {
    let idUser;

    client.on('USER-LOGIN-INIT', () => {
      io.emit('INIT', connexiontab);
    });

    client.on('NEW-NOTIFICATION', () => {
      io.emit('RELOAD-NOTIFICATION', idUser);
    });

    client.on('USER-LOGIN', (userId) => {
      idUser = userId;
      console.log(idUser);
      connexiontab = stockInTab(connexiontab, idUser, true);
      io.emit('USER-IS-LOGIN', idUser, true); // besoin de userId
    });

    client.on('SEND_MESSAGE', (data) => { // variables : matcheId, senduserId(qui est l'id de l'user aui envoi le msg), message
      addNewMessageToDatabase(data.matcheId, data.senduserId, data.message);
      io.emit('RECEIVE_MESSAGE', data);
    });

    client.on('disconnect', () => {
      connexiontab = stockInTab(connexiontab, idUser, false);
      io.emit('USER-IS-LOGIN', idUser, false);
    });
  });

};

export default socketFunction;
