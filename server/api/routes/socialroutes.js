// Express et utils pour pouvoir promisifier facilememnt
import express from 'express';

// Passport pour le login/logout -> req.user ref: MAN
import passport from 'passport';

// Les fonctions que l'ont va utiliser pour les routes user
import * as socialCtrl from '../controllers/socialctrl';

// Sessions false car on ne gere pas les sessions dans les cookies
// pour le faire supprimer l'option
const checklog = passport.authenticate('jwt', { session: false });

const socialRoute = express.Router();

// La on est deja dans le chemin de l'api
// -> /api/social/

socialRoute.route('/getusersforme/:count/:start')
  .get(checklog, socialCtrl.getUsersForMe);


export default socialRoute;
