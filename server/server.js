import express from 'express';
import bodyParser from 'body-parser';
import passport from 'passport';
import dotenv from 'dotenv';
import { db } from './database';

// Lien des routes
import routerApp from './api/router';

dotenv.load();

const PORT = process.env.PORT || 8080;
const server = express();

/*
 Si vous voulez tester les mails :
 import sendmail from './api/utils/mail.utils'
 sendmail('ton mail', 'sujet', 'mail format txt', '<strong>mail format html</strong>')
*/

server.use(express.json());
server.use(express.urlencoded({ extended: true }));
server.use(bodyParser.json());

server.use(passport.initialize());

server.use(routerApp);

server.listen(PORT, () => { console.log(`Server listening on port ${PORT}!`); });

db.query('SELECT NOW()', (err, res) => {
  if (err.error) { return console.log(err.error); }
  console.log(`PostgreSQL connected: ${res[0].now}.`);
  return res[0].now;
});

export default server;
