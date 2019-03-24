import express from 'express'
import bodyParser from 'body-parser'
import { db } from './database'
import usersRoutes from './api/users'
import dotenv from 'dotenv'

dotenv.load()

const	ENV = process.env.NODE_ENV;
const	PORT = process.env.PORT || 8080;
const	app = express();

app.use(express.json());
app.use(express.urlencoded({extended: false}));
app.use(bodyParser.json());

app.use('/api/users', usersRoutes);

app.listen(PORT, () => { console.log(`Server listening on port ${PORT}!`); });

db.query('SELECT NOW()', (err, res) => {
	if (err.error)
    	return console.log(err.error);
	console.log(`PostgreSQL connected: ${res[0].now}.`);
});

export default app