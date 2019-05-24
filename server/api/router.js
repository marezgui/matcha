import express from 'express';
import usersRoute from './routes/usersroutes';
import socialRoute from './routes/socialroutes';
import editUsersRoute from './routes/editusersroutes';
import notifchatRoute from './routes/notifchatroutes';

const routerApp = express.Router();

routerApp.route('/')
  .all((req, res) => {
    res.json({ message: 'Welcome to --- MATCHA -- ',
      methode: `you are using ${req.method} methode` });
  });

routerApp.use('/api/users/', usersRoute);
routerApp.use('/api/edit/', editUsersRoute);
routerApp.use('/api/social/', socialRoute);
routerApp.use('/api/notifchat/', notifchatRoute);

export default routerApp;
