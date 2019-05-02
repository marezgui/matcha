import * as actionTypes from './actionTypes';
import axios from 'axios';

export const authStart = () => {
    return {
        type: actionTypes.AUTH_START
    };
};

export const authSuccess = (token, userId) => {
    return {
        type: actionTypes.AUTH_SUCCESS,
        token,
        userId
    }
}

export const authFail = (error) => {
    return {
        type: actionTypes.AUTH_FAIL,
        error
    }
}

export const logout = () => {
    localStorage.removeItem('token');
    return {
        type: actionTypes.AUTH_LOGOUT
    }
}

export const auth = (email, password) => {
    return (dispatch) => {
        dispatch(authStart());

        axios.post('users/login', {email, password})
        .then((response) => {
            localStorage.setItem('token', response.data.token);
            dispatch(authSuccess(response.data.token, 13)); //Change userId
            console.log("Connected", response.data)
        })
        .catch((err) => {
            dispatch(authFail(err.response.data)); // data.error{}
        });
    }
}


export const authCheckState = () => {
    return (dispatch) => {
        const token = localStorage.getItem('token');

        if (!token) {
            dispatch(logout());
        } else {
            const userId = localStorage.getItem('userId');
            dispatch(authSuccess(token, userId));
        }
    }
}