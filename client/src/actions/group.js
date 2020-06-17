import axios from 'axios';
import { setAlert } from './alert';
import {
    GET_GROUPS,
    GROUP_ERROR,
    DELETE_GROUP,
    ADD_GROUP,
    GET_GROUP,

    // CLEAR_GROUP,
    // UPDATE_GROUP,
    // CLEAR_GROUPS,
    // SET_GROUP,
} from './types';

// Get groups associated with meetingId
export const getGroups = (mid) => async (dispatch) => {
    try {
        const res = await axios.get(`/api/groups/meeting/${mid}`);

        dispatch({
            type: GET_GROUPS,
            payload: res.data,
        });
    } catch (err) {
        dispatch({
            //actions:getGroups
            type: GROUP_ERROR,
            payload: {
                msg: err.response.statusText,
                status: err.response.status,
            },
        });
    }
};
// Delete group
export const deleteGroup = (groupId, mid) => async (dispatch) => {
    try {
        await axios.delete(`/api/groups/${groupId}`);
        dispatch({
            type: DELETE_GROUP,
            payload: groupId,
        });
        // reload the groups
        const res = await axios.get(`/api/groups/meeting/${mid}`);

        dispatch({
            type: GET_GROUPS,
            payload: res.data,
        });
        dispatch(setAlert('Group removed', 'success'));
    } catch (err) {
        dispatch({
            //actions:deleteGroup
            type: GROUP_ERROR,
            payload: {
                msg: err.response.statusText,
                status: err.response.status,
            },
        });
    }
};
// Get group associated with groupID
export const getGroupNoRedux = (gid) => async (dispatch) => {
    console.log('actions/group: getGroup: gid:' + gid);
    try {
        // dispatch({ type: CLEAR_GROUPS });
        const res = await axios.get(`/api/groups/${gid}`);
        return await axios.get(`/api/groups/${gid}`).then((response) => {
            return response.data;
        });
        return res.data;
        // return;
    } catch (err) {
        dispatch({
            //actions:getGroupNoRedux
            type: GROUP_ERROR,
            payload: {
                msg: err.response.statusText,
                status: err.response.status,
            },
        });

        // return resMsg;
    }
};
// export const getGroups2 = mid => async dispatch => {
//     try {
//         // dispatch({ type: CLEAR_GROUPS });
//         const res = await axios.get(`/api/groups/meeting/${mid}`);

//         dispatch({
//             type: GET_GROUPS,
//             payload: res.data
//         });
//     } catch (err) {
//         dispatch({
//             type: GROUP_ERROR,
//             payload: {
//                 msg: err.response.statusText,
//                 status: err.response.status
//             }
//         });
//     }
// };
// Get group by groupId
export const getGroup = (groupId) => async (dispatch) => {
    try {
        // dispatch({ type: CLEAR_GROUP });
        const res = await axios.get(`/api/groups/${groupId}`);
        dispatch({
            type: GET_GROUP,
            payload: res.data,
        });
    } catch (err) {
        dispatch({
            //getGroup
            type: GROUP_ERROR,
            //actions:getGroup
            payload: {
                msg: err.response.statusText,
                status: err.response.status,
            },
        });
    }
};

// Create or update Group
// the data will come in on formData and we will use history to
// redirect to the meeting after adding the group. The edit
// flag will define if it is new group or updating existing. We
// default to false, which means new, insert the group
export const createGroup = (formData, history, edit = false) => async (
    dispatch
) => {
    try {
        if (formData._id.length < 1) {
            //this is an add
            delete formData._id;
        }
        const config = {
            headers: {
                'Content-Type': 'application/json',
            },
        };
        let res = null;
        if (formData._id) {
            res = await axios.post(
                `/api/groups/group/${formData._id}`,
                formData,
                config
            );
        } else {
            res = await axios.post(`/api/groups/group/0`, formData, config);
        }

        dispatch({
            type: ADD_GROUP,
            payload: res.data,
        });
        dispatch(setAlert(edit ? 'Group Updated' : 'Group Created', 'success'));

        if (!edit) {
            const target = '/editGathering/' + formData.mid;
            history.push(target);
        }
    } catch (err) {
        return err;
    }
};

// Create or update groups
export const OLDcreateGroup = (formData, history, edit = false) => async (
    dispatch
) => {
    try {
        if (formData._id.length < 1) {
            //this is an add, so delete groupId from formData
            delete formData.groupId;
        } else {
            formData.meetingId = formData._id;
        }
        const config = {
            headers: {
                'Content-Type': 'application/json',
            },
        };
        const res = await axios.post(
            '/api/groups/group/{$_id}',
            formData,
            config
        );

        dispatch({
            type: GET_GROUP,
            payload: res.data,
        });

        dispatch(setAlert(edit ? 'Group Updated' : 'Group Created', 'success'));

        if (!edit) {
            history.push('/group');
        }
    } catch (err) {
        const errors = err.response.data.errors;

        if (errors) {
            errors.forEach((error) => dispatch(setAlert(error.msg, 'danger')));
        }

        dispatch({
            //actions:oldCreateGroup
            type: GROUP_ERROR,
            payload: {
                msg: err.response.statusText,
                status: err.response.status,
            },
        });
    }
};
