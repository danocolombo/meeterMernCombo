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

//===========================================
//
// default groups
//
//===========================================
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
export const deleteDefaultGroup = (cid, gid) => async (dispatch) => {
    //this removes the defGroup id from client
    //reference in database and updates meeter.defaultGroups
    try {
        console.log('actions/admin :: deleteDefaultGroup ' + cid + gid);
        await axios.delete(`/api/client/defaultgroup/${cid}/${gid}`);
        const res = await axios.get(`/api/client/defaultgroups/${cid}`);
        if (res) {
            dispatch({
                type: SET_DEFAULT_GROUPS,
                payload: res.data,
            });
        } else {
            console.log('NO DEFAULT GROUPS RETURNED');
        }

        dispatch(setAlert('Default Group Removed', 'success'));
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

//===========================================
//
// meeting configs
//
//===========================================
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

//===========================================
//
// users and registrations
//
//===========================================
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

export const deleteClientUser = (cid, uid, email) => async (dispatch) => {
    //this removes the user id from client users
    // in database and removes from meeter.clientUsers
    //-----
    // uid is the reference in the users array in the client document
    // need email to delate the user from user document.
    try {
        // remove from client document
        await axios.delete(`/api/client/user/${cid}/${uid}`);
        // remove from user document
        await axios.delete(`/api/users/email/${email}`);
        // remove from REDUX
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

export const rejectUserRegistration = (cid, id) => async (dispatch) => {
    // this is called from Admin/DisplaySecurity when a user with permission has
    // decided to reject a registration request.  We remove the user from
    // client collection document for the client.
    //=============================
    try {
        await axios.delete(`/api/client/user/${cid}/${id}`);
        const resz = await axios.get(`/api/client/userstatus/${cid}`);
        dispatch({
            type: SET_CLIENT_USERS,
            payload: resz.data,
        });
    } catch (err) {
        console.log('actions/admin.js rejectUserRegistration ADMIN_ERROR');
        dispatch({
            type: ADMIN_ERROR,
            payload: {
                msg: err.response.statusText,
                status: err.response.status,
            },
        });
    }
};

export const grantUserRegistration = (cid, id, role, email) => async (
    dispatch
) => {
    // this is called from Admin/DisplaySecurity when a user with permission has
    // decided to add a perosn to their client.  We first add them to the client
    // list of users, then add them to people.
    //---------------------------------
    // update client entry first
    //----------------------------------
    const config = {
        headers: {
            'Content-Type': 'application/json',
        },
    };
    let res = null;
    try {
        //-----------------------------
        // first update the client users
        //------------------------------
        let updateClientUser = {};
        updateClientUser._id = id;
        updateClientUser.cid = cid;
        updateClientUser.role = role;
        updateClientUser.status = 'approved';

        res = await axios.put('/api/client/user', updateClientUser, config);

        //------------------------------------------
        // now check if the user is already on team
        //------------------------------------------
        let potentialPeep = {};
        potentialPeep.cid = cid;
        potentialPeep.email = email;
        console.log('before validateemail call ');
        // let res = null;
        try {
            res = await axios.post(
                '/api/people/validateemail',
                potentialPeep,
                config
            );
            //------------------------------------------------
            // if the person is in the system it will not get
            // an error, so we fall through. If they are not
            // in the people collection, it will get 404 and
            // fall into the catch below to add them.
            //------------------------------------------------
            console.log('this one is on the team, not adding');
        } catch (error) {
            //no info for user, we can add them now

            console.log('not on team, add them.');
            // need to get user info
            const userRef = await axios.get(`/api/users/identify/${id}`);
            let personInfo = {};

            personInfo.tenantId = 'people-' + cid;
            personInfo.name = userRef.data.name;
            personInfo.email = userRef.data.email;
            personInfo.defaultClient = userRef.data.defaultClient;

            // then pass the user to the people table
            const peopleRef = await axios.post(
                '/api/people',
                personInfo,
                config
            );
        }
    } catch (err) {
        console.log('actions/admin.js grantUserRegistration ADMIN_ERROR #1');
        dispatch({
            type: ADMIN_ERROR,
            payload: {
                msg: err.response.statusText,
                status: err.response.status,
            },
        });
    }
    try {
        const resz = await axios.get(`/api/client/userstatus/${cid}`);
        dispatch({
            type: SET_CLIENT_USERS,
            payload: resz.data,
        });
    } catch (err) {
        console.log('actions/admin.js grantUserRegistration ADMIN_ERROR #2');
        dispatch({
            type: ADMIN_ERROR,
            payload: {
                msg: err.response.statusText,
                status: err.response.status,
            },
        });
    }
};
