import axios from 'axios';
import { setAlert } from './alert';
import {
    SET_CLIENT_USERS,
    ADMIN_ERROR,
    SET_DEFAULT_GROUPS,
    REMOVE_CLIENT_USER,
    SET_MTG_CONFIGS,
} from './types';

// GET CLIENT INFO
export const getClientUsers = (client) => async (dispatch) => {
    try {
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
export const getMtgConfigs = (cid) => async (dispatch) => {
    //this loads all the default groups for cid
    //into meeter.defaultGroups
    try {
        const res = await axios.get(`/api/client/meetingConfigs/${cid}`);
        if (res) {
            dispatch({
                type: SET_MTG_CONFIGS,
                payload: res.data,
            });
        } else {
            console.log('NO CLIENT MEETING CONFIGS');
        }
    } catch (err) {
        dispatch({
            type: ADMIN_ERROR,
            payload: {
                msg: err.response.statusText ? err.response.statusText : '',
                status: err.response.status,
            },
        });
    }
};
export const deleteDefGroup = (id) => async (dispatch) => {
    //this removes the defGroup id from client
    //reference in database and updates meeter.defaultGroups
};
export const deleteClientUser = (cid, uid) => async (dispatch) => {
    //this removes the user id from client users
    // in database and removes from meeter.clientUsers
    try {
        await axios.delete(`/api/client/user/${cid}/${uid}`);

        dispatch({
            type: REMOVE_CLIENT_USER,
            payload: uid,
        });

        dispatch(setAlert('Client User Removed', 'success'));
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
export const updateMeetingConfigs = (
    formData,
    history,
    cid,
    edit = false
) => async (dispatch) => {};
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
export const toggleConfig = (cid, config) => async (dispatch) => {
    // this gets the client and configuration value
    // if the value exists, we remove it, if it does
    // not exist, we add it.
};
