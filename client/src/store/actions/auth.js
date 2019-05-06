import * as actionTypes from './actionTypes';
import axios from 'axios';

export const authStart = () => {
    return {
        type: actionTypes.AUTH_START
    };
};

export const authSuccess = (token, user) => {
    return {
        type: actionTypes.AUTH_SUCCESS,
        token,
        user
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
        .then(async (res) => {
            let token = res.data.token;
            let user = await getUser(token);

            console.log(user)

            if (user) {
                localStorage.setItem('token', token);
                dispatch(authSuccess(token, user));
            } else {
                dispatch(authFail({message: "Can't get user informations, please try later."}))
            }
        })
        .catch((err) => {
            dispatch(authFail(err.response.data)); // data.error{}
        });
    }
}


const getUser = async (token) => {
    let user = false;

    await axios.get('users/me', { headers: { 'Authorization': `bearer ${token}` }})
    .then((res) => {
        user = res.data;
    })
    .catch((err) => {
        user = false;
    })

    return user;
}

export const authCheckState = () => {
    return async (dispatch) => {
        const token = localStorage.getItem('token');

        if (!token) {
            dispatch(logout());
        } else {
            const user = await getUser(token);
            
            if (!user) {
                dispatch(logout());
            } else {
                dispatch(authSuccess(token, user));
            }
        }
    }
}