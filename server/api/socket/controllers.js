import { addNewMessageToDatabase } from '../controllers/notifchatctrl';

const socketFunction = (io) => {

  io.on('connection', (client) => {
    let idUser;
    client.on('USER-LOGIN', (data) => {
      idUser = data.userId;
      io.emit('USER-IS-LOGIN', idUser, true); // besoin de userId
    });

    client.on('SEND_MESSAGE', (data) => { // variables : matcheId, senduserId(qui est l'id de l'user aui envoi le msg), message
      addNewMessageToDatabase(data.matcheId, data.senduserId, data.message);
      io.emit('RECEIVE_MESSAGE', data);
    });

    client.on('disconnect', () => {
      io.emit('USER-IS-LOGIN', idUser, false);
    });
  });

};

export default socketFunction;
