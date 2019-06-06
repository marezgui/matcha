import express from 'express';
import passport from 'passport';
import * as usersCtrl from '../controllers/editusersctrl';

const checklog = passport.authenticate('jwt', { session: false });
const editUsersRoute = express.Router();

//
// ─── LA ON EST DEJA DANS LE CHEMIN DE L API  API/EDIT ───────────────────────────
//

editUsersRoute.route('/mail')
  .put(checklog, usersCtrl.edituserMail);
editUsersRoute.route('/username')
  .put(checklog, usersCtrl.edituserUsername);
editUsersRoute.route('/password')
  .put(checklog, usersCtrl.edituserPassword);
editUsersRoute.route('/firstName')
  .put(checklog, usersCtrl.edituserFirstName);
editUsersRoute.route('/lastName')
  .put(checklog, usersCtrl.edituserLastName);
editUsersRoute.route('/bio')
  .put(checklog, usersCtrl.edituserBio);
editUsersRoute.route('/genre')
  .put(checklog, usersCtrl.edituserGenre);
editUsersRoute.route('/orientation')
  .put(checklog, usersCtrl.edituserOrientation);
editUsersRoute.route('/dateOfBirth')
  .put(checklog, usersCtrl.edituserDateOfBirth);
editUsersRoute.route('/photo')
  .put(checklog, usersCtrl.edituserPhoto);
editUsersRoute.route('/location')
  .put(checklog, usersCtrl.edituserLocation);
editUsersRoute.route('/notif')
  .put(checklog, usersCtrl.edituserNotif);
editUsersRoute.route('/tag')
  .post(checklog, usersCtrl.addtag)
  .delete(checklog, usersCtrl.removetag);
editUsersRoute.route('/useriscomplete') // check si userIsComplete et set la variable userIsComplete a  true or false
  .get(checklog, usersCtrl.checkUserIsComplete);

export default
editUsersRoute;
