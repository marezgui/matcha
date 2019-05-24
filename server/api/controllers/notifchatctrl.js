import util from 'util';
import sendmail from '../utils/mail.utils';
import * as mod from '../models/notifchatmod';
import { getAllUserMatche, getuserbyIdUser } from '../models/socialmod';

//
// ─── FUNCTION SENDNOTIFICATION ON MAIL ──────────────────────────────────────────
//
const sendmailnotif = (typeNotif, mail) => {
  if (typeNotif === 'VUE') {
    sendmail(mail,
      'Matcha New Notification',
      'Your profile has been visited by one (or more) other user. To know more log in to Matcha.',
      'Your profile has been visited by one (or more) other user. To know more log in to Matcha.');
  } else if (typeNotif === 'LIKE') {
    sendmail(mail,
      'Matcha New Notification',
      'one (or more) user like you. To know more log in to Matcha.',
      'one (or more) user like you. To know more log in to Matcha.');
  } else if (typeNotif === 'UNLIKE') {
    sendmail(mail,
      'Matcha New Notification',
      'one (or more) user unlike you (this has the effect of deleting your matche if you have one). To know more log in to Matcha.',
      'one (or more) user unlike you (this has the effect of deleting your matche if you have one). To know more log in to Matcha.');
  } else if (typeNotif === 'MATCHE') {
    sendmail(mail,
      'Matcha New Notification',
      'You have one (or more) new matche. To know more log in to Matcha.',
      'You have one (or more) new matche. To know more log in to Matcha.');
  } else if (typeNotif === 'NEWMESSAGE') {
    sendmail(mail,
      'Matcha New Notification',
      'You have one (or more) new message. To know more log in to Matcha.',
      'You have one (or more) new message. To know more log in to Matcha.');
  } else if (typeNotif === 'OTHER') {
    sendmail(mail,
      'Matcha New Notification',
      'You have one (or more) new notification. To know more log in to Matcha.',
      'You have one (or more) new notification. To know more log in to Matcha.');
  }
};

//
// ─── GET ALL NOTIFICATIONS ──────────────────────────────────────────────────────
//
export const getAllNotif = async (req, res) => {
  const { user } = req;
  const ResGetAllNotif = util.promisify(mod.getAllNotif);
  const resultNotif = await ResGetAllNotif(user.idUser).then(data => data).catch((err) => { console.log(`[Error]: ${err}`); });
  const result = [];
  for (let i = 0; i < resultNotif.length; i += 1) {
    result[i] = [];
    result[i].push(Number(resultNotif[i].idNotification));
    result[i].push(Number(resultNotif[i].userId));
    result[i].push(Number(resultNotif[i].userIdSender));
    result[i].push(resultNotif[i].vue);
    result[i].push(resultNotif[i].type);
    result[i].push(resultNotif[i].message);
  }
  res.status(200).json({ resultNotif: result });
};

//
// ─── GET ALL MESSAGE OF A USER ──────────────────────────────────────────────────
//
export const getAllMessage = async (req, res) => {
  const { user } = req;
  const getUserMatche = util.promisify(getAllUserMatche);
  const resultMatche = await getUserMatche(user.idUser).then(data => data).catch((err) => { console.log(`[Error]: ${err}`); });
  const result = [];
  const message = [];
  for (let i = 0; i < resultMatche.length; i += 1) {
    result.push(Number(resultMatche[i].idMatche));
  }
  const getAllMessageOfMatch = util.promisify(mod.getAllMessageOfMatch);
  for (let i = 0; i < result.length; i += 1) {
    const resultMessage = await getAllMessageOfMatch(result[i]).then(data => data).catch((err) => { console.log(`[Error]: ${err}`); });
    message[i] = [];
    message[i].push(result[i]);
    message[i].push(resultMessage);
  }
  res.status(200).json({ resultMessage: message });
};

//
// ─── GET ALL THE MESSAGE OF A MATCH CONVERSATION ────────────────────────────────
//
export const getMessageOfMatche = async (req, res) => {
  const matche = Number(req.params.id);
  if (isNaN(matche)) {
    res.status(400).json({ error: 'matche must be a number' });
  }
  const getAllMessageOfMatch = util.promisify(mod.getAllMessageOfMatch);
  const resultMessage = await getAllMessageOfMatch(matche).then(data => data).catch((err) => { console.log(`[Error]: ${err}`); });
  res.status(200).json({ resultMessage });
};

//
// ─── SEND NOTIFICATION NEW MESSAGE ──────────────────────────────────────────────
//
const sendNotifNewMessage = async (matcheId, sendUserId) => {
  const getsdmatchid = util.promisify(mod.getSecondMatcheId);
  const idUser = await getsdmatchid(matcheId, sendUserId).then(data => data).catch((err) => { console.log(`[Error]: ${err}`); });
  const getuser = util.promisify(getuserbyIdUser);
  const resultuser = await getuser(idUser).then(data => data).catch((err) => { console.log(`[Error]: ${err}`); });
  if (resultuser.notifications === true) {
    const getnotifmail = util.promisify(mod.notifStatusMail);
    const sendmailval = await getnotifmail(resultuser.idUser, 'NEWMESSAGE').then(data => data).catch((err) => { console.log(`[Error]: ${err}`); });
    if (sendmailval === true) { sendmailnotif('NEWMESSAGE', resultuser.mail); }
  }
  mod.addNotif(resultuser.idUser, sendUserId, 'NEWMESSAGE', 'You have a new message', (err, success) => {
    if (err) { console.log(err); }
    if (success) { console.log(success); }
  });
};

//
// ─── LIKE NOTIF ─────────────────────────────────────────────────────────────────
//
export const likeNotif = async (idSend, id2) => {
  const getuser = util.promisify(getuserbyIdUser);
  const sender = await getuser(idSend).then(data => data).catch((err) => { console.log(`[Error]: ${err}`); });
  const user2 = await getuser(id2).then(data => data).catch((err) => { console.log(`[Error]: ${err}`); });
  if (user2.notifications === true) {
    const getnotifmail = util.promisify(mod.notifStatusMail);
    const sendmailval = await getnotifmail(user2.idUser, 'LIKE').then(data => data).catch((err) => { console.log(`[Error]: ${err}`); });
    if (sendmailval === true) { sendmailnotif('LIKE', user2.mail); }
  }
  mod.addNotif(user2.idUser, sender.idUser, 'LIKE', `${sender.firstName} have like you`, (err, success) => {
    if (err) { console.log(err); }
    if (success) { console.log(success); }
  });
};

//
// ─── UNLIKE NOTIF ───────────────────────────────────────────────────────────────
//
export const unlikeNotif = async (idSend, id2) => {
  const getuser = util.promisify(getuserbyIdUser);
  const sender = await getuser(idSend).then(data => data).catch((err) => { console.log(`[Error]: ${err}`); });
  const user2 = await getuser(id2).then(data => data).catch((err) => { console.log(`[Error]: ${err}`); });
  if (user2.notifications === true) {
    const getnotifmail = util.promisify(mod.notifStatusMail);
    const sendmailval = await getnotifmail(user2.idUser, 'UNLIKE').then(data => data).catch((err) => { console.log(`[Error]: ${err}`); });
    if (sendmailval === true) { sendmailnotif('UNLIKE', user2.mail); }
  }
  mod.addNotif(user2.idUser, sender.idUser, 'UNLIKE', `${sender.firstName} have unlike you`, (err, success) => {
    if (err) { console.log(err); }
    if (success) { console.log(success); }
  });
};

//
// ─── MATCH NOTIF ────────────────────────────────────────────────────────────────
//
export const matcheNotif = async (idSend, id2) => {
  const getuser = util.promisify(getuserbyIdUser);
  const sender = await getuser(idSend).then(data => data).catch((err) => { console.log(`[Error]: ${err}`); });
  const user2 = await getuser(id2).then(data => data).catch((err) => { console.log(`[Error]: ${err}`); });
  if (user2.notifications === true) {
    const getnotifmail = util.promisify(mod.notifStatusMail);
    const sendmailval = await getnotifmail(user2.idUser, 'MATCHE').then(data => data).catch((err) => { console.log(`[Error]: ${err}`); });
    if (sendmailval === true) { sendmailnotif('MATCHE', user2.mail); }
  }
  mod.addNotif(user2.idUser, sender.idUser, 'MATCHE', `${sender.firstName} have matche with you`, (err, success) => {
    if (err) { console.log(err); }
    if (success) { console.log(success); }
  });
  if (sender.notifications === true) {
    const getnotifmail = util.promisify(mod.notifStatusMail);
    const sendmailval = await getnotifmail(sender.idUser, 'MATCHE').then(data => data).catch((err) => { console.log(`[Error]: ${err}`); });
    if (sendmailval === true) { sendmailnotif('MATCHE', sender.mail); }
  }
  mod.addNotif(sender.idUser, user2.idUser, 'MATCHE', `${user2.firstName} have matche with you`, (err, success) => {
    if (err) { console.log(err); }
    if (success) { console.log(success); }
  });
};

//
// ─── FUNCTION ADD A NEW MESSAGE TO DATABASE ─────────────────────────────────────
//
export const addNewMessageToDatabase = async (matcheId, sendUserId, message) => {
  mod.addMessageToDatabase(matcheId, sendUserId, message, (err, success) => {
    if (err) { console.log(err); }
    if (success) { console.log(success); }
  });
  sendNotifNewMessage(matcheId, sendUserId);
};

//
// ─── FUNCTION QUI SET TOUTES LES NOTIFS A VUE ───────────────────────────────────
//
export const getNotifAtVue = (req, res) => {
  const { user } = req;
  mod.getNotifVue(user.idUser, (err, success) => {
    if (err) { return res.status(400).json({ error: 'error' }); }
    return res.status(200).json({ message: `ok${success}` });
  });
};

//
// ─── FONCTION NOTIF VUE ─────────────────────────────────────────────────────────
//
export const notifVue = async (req, res) => {
  const { user } = req;
  if (req.user.userIsComplete === false) {
    res.status(400).json({ error: 'Complete your profile first.' });
    return;
  }
  const idUser = Number(req.params.id);
  if (isNaN(idUser)) {
    res.status(400).json({ error: 'Id must be a number' });
    return;
  }
  const userexist = util.promisify(mod.testUserId);
  const resultexist = await userexist(idUser).then(data => data).catch((err) => { console.log(`[Error]: ${err}`); });
  if (resultexist === false) {
    res.status(400).json({ error: 'User dosnt exist' });
    return;
  }
  const getuser = util.promisify(getuserbyIdUser);
  const resultuser = await getuser(idUser).then(data => data).catch((err) => { console.log(`[Error]: ${err}`); });
  if (resultuser.notifications === true) {
    const getnotifmail = util.promisify(mod.notifStatusMail);
    const sendmailval = await getnotifmail(resultuser.idUser, 'VUE').then(data => data).catch((err) => { console.log(`[Error]: ${err}`); });
    if (sendmailval === true) { sendmailnotif('VUE', resultuser.mail); }
  }
  mod.addNotif(resultuser.idUser, user.idUser, 'VUE', `${user.firstName} visited your profile`, (err, success) => {
    if (err) { return res.status(400).json({ error: 'error' }); }
    return res.status(200).json({ message: `ok${success}` });
  });
};
