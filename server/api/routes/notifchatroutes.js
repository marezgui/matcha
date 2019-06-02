import express from 'express';
import passport from 'passport';
import * as notifchatCtrl from '../controllers/notifchatctrl';

const checklog = passport.authenticate('jwt', { session: false });
const notifchatRoute = express.Router();

//
// ─── LA ON EST DEJA DANS LE CHEMIN DE L API API/NOTIFCHAT ───────────────────────
//

notifchatRoute.route('/getmesageofmatche/:MATCHEID')
  .get(checklog, notifchatCtrl.getMessageOfMatche);
notifchatRoute.route('/getallmesage/')
  .get(checklog, notifchatCtrl.getAllMessage);
notifchatRoute.route('/getallnotif/')
  .get(checklog, notifchatCtrl.getAllNotif);
notifchatRoute.route('/delnotif/')
  .delete(checklog, notifchatCtrl.delNotif);
notifchatRoute.route('/getnotifvue/:TYPE')
  .get(checklog, notifchatCtrl.getNotifAtVue);
notifchatRoute.route('/notifvue/:id') // permet d'envoyer une notif a une second user si son profil a ete vu
  .get(checklog, notifchatCtrl.notifVue);

export default notifchatRoute;
