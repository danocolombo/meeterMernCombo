import axios from 'axios';
import { setAlert } from './alert';
import {
    GET_GROUPS,
    GROUP_ERROR,
    DELETE_GROUP,
    GET_GROUP,
    CLEAR_GROUPS,
    SET_GROUP,
} from './types';

// Get groups associated with meetingId
export const getGroups = (mid) => async () => {
    try {
        // dispatch({ type: CLEAR_GROUPS });
        const res = await axios.get(`/api/groups/meeting/${mid}`);

        return res.data;
    } catch (err) {
        const resMsg = {
            msg: err.response.statusText,
            status: err.response.status,
        };

        return resMsg;
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
        const res = await axios.get(`/api/groups/group/${groupId}`);

        dispatch({
            type: GET_GROUP,
            payload: res.data,
        });
    } catch (err) {
        dispatch({
            type: GROUP_ERROR,
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
        const config = {
            headers: {
                'Content-Type': 'application/json',
            },
        };
        // may want to deserialize the formData here to use the meetingID value
        const {
            title,
            groupId,
            meetingId,
            gender,
            location,
            facilitator,
            cofacilitator,
            attendance,
            notes,
        } = formData;
        console.table(formData);
        console.log('[actions.group.js::createGroup - meetingId:' + meetingId);
        // post request to /api/group
        const res = await axios.post('/api/groups', formData, config);
        // dispatch({
        //     type: GET_GROUP,
        //     payload: res.data,
        // });
        dispatch(setAlert(edit ? 'Group Updated' : 'Group Created', 'success'));
        if (!edit) {
            history.push(`/editGathering/${meetingId}`);
        }
    } catch (err) {
        return err;
    }
};

// Delete group
export const deleteGroup = (groupId) => async (dispatch) => {
    try {
        const res = await axios.delete(`/api/groups/group/${groupId}`);

        dispatch({
            type: DELETE_GROUP,
            payload: res.data,
        });
    } catch (err) {
        dispatch({
            type: GROUP_ERROR,
            payload: {
                msg: err.response.statusText,
                status: err.response.status,
            },
        });
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
            type: GROUP_ERROR,
            payload: {
                msg: err.response.statusText,
                status: err.response.status,
            },
        });
    }
};
