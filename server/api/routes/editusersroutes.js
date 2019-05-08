// Express et utils pour pouvoir promisifier facilememnt
import express from 'express';

// Passport pour le login/logout -> req.user ref: MAN
import passport from 'passport';

// Les fonctions que l'ont va utiliser pour les routes user
import * as usersCtrl from '../controllers/editusersctrl';

// Sessions false car on ne gere pas les sessions dans les cookies
// pour le faire supprimer l'option
const checklog = passport.authenticate('jwt', { session: false });

const editUsersRoute = express.Router();

// La on est deja dans le chemin de l'api
// -> /api/edit/

// Edit Use
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

editUsersRoute.route('/tag')
  .post(checklog, usersCtrl.addtag)
  .delete(checklog, usersCtrl.removetag);

export default editUsersRoute;
