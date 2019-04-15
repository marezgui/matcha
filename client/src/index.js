import React from 'react';
import ReactDOM from 'react-dom';
import { Route, BrowserRouter, Switch} from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import Auth from './routes/Auth/Auth';
import Profile from './routes/Profile/Profile';
import axios from 'axios'
/*
axios.defaults.baseURL = 'https://jsonplaceholder.typicode.com'
axios.defaults.headers.common['Authorization'] = 'AUTH TOKEN'
axios.defaults.headers.post['Content-Type'] = 'application/json'

axios.interceptors.request.use(req => {
    console.log(req)
    // config
    return req
}, error => {
    console.log(error)
    return Promise.reject(error)
})

axios.interceptors.response.use(res => {
    console.log(res)
    // config
    return res
}, error => {
    console.log(error)
    return Promise.reject(error)
})
*/

ReactDOM.render(
    <BrowserRouter>
        <Switch>
            <Route exact path="/" component={Auth} />
            <Route path="/register" component={Auth} />
            <Route path="/profile" component={Profile}/>
            <Route render={() => <h1>Not Found</h1>}/> {/*Cant be a component*/}
        </Switch>
    </BrowserRouter>, 
  document.getElementById('root'));