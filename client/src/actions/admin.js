import axios from 'axios';
import { SET_CLIENT_USERS, ADMIN_ERROR } from './types';

// GET CLIENT INFO
export const getClientUsers = (client) => async (dispatch) => {
    try {
        //we know that this is called when the people list is created.
        //for this reason. Clear out the temporary person value.
        //dispatch({ type: CLEAR_PERSON });
        const res = await axios.get(`/api/client/users/${client}`);
        dispatch({
            type: SET_CLIENT_USERS,
            payload: res.data,
        });
    } catch (err) {
        dispatch({
            type: ADMIN_ERROR,
            payload: {
                msg: err.response.statusText,
                status: err.response.status,
            },
        });
    }
};
export const getClientInfo = (cid) => async (dispatch) => {
    try {
        console.log('@@@@@@@@@@@@@@@@@@@@@@@@@');
        console.log('actions/admin :: getClientInfo (' + cid + ')');
    } catch (err) {
        dispatch({
            type: ADMIN_ERROR,
        });
    }
};
