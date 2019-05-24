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
notifchatRoute.route('/getnotifvue/')
  .get(checklog, notifchatCtrl.getNotifAtVue);
notifchatRoute.route('/notifvue/:id')
  .get(checklog, notifchatCtrl.notifVue);

export default notifchatRoute;
