import { createStore, applyMiddleware } from 'redux';

import rootReducer from '../reducers';

const configureStore = () => {
  return {
    ...createStore(rootReducer)
  }
};

export default configureStore;