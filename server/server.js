import http from 'http';
import express from 'express';
import bodyParser from 'body-parser';
import passport from 'passport';
import dotenv from 'dotenv';
import socket from 'socket.io';
import { db } from './database';
import importuser from './database/importuser';
import routerApp from './api/router';
import socketFunction from './api/socket/controllers';

dotenv.load();

const PORT = process.env.PORT || 8080;
const app = express();
const server = http.createServer(app);
const io = socket(server);

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(passport.initialize());
app.use(routerApp);
socketFunction(io); // fonction socket.io

server.listen(PORT, () => { console.log(`Server listening on port ${PORT}!`); });

db.query('SELECT NOW()', (err, res) => {
  if (err.error) { return console.log(err.error); }
  console.log(`PostgreSQL connected: ${res[0].now}.`);
  return res[0].now;
});

db.query('SELECT * FROM users', (err, res) => {
  if (err.error) { console.log(err.error); return; }
  if (res[500] === undefined) {
    console.log('La bdd est vide on va charger des users');
    importuser(1000);
  }
});

export default app;
