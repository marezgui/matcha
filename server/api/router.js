import express from 'express'
const routerApp = express.Router()

//Pour l'index
routerApp.route('/')						// la racine
.all(function(req,res){						// on peux mettre le man ici
	res.json({message : "Welcome to --- MATCHA -- ",
				methode : "you are using " + req.method + " methode"});
});

//Pour les users
	import usersRoute from './routes/usersroutes'
	routerApp.use('/api/users/', usersRoute)

//	Pour les likes (EXEMPLE)
//	import likesRoute from './routes/likesroutes'
//	routerApp.use('/api/likes/', likesRoute)

//pour les etc...

export default routerApp