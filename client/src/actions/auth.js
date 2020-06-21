import axios from 'axios';
import { setAlert } from './alert';
import {
    REGISTER_SUCCESS,
    REGISTER_FAIL,
    USER_LOADED,
    AUTH_ERROR,
    LOGIN_SUCCESS,
    LOGIN_FAIL,
    LOGOUT,
    CLEAR_PROFILE,
    CLEAR_GATHERINGS,
    CLEAR_HATHERINGS,
    CLEAR_SERVANTS,
    CLEAR_PEOPLE,
    CLEAR_USER_AUTH,
    SET_USER_AUTH,
    CLEAR_CLIENT_USERS,
} from './types';
import setAuthToken from '../utils/setAuthToken';

// Load User
export const loadUser = () => async (dispatch) => {
    if (localStorage.token) {
        setAuthToken(localStorage.token);
    }
    try {
        const res = await axios.get('/api/auth');
        dispatch({
            type: USER_LOADED,
            payload: res.data,
        });
        dispatch(setUserAuth(res.data.defaultClient, res.data._id));
    } catch (err) {
        dispatch({
            type: AUTH_ERROR,
        });
    }
};

// SET USER AUTH
export const setUserAuth = (client, uid) => async (dispatch) => {
    const config = {
        headers: {
            'Content-Type': 'application/json',
        },
    };
    const body = JSON.stringify({ client, uid });

    try {
        const res = await axios.put('/api/meeter/setUserAuth', body, config);
        // res should now have activeClient, activeRole, and activeStatus
        // console.log('@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@');
        // console.log(' inside client::src::actions::auth::setUserAuth');

        dispatch({
            type: SET_USER_AUTH,
            payload: res.data,
        });
    } catch (err) {
        dispatch({
            type: AUTH_ERROR,
        });
    }
};

// Register User
export const register = ({ name, email, password, defaultClient }) => async (
    dispatch
) => {
    const config = {
        headers: {
            'Content-Type': 'application/json',
        },
    };
    const body = JSON.stringify({ name, email, password, defaultClient });

    try {
        const res = await axios.post('/api/users', body, config);
        dispatch({
            type: REGISTER_SUCCESS,
            payload: res.data,
        });

        dispatch(loadUser());
    } catch (err) {
        const errors = err.response.data.errors;

        if (errors) {
            errors.forEach((error) => dispatch(setAlert(error.msg, 'danger')));
        }

        dispatch({
            type: REGISTER_FAIL,
        });
    }
};

// Login User
export const login = (email, password) => async (dispatch) => {
    const config = {
        headers: {
            'Content-Type': 'application/json',
        },
    };

    const body = JSON.stringify({ email, password });

    try {
        const res = await axios.post('/api/auth', body, config);

        dispatch({
            type: LOGIN_SUCCESS,
            payload: res.data,
        });

        dispatch(loadUser());
    } catch (err) {
        const errors = err.response.data.errors;

        if (errors) {
            errors.forEach((error) => dispatch(setAlert(error.msg, 'danger')));
        }

        dispatch({
            type: LOGIN_FAIL,
        });
    }
};

// Logout / Clear Profile
export const logout = () => (dispatch) => {
    dispatch({ type: CLEAR_PROFILE });
    dispatch({ type: CLEAR_GATHERINGS });
    dispatch({ type: CLEAR_HATHERINGS });
    dispatch({ type: CLEAR_SERVANTS });
    dispatch({ type: CLEAR_PEOPLE });
    dispatch({ type: CLEAR_USER_AUTH });
    dispatch({ type: CLEAR_CLIENT_USERS });
    dispatch({ type: LOGOUT });
};
