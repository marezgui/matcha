import React from 'react';
import ReactDOM from 'react-dom';
import { Route, BrowserRouter as Router } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import './styles/index.css';

import Index from './routes/index';
import Profile from './routes/profile';



const routing = (
  <Router>
    <div>
      <Route exact path="/" component={Index} />
      <Route path="/sign-up" component={Index} />
      <Route path="/profile" component={Profile}/>
    </div>
  </Router>
)

ReactDOM.render(routing, document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: http://bit.ly/CRA-PWA
// serviceWorker.unregister();