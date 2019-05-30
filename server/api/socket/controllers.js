import { addNewMessageToDatabase } from '../controllers/notifchatctrl';
import { db } from '../../database';

//
// ─── EDIT USER ISONLINE ET CONNEXIONLOG ─────────────────────────────────────────
//
const editLog = (idUser, status) => {
  if (idUser !== undefined) {
    db.query('UPDATE "users" SET "isOnline" = $1 , "connexionLog" = NOW() WHERE "idUser" = $2',
      [status, idUser],
      (err, res) => {
        if (err.error) {
          console.log('error edit log');
        }
        console.log(`edit logs${res}`);
      });
  }
};

//
// ─── SOCKET FUNCTIONS ───────────────────────────────────────────────────────────
//
const socketFunction = (io) => {

  io.on('connection', (client) => {
    process.setMaxListeners(0);
    process.on('uncaughtException', (err) => {
      console.error(err.stack);
      console.log('Node NOT Exiting...');
    });

    client.on('USER-LOGIN', (data) => {
      // eslint-disable-next-line no-param-reassign
      client.userid = data;
      console.log(`connect :${client.userid}`);
      editLog(client.userid, true);
      io.emit('USER-STATUS', data, true); // ----> il faut que tu regarde cet event
    });

    client.on('USER-LOGOUT', (data) => {
      // eslint-disable-next-line no-param-reassign
      client.userid = data;
      console.log(`logout :${client.userid}`);
      editLog(client.userid, false);
      io.emit('USER-STATUS', data, false); // ----> il faut que tu regarde cet event
    });

    client.on('disconnect', () => {
      console.log(`disconnect :${client.userid}`);
      editLog(client.userid, false);
      io.emit('USER-STATUS', client.userid, false);
    });

    client.on('CREATE-NOTIFICATION', (idToSendNotification) => {
      io.emit('RELOAD-NOTIFICATION-FOR', idToSendNotification);
    });

    client.on('SEND_MESSAGE', (data) => { // variables : matcheId, senduserId(qui est l'id de l'user aui envoi le msg), message
      addNewMessageToDatabase(data.matcheId, data.senduserId, data.message);
      io.emit('RECEIVE_MESSAGE', data);
    });

  });

};

export default socketFunction;
