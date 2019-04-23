import express from 'express'
import bodyParser from 'body-parser'
import passport from 'passport'
import { db } from './database'
import dotenv from 'dotenv'

/*
	Utile que si on veux gerer les sessions
	import cookiesession from 'cookie-session'
*/

dotenv.load()

const	ENV = process.env.NODE_ENV;
const	PORT = process.env.PORT || 8080;
const	server = express();

/*
	Si vous voulez tester les mails :
	import sendmail from './api/utils/mail.utils'
	sendmail('ton mail', 'sujet', 'mail format txt', '<strong>mail format html</strong>')
*/

/*
	//	Utile que si on veux gerer les sessions
	//	cette fonction va cree un cookie apres les ide de l'user

server.use(cookiesession({
	name: "Matcha-cookie",
	maxAge: 24 * 60 * 60 * 1000,
	keys: ["process.env.COOKIEKEY"], // La cle du cookie est dans le .env
	httpOnly: true,
	sameSite: 'lax'
	//	secure: true	// Ne marche que si https
}))
*/

server.use(express.json());
server.use(express.urlencoded({extended: true}));
server.use(bodyParser.json());

server.use(passport.initialize());

/*
	//	Utile que si on veux gerer les sessions

	server.use(passport.session());

	//	L'ordre des fonctions est important,
	//	on utilise session apres avoir initiliser passport
*/

//	Lien des routes
import routerApp from './api/router'
server.use(routerApp);

server.listen(PORT, () => { console.log(`Server listening on port ${PORT}!`); });

db.query('SELECT NOW()', (err, res) => {
	if (err.error)
    	return console.log(err.error);
	console.log(`PostgreSQL connected: ${res[0].now}.`);
});

export default server