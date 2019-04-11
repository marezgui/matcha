import express from 'express'

//liste des routes
import * as usersCtrl from './routes/usersctrl'

//fonction router
const router = () => {

	const routerApp = express.Router()			// le router

	////////////////////
	// INDEX
	////////////////////

	routerApp.route('/')						// la racine
	.all(function(req,res){						// on peux mettre le man ici
												// all permet de prendre en charge toutes les méthodes.
		  res.json({message : "Welcome to --- MATCHA -- ",
					methode : "you are using " + req.method + " methode"});
		});


	////////////////////
	// USERS
	////////////////////

	routerApp.route('/api/users')
	.get(usersCtrl.getallusers)					// get all users
	.post(usersCtrl.adduser)					// add a new user return a key for confirm account

	routerApp.route('/api/users/confirmkey/:CONFIRMKEY')
	.put(usersCtrl.confirmmail)				// activate account

	routerApp.route('/api/users/:id')
	.get(usersCtrl.getuser)					// get user informations

	routerApp.route('/api/users/me')
	.get(usersCtrl.getme)					// get user informations of token user

	routerApp.route('/api/users/login')
	.post(usersCtrl.login)						//for login and get an user token

	routerApp.route('/api/users/:USER_TOKEN')
	.put(usersCtrl.edituser)					// edit user
	.delete(usersCtrl.deluser)					// delete user



		// ETC ....

	////////////////////
	// LIKES
	////////////////////

	////////////////////
	// CHAT
	////////////////////

	////////////////////
	// MATCHES
	////////////////////

	return routerApp;
}

export default router
