import express from 'express';

// Pour les users
import usersRoute from './routes/usersroutes';
// import socialRoute from './routes/socialroutes';
import editUsersRoute from './routes/editusersroutes';

const routerApp = express.Router();

// Pour l'index
routerApp.route('/') // la racine
  .all((req, res) => { // on peux mettre le man ici
    res.json({ message: 'Welcome to --- MATCHA -- ',
      methode: `you are using ${req.method} methode` });
  });

routerApp.use('/api/users/', usersRoute);
routerApp.use('/api/edit/', editUsersRoute);
// routerApp.use('/api/social/', socialRoute);
// a l'interieur de social il ya les likes / matches / report / score

export default routerApp;
