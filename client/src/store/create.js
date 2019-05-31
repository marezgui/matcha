import { createStore, applyMiddleware, combineReducers, compose, } from 'redux';
import thunk from 'redux-thunk';
import authReducer from './reducers/auth';
import notifReducer from './reducers/notif';

// eslint-disable-next-line no-underscore-dangle
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const rootReducer = combineReducers({
  auth: authReducer,
  notif: notifReducer,
});

const store = createStore(
  rootReducer,
  composeEnhancers(applyMiddleware(thunk)),
);

export default store;
