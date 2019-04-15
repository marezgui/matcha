//	Express et utils pour pouvoir promisifier facilememnt
import express from 'express'

//	Passport pour le login/logout -> req.user ref: MAN
import passport from 'passport'
import * as op from '../utils/passport.utils'

//	Sessions false car on ne gere pas les sessions dans les cookies
//	pour le faire supprimer l'option
const checklog = passport.authenticate('jwt', { session: false })

//	Les fonctions que l'ont va utiliser pour les routes user
import * as usersCtrl from '../controllers/usersctrl'

const usersRoute = express.Router()

//	La on est deja dans le chemin de l'api
//	-> /api/users/

usersRoute.route('/')
.get(usersCtrl.getallusers)					//	get all users
.post(usersCtrl.adduser)					//	add a new user return a key for confirm account

usersRoute.route('/confirmkey/:CONFIRMKEY')
.put(usersCtrl.confirmmail)					//	activate account

usersRoute.route("/login")					//	pour ce log avec passport et OBTENIR UN TOKEN
.post(usersCtrl.login);						// Token header : Authorization -> Bearer [token]

usersRoute.route('logout')					//	Pour ce delog
.get(checklog, usersCtrl.logout)			//	utile que si on utilise les sessions

usersRoute.route('/id/:id')
.get(checklog, usersCtrl.getuser)			//	get user informations

usersRoute.route('/me')
.get(checklog, usersCtrl.getme)				//	get user informations of token user
.put(checklog, usersCtrl.edituser)			//	edit user
.delete(checklog, usersCtrl.deluser)		//	delete user



export default usersRoute
