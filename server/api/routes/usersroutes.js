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

// usersRoute.route('/all')
//  .get(usersCtrl.getallusers);// on l'enleve apres avoir tester car dangereux

usersRoute.route('/add')
  .post(usersCtrl.adduser); // add a new user return a key for confirm account

usersRoute.route('/confirmkey/:CONFIRMKEY')
  .put(usersCtrl.confirmmail); // activate account

usersRoute.route('/login') // pour ce log avec passport et OBTENIR UN TOKEN
  .post(usersCtrl.login); // Token header : Authorization -> Bearer [token]
// pas besoin de fonciton de logout avec redux


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
  .get(checklog, usersCtrl.getUserDistance); // affiche tous les tags de l'user connecter

export default usersRoute;
