import express from 'express'
import bodyParser from 'body-parser'
import { db } from './database'
import dotenv from 'dotenv'

dotenv.load()

const	ENV = process.env.NODE_ENV;
const	PORT = process.env.PORT || 8080;
const	server = express();

server.use(express.json());
server.use(express.urlencoded({extended: true}));
server.use(bodyParser.json());


// dans ce fichier on va mettre toutes les routes
import router from './api/router'

server.use(router());

server.listen(PORT, () => { console.log(`Server listening on port ${PORT}!`); });

db.query('SELECT NOW()', (err, res) => {
	if (err.error)
    	return console.log(err.error);
	console.log(`PostgreSQL connected: ${res[0].now}.`);
});

export default server