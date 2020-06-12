import axios from 'axios';
import { SET_CLIENT_USERS, ADMIN_ERROR, SET_DEFAULT_GROUPS } from './types';

// GET CLIENT INFO
export const getClientUsers = (client) => async (dispatch) => {
    try {
        //we know that this is called when the people list is created.
        //for this reason. Clear out the temporary person value.
        //dispatch({ type: CLEAR_PERSON });
        const res = await axios.get(`/api/client/userstatus/${client}`);
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
export const getDefGroups = (cid) => async (dispatch) => {
    //this loads all the default groups for cid
    //into meeter.defaultGroups
    try {
        const res = await axios.get(`/api/client/defaultgroups/${cid}`);
        if (res) {
            dispatch({
                type: SET_DEFAULT_GROUPS,
                payload: res.data,
            });
        } else {
            console.log('NO DEFAULT GROUPS RETURNED');
        }
    } catch (err) {
        dispatch({
            type: ADMIN_ERROR,
            // payload: {
            //     msg: err.response.statusText ? err.response.statusText : '',
            //     status: err.response.status,
            // },
        });
    }
};
export const deleteDefGroup = (id) => async (dispatch) => {
    //this removes the defGroup id from client
    //reference in database and updates meeter.defaultGroups
};
export const deleteClientUser = (id) => async (dispatch) => {
    //this removes the user id from client users
    // in database and removes from meeter.clientUsers
};
export const approveClientUser = (id) => async (dispatch) => {
    //this updates the status of the user (id) in client
    //users in database to approved and updates
    //meeter.clientUsers status
};
export const suspendClientUser = (id) => async (dispatch) => {
    //this updates the status of the user (id) in client
    //users in database to suspended and updates
    //meeter.clientUsers status
};
