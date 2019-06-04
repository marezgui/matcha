import express from 'express';
import passport from 'passport';
import * as usersCtrl from '../controllers/usersctrl';

const checklog = passport.authenticate('jwt', { session: false });
const usersRoute = express.Router();

//
// ─── LA ON EST DEJA DANS LE CHEMIN DE L API APU/USERS ───────────────────────────
//

usersRoute.route('/add')
  .post(usersCtrl.adduser); // add a new user return a key for confirm account
usersRoute.route('/confirmkey/:CONFIRMKEY')
  .put(usersCtrl.confirmmail); // activate account
usersRoute.route('/forgotpassword/:username')
  .get(usersCtrl.getForgotPasswordKey);
usersRoute.route('/forgotpassword/:FPASSWORDKEY')
  .put(usersCtrl.changePassword);
usersRoute.route('/login') // pour ce log avec passport et OBTENIR UN TOKEN
  .post(usersCtrl.login); // Token header : Authorization -> Bearer [token]
usersRoute.route('/me')
  .get(checklog, usersCtrl.getme) // get user informations of token user
  .delete(checklog, usersCtrl.deluser); // delete user
usersRoute.route('/alltag')
  .get(usersCtrl.getalltag); // affiche tous les tags du site sans doublons pas besoin d'etre log
usersRoute.route('/id/:id')
  .get(checklog, usersCtrl.getuser); // get user informations
usersRoute.route('/usertag/:id')
  .get(checklog, usersCtrl.getusertag); // affiche tous les tags de l'user connecter
usersRoute.route('/userdistance/:id')
  .get(checklog, usersCtrl.getUserDistance); // affiche calcul la distance avec luser connecter

export default usersRoute;
