import { addNewMessageToDatabase } from '../controllers/notifchatctrl';

//
// ─── GLOBALES ───────────────────────────────────────────────────────────────────
//
const connexiontab = new Array([]);
let idUser;

//
// ─── CONNEXION TAB ──────────────────────────────────────────────────────────────
//  tab format -> connexiontab[[id, isOnline], [id, isOnline], ...]
const stockInTab = (id, isOnline) => {
  console.log(connexiontab);
  let action = 0;
  if (connexiontab !== undefined) {
    for (let i = 0; i < connexiontab.length; i += 1) {
      if (connexiontab[i][0] === id) {
        connexiontab[i][1] = isOnline;
        action = 1;
      }
    }
  }
  if (action === 0) {
    connexiontab[connexiontab.length - 1] = [];
    connexiontab[connexiontab.length - 1].push(id);
    connexiontab[connexiontab.length - 1].push(isOnline);
  }
  console.log(connexiontab);
  return connexiontab;
};

//
// ─── SOCKET FUNCTIONS ───────────────────────────────────────────────────────────
//
const socketFunction = (io) => {

  io.on('connection', (client) => {

    process.on('uncaughtException', (err) => {
      console.error(err.stack);
      console.log('Node NOT Exiting...');
    });

    client.on('USER-LOGIN', (data) => {
      idUser = data;
      stockInTab(idUser, true);
      io.emit('USER-IS-LOGIN', idUser, true);
    });

    client.on('disconnect', () => {
      stockInTab(idUser, false);
      io.emit('USER-IS-LOGIN', idUser, false);
    });

    client.on('USER-LOGIN-INIT', () => {
      io.emit('INIT', connexiontab);
    });

    client.on('NEW-NOTIFICATION', () => {
      io.emit('RELOAD-NOTIFICATION', idUser);
    });

    client.on('SEND_MESSAGE', (data) => { // variables : matcheId, senduserId(qui est l'id de l'user aui envoi le msg), message
      addNewMessageToDatabase(data.matcheId, data.senduserId, data.message);
      io.emit('RECEIVE_MESSAGE', data);
    });

  });

};

export default socketFunction;
