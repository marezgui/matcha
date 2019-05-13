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

socialRoute.route('/like/:id')
  .post(checklog, socialCtrl.like)
  .delete(checklog, socialCtrl.unLike);

socialRoute.route('/report/:id')
  .post(checklog, socialCtrl.reportUser)
  .delete(checklog, socialCtrl.unReportUser);

socialRoute.route('/block/:id')
  .post(checklog, socialCtrl.blockUser)
  .delete(checklog, socialCtrl.unBlockUser);

socialRoute.route('/getuserblocked/:id') // renvoi true or false si l'user est bloquer ou pas
  .get(checklog, socialCtrl.getUserBlocked);

socialRoute.route('/getuserliked/:id') // renvoi true or false si l'user est liker ou pas
  .get(checklog, socialCtrl.getUserLiked);

socialRoute.route('/getuserreported/:id') // renvoi true or false si l'user est report ou pas
  .get(checklog, socialCtrl.getUserReported);

socialRoute.route('/getusermatche/:id') // renvoi true or false si l'user est en matche ou pas
  .get(checklog, socialCtrl.getUserMatche);

socialRoute.route('/getusersforme/:count/:start')
  .get(checklog, socialCtrl.getUsersForMe);

export default socialRoute;
