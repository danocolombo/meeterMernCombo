import axios from 'axios';
import { setAlert } from './alert';
import {
    SET_CLIENT_USERS,
    ADMIN_ERROR,
    SET_DEFAULT_GROUPS,
    REMOVE_CLIENT_USER,
    SET_MTG_CONFIGS,
    TOGGLE_CONFIG,
} from './types';

// GET CLIENT INFO

export const getClientInfo = (cid) => async (dispatch) => {
    try {
        console.log('@@@@@@@@@@@@@@@@@@@@@@@@@');
        console.log('actions/admin :: getClientInfo (' + cid + ')');
    } catch (err) {
        console.log('actions/admin.js getClientInfo ADMIN_ERROR');
        dispatch({
            type: ADMIN_ERROR,
        });
    }
};
export const getClientUsers = (client) => async (dispatch) => {
    console.log('getClientUsers(' + client + ')');
    console.log('/api/client/userstatus/' + client);
    try {
        const res = await axios.get(`/api/client/userstatus/${client}`);
        dispatch({
            type: SET_CLIENT_USERS,
            payload: res.data,
        });
    } catch (err) {
        console.log('actions/admin.js getClientUsers ADMIN_ERROR');
        dispatch({
            type: ADMIN_ERROR,
            payload: {
                msg: err.response.statusText,
                status: err.response.status,
            },
        });
    }
};
export const getMtgConfigs = (cid) => async (dispatch) => {
    //this loads all the default groups for cid
    //into meeter.defaultGroups
    if (!cid) return;
    console.log('getMtgConfigs(' + cid + ')');
    console.log('/api/client/meetingConfigs/' + cid);
    try {
        const res = await axios.get(`/api/client/mconfigs/${cid}`);
        // const res = await axios.get(`/api/client/meetingConfigs/${cid}`);
        if (res) {
            dispatch({
                type: SET_MTG_CONFIGS,
                payload: res.data,
            });
        } else {
            console.log('NO CLIENT MEETING CONFIGS');
        }
    } catch (err) {
        console.log('actions/admin.js getMtgConfigs ADMIN_ERROR');
        dispatch({
            type: ADMIN_ERROR,
            payload: {
                msg: err.response.statusText ? err.response.statusText : '',
                status: err.response.status,
            },
        });
    }
};
export const getDefGroups = (cid) => async (dispatch) => {
    //this loads all the default groups for cid
    //into meeter.defaultGroups
    console.log('getDefGroups(' + cid + ')');
    console.log('/api/client/defaultgroups/' + cid);
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
        console.log('actions/admin.js getDefGroups ADMIN_ERROR');
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
        console.log('actions/admin.js deleteClientUser ADMIN_ERROR');
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
) => async (dispatch) => {
    // console.table(formData);

    const config = {
        headers: {
            'Content-Type': 'application/json',
        },
    };
    const res = await axios.put(
        `/api/client/updateconfigs/${cid}`,
        formData,
        config
    );
    dispatch(setAlert('Would have saved the values.', 'success'));
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
export const toggleConfig = (config, value, cid) => async (dispatch) => {
    // this gets the client and configuration value
    // if the value exists, we remove it, if it does
    // not exist, we add it.
    let theChange = {};
    theChange.cid = cid;
    theChange.config = config;
    theChange.value = value;
    // console.table(theChange);
    try {
        const config = {
            headers: {
                'Content-Type': 'application/json',
            },
        };
        const res = await axios.post(
            '/api/client/toggleconfig',
            theChange,
            config
        );

        dispatch({
            type: TOGGLE_CONFIG,
            payload: res,
        });

        dispatch(setAlert('System Configuration Updated', 'success'));
    } catch (err) {
        console.log('actions/admin.js deleteClientUser ADMIN_ERROR');
        dispatch({
            type: ADMIN_ERROR,
            payload: {
                msg: err.response.statusText,
                status: err.response.status,
            },
        });
    }
};
export const grantUserRegistration = (cid, id, role) => async (dispatch) => {
    // this is called from Admin/DisplaySecurity when a user with permission has
    // decided to add a perosn to their client.  We first add them to the client
    // list of users, then add them to people.
    //---------------------------------
    // update client entry first
    //----------------------------------
    console.log('---- inside actions/admin ------');
    console.log('_id: ' + id);
    console.log('cid: ' + cid);
    console.log('role: ' + role);

    const DEBUG = true;
    if (!DEBUG) {
        try {
            //-----------------------------
            // first update the client users
            //------------------------------
            let updateClientUser = {};
            updateClientUser._id = id;
            updateClientUser.cid = cid;
            updateClientUser.role = role;
            updateClientUser.status = 'approved';
            const config = {
                headers: {
                    'Content-Type': 'application/json',
                },
            };
            const res = await axios.put(
                '/api/client/user',
                updateClientUser,
                config
            );

            dispatch({
                type: SET_CLIENT_USERS,
                payload: res,
            });

            dispatch(setAlert('System Configuration Updated', 'success'));
        } catch (err) {
            console.log('actions/admin.js deleteClientUser ADMIN_ERROR');
            dispatch({
                type: ADMIN_ERROR,
                payload: {
                    msg: err.response.statusText,
                    status: err.response.status,
                },
            });
        }
    }
};
