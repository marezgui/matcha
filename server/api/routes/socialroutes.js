import express from 'express';
import passport from 'passport';
import * as socialCtrl from '../controllers/socialctrl';

const checklog = passport.authenticate('jwt', { session: false });
const socialRoute = express.Router();

//
// ─── LA ON EST DEJA DANS LE CHEMIN DE L API API/SOCIAL ──────────────────────────
//

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
socialRoute.route('/getallusermatche/') // renvoi in tableau de tous les matche avec l'user en cours
  .get(checklog, socialCtrl.getAllUserMatche);
socialRoute.route('/getusersforme/:count/:start') // count est le nombre d user voulu et start le nombre a partir du quel chercher
  .post(checklog, socialCtrl.getUsersForMe);
socialRoute.route('/getblockedlist/') // renvoi la liste des bocked
  .get(checklog, socialCtrl.getUserBlockedList);
socialRoute.route('/getusersvar/') // renvoi les var pour la recherche
  .get(checklog, socialCtrl.getUserAgeDistanceScoreReport);

export default socialRoute;
