// Express et utils pour pouvoir promisifier facilememnt
import express from 'express';

// Passport pour le login/logout -> req.user ref: MAN
import passport from 'passport';

// Les fonctions que l'ont va utiliser pour les routes user
import * as usersCtrl from '../controllers/usersctrl';

// Sessions false car on ne gere pas les sessions dans les cookies
// pour le faire supprimer l'option
const checklog = passport.authenticate('jwt', { session: false });

const usersRoute = express.Router();

// La on est deja dans le chemin de l'api
// -> /api/users/

usersRoute.route('/')
  .get(usersCtrl.getallusers) // get all users
  .post(usersCtrl.adduser); // add a new user return a key for confirm account

usersRoute.route('/confirmkey/:CONFIRMKEY')
  .put(usersCtrl.confirmmail); // activate account

usersRoute.route('/login') // pour ce log avec passport et OBTENIR UN TOKEN
  .post(usersCtrl.login); // Token header : Authorization -> Bearer [token]
// pas besoin de fonciton de logout avec redux

usersRoute.route('/id/:id')
  .get(checklog, usersCtrl.getuser); // get user informations

usersRoute.route('/me')
  .get(checklog, usersCtrl.getme) // get user informations of token user
  .delete(checklog, usersCtrl.deluser); // delete user

// Edit Use
usersRoute.route('/edit/mail')
  .put(checklog, usersCtrl.edituserMail);
usersRoute.route('/edit/username')
  .put(checklog, usersCtrl.edituserUsername);
usersRoute.route('/edit/password')
  .put(checklog, usersCtrl.edituserPassword);
usersRoute.route('/edit/firstName')
  .put(checklog, usersCtrl.edituserFirstName);
usersRoute.route('/edit/lastName')
  .put(checklog, usersCtrl.edituserLastName);
usersRoute.route('/edit/bio')
  .put(checklog, usersCtrl.edituserBio);
usersRoute.route('/edit/genre')
  .put(checklog, usersCtrl.edituserGenre);
usersRoute.route('/edit/orientation')
  .put(checklog, usersCtrl.edituserOrientation);
usersRoute.route('/edit/dateOfBirth')
  .put(checklog, usersCtrl.edituserDateOfBirth);

export default usersRoute;
