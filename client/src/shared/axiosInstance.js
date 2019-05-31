import axios from 'axios';
import store from 'store/create';

const state = store.getState();

const authToken = state.auth.token;
const instance = axios.create(
  {
    baseURL: 'http://www.localhost:8080',
    headers: {
      Authorization: `bearer ${authToken}`,
    },
  }
);

export default instance;
