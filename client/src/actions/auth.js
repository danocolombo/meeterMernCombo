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
    CLEAR_GROUP,
    CLEAR_PEOPLE,
    CLEAR_SERVANTS,
    CLEAR_USER_AUTH,
    SET_USER_AUTH,
} from './types';
import setAuthToken from '../utils/setAuthToken';

// Load User
export const loadUser = () => async (dispatch) => {
    if (localStorage.token) {
        setAuthToken(localStorage.token);
    }

    try {
        const res = await axios.get('/api/auth');
        // console.log('@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@');
        // console.log(' before USER_LOADED');
        // console.log('res.data: ' + JSON.stringify(res));
        // console.log('maybe: ' + res.data.activeClient);
        // console.log('@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@');
        // const { activeClient, _id } = res.body;
        // console.log('activeClient: ' + activeClient);
        // console.log('_id: ' + _id);
        // console.log('==================================');
        dispatch({
            type: USER_LOADED,
            payload: res.data,
        });
        //==========================================
        // now would be good spot to SET_USER_AUTH
        //==========================================
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
    // console.log('@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@');
    // console.log(' inside client::src::actions::auth::setUserAuth');
    // // console.log('client: ' + client);
    // // console.log('uid: ' + uid);
    // console.log('body: ' + body);
    // // console.log('maybe: ' + res.data.activeClient);
    // console.log('@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@');
    try {
        const res = await axios.put('/api/meeter/setUserAuth', body, config);
        // res should now have activeClient, activeRole, and activeStatus
        // console.log('@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@');
        // console.log(' inside client::src::actions::auth::setUserAuth');
        // console.log('back from api/meeter/setUserAuth');
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
        console.log('@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@');
        console.log(' before REGISTER_SUCCESS');
        console.log('res.data: ' + res.data);
        console.log('@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@');
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
        // if (res.defaultClient) {
        //     //-------------------------------------------------
        //     // now get the users role for the current client
        //     //-------------------------------------------------
        //     const clientPermissions = await axios.get(
        //         `/api/client/code/${res.defaultClient}`
        //     );
        //     // if (clientPermissions) {
        //     //     clientPermissions.users.map((privs) =>
        //     //         console.log(
        //     //             '---> ' +
        //     //                 privs.user +
        //     //                 ' : ' +
        //     //                 privs.role +
        //     //                 ' : ' +
        //     //                 privs.status
        //     //         )
        //     //     );
        //     // } else {
        //     //     console.log('no privs');
        //     // }
        // }
        // res.activeClient.upshift(res.defaultClient);
        // console.table(res);
        // console.log('that our res');

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
    dispatch({ type: CLEAR_USER_AUTH });
    dispatch({ type: LOGOUT });
};
