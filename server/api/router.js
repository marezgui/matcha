import express from 'express';

// Pour les users
import usersRoute from './routes/usersroutes';
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

// Pour les likes (EXEMPLE)
// import likesRoute from './routes/likesroutes'
// routerApp.use('/api/likes/', likesRoute)

// pour les etc...

export default routerApp;
