import React from 'react';
import ReactDOM from 'react-dom';
import {BrowserRouter} from 'react-router-dom';
import { Provider } from 'react-redux'
import { createStore, applyMiddleware, combineReducers, compose} from 'redux';
import thunk from 'redux-thunk'
import authReducer from './store/reducers/auth'
import App from './App';
import 'bootstrap/dist/css/bootstrap.min.css';

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
 
const rootReducer = combineReducers({
    auth: authReducer
})

const store = createStore(rootReducer, composeEnhancers(
    applyMiddleware(thunk)
));

ReactDOM.render(
    <Provider store={store}>
        <BrowserRouter>
            <App/>
        </BrowserRouter>
    </Provider>, 
  document.getElementById('root')
);
