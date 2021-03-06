import axios from 'axios';
import { setAlert } from './alert';
import {
    GET_GATHERINGS,
    GATHERING_ERROR,
    GET_GATHERING,
    DELETE_GATHERING,
    CLEAR_GATHERINGS,
    CLEAR_GATHERING,
    UPDATE_GATHERING,
    GET_HATHERINGS,
    CLEAR_HATHERINGS,
    CLEAR_GROUPS,
    GET_GROUPS,
    GROUP_ERROR,
} from './types';

//get  gatherings
export const getGatherings = (cid) => async (dispatch) => {
    try {
        if (!cid.activeClient) {
            return;
        }
        dispatch({ type: CLEAR_GATHERINGS });
        // this will print the Oject contents of cid
        // const util = require('util');
        // console.log('cid.activeClient: ' + cid.activeClient);
        // console.log(
        //     'cid: ' + util.inspect(cid, { showHidden: false, depth: null })
        // );

        // console.log(util.inspect(cid, {showHidden: false, depth: null}))
        // let c = JSON.parse(cid);
        // console.log('c: ' + c);
        //const res = await axios.get('/api/meeting/future');
        const res = await axios.get(`/api/meeting/future/${cid.activeClient}`);
        // const res = await axios.get('/api/meeting/future');
        dispatch({ type: CLEAR_GATHERING });
        dispatch({
            type: GET_GATHERINGS,
            payload: res.data,
        });
        //get the historical gathererings
        dispatch({ type: CLEAR_HATHERINGS });

        // const res1 = await axios.get('/api/meeting/history');
        const res1 = await axios.get(
            `/api/meeting/history/${cid.activeClient}`
        );
        dispatch({
            type: GET_HATHERINGS,
            payload: res1.data,
        });
        // dispatch({ type: CLEAR_SERVANTS });
        // const res2 = await axios.get('/api/person/servants');
        // console.log('servants: results are...', typeof res2);
        // console.log(JSON.stringify(res2));
        //==========================================
        // we want to insert blank option in the list
        // before returning
        //===========================================
        // create blank object
        //===========================================
        // const newList = {
        //     _id:"",
        //     name:"",
        //     servant:"",
        //     __v: 0,
        //     date:"",
        //     training:[]
        // }
        // console.log(JSON.stringify(newList));
        // console.log('-----------');
        //===========================================
        // combine blank object with response from db
        //===========================================
        //function extend(newList, res2) {
        // for(var key in res2) {
        //     newList[key] = res2[key];
        // }
        // //    return dest;
        // console.log(JSON.stringify(newList));

        // dispatch({
        //     type: GET_SERVANTS,
        //     payload: res2.data,
        // });
    } catch (err) {
        dispatch({
            type: GATHERING_ERROR,
            payload: {
                msg: err.response.statusText,
                status: err.response.status,
            },
        });
    }
};
//original get  gatherings
export const getGatherings1 = () => async (dispatch) => {
    try {
        dispatch({ type: CLEAR_GATHERINGS });

        const res = await axios.get('/api/meeting/future');
        dispatch({ type: CLEAR_GATHERING });
        dispatch({
            type: GET_GATHERINGS,
            payload: res.data,
        });
        //get the historical gathererings
        dispatch({ type: CLEAR_HATHERINGS });
        const res1 = await axios.get('/api/meeting/history');
        dispatch({
            type: GET_HATHERINGS,
            payload: res1.data,
        });
        // dispatch({ type: CLEAR_SERVANTS });
        // const res2 = await axios.get('/api/person/servants');
        // console.log('servants: results are...', typeof res2);
        // console.log(JSON.stringify(res2));
        //==========================================
        // we want to insert blank option in the list
        // before returning
        //===========================================
        // create blank object
        //===========================================
        // const newList = {
        //     _id:"",
        //     name:"",
        //     servant:"",
        //     __v: 0,
        //     date:"",
        //     training:[]
        // }
        // console.log(JSON.stringify(newList));
        // console.log('-----------');
        //===========================================
        // combine blank object with response from db
        //===========================================
        //function extend(newList, res2) {
        // for(var key in res2) {
        //     newList[key] = res2[key];
        // }
        // //    return dest;
        // console.log(JSON.stringify(newList));

        // dispatch({
        //     type: GET_SERVANTS,
        //     payload: res2.data,
        // });
    } catch (err) {
        dispatch({
            type: GATHERING_ERROR,
            payload: {
                msg: err.response.statusText,
                status: err.response.status,
            },
        });
    }
};
// Create or update gathering
export const createGathering = (formData, history, cid, edit = false) => async (
    dispatch
) => {
    try {
        if (formData._id.length < 1) {
            //this is an add, so delete _id and meetingId from formData
            delete formData._id;
            delete formData.meetingId;
        } else {
            formData.meetingId = formData._id;
            //formData._id = '';
        }
        //-----------------------------------------------
        // need to add the tenantId to the data to put
        //-----------------------------------------------
        var client = 'meeting-' + cid;
        formData.tenantId = client;

        const config = {
            headers: {
                'Content-Type': 'application/json',
            },
        };
        const res = await axios.post('/api/meeting', formData, config);

        dispatch({
            type: GET_GATHERING,
            payload: res.data,
        });

        dispatch(
            setAlert(edit ? 'Meeting Updated' : 'Meeting Created', 'success')
        );

        if (!edit) {
            history.push('/gatherings');
        }
    } catch (err) {
        const errors = err.response.data.errors;

        if (errors) {
            errors.forEach((error) => dispatch(setAlert(error.msg, 'danger')));
        }

        dispatch({
            type: GATHERING_ERROR,
            payload: {
                msg: err.response.statusText,
                status: err.response.status,
            },
        });
    }
};
// Get gathering
export const getGathering = (id) => async (dispatch) => {
    //endure that id is not null, if so return

    // console.log('getGathering:IN');
    if (id.length < 1) return;
    if (id === 0) return;
    try {
        dispatch({ type: CLEAR_GATHERING });
        const res = await axios.get(`/api/meeting/${id}`);

        dispatch({
            type: GET_GATHERING,
            payload: res.data,
        });
        await axios.get(`/api/meeting/${id}`);
        // console.log('res.data [AFTER]' + res.data);
    } catch (err) {
        dispatch({
            type: GATHERING_ERROR,
            payload: {
                msg: err.response.statusText,
                status: err.response.status,
            },
        });
    }
};
// Delete GATHERING
export const deleteGathering = (id) => async (dispatch) => {
    try {
        //need to delete any groups that might be associated with meeting
        // console.log('DELETE /api/groups/bymeeting/' + id);
        // console.log('DELETE /api/meeting/' + id);
        await axios.delete(`/api/groups/bymeeting/${id}`);
        await axios.delete(`/api/meeting/${id}`);

        dispatch({
            type: DELETE_GATHERING,
            payload: id,
        });

        dispatch(setAlert('Meeting Removed', 'success'));
    } catch (err) {
        dispatch({
            type: GATHERING_ERROR,
            payload: {
                msg: err.response.statusText,
                status: err.response.status,
            },
        });
    }
};
// Delete group
export const deleteGroup = (mtgId, groupId) => async (dispatch) => {
    try {
        const res = await axios.delete(`/api/meeting/${mtgId}/${groupId}`);

        dispatch({
            type: UPDATE_GATHERING,
            payload: res.data,
        });

        dispatch(setAlert('Group Removed', 'success'));
    } catch (err) {
        dispatch({
            type: GATHERING_ERROR,
            payload: {
                msg: err.response.statusText,
                status: err.response.status,
            },
        });
    }
};
// Edit group
export const editGroup = (mtgId, groupId) => async (dispatch) => {
    // try {
    //     const res = await axios.delete(`/api/meeting/${mtgId}/${groupId}`);
    //     dispatch({
    //         type: UPDATE_GATHERING,
    //         payload: res.data
    //     });
    //     dispatch(setAlert('Group Removed', 'success'));
    // } catch (err) {
    //     dispatch({
    //         type: GATHERING_ERROR,
    //         payload: {
    //             msg: err.response.statusText,
    //             status: err.response.status
    //         }
    //     });
    // }
};
export const createGroup = (formData, history, edit = false) => async (
    dispatch
) => {
    try {
    } catch (err) {}
};
export const addDefaultGroups = (grps2add) => async (dispatch) => {
    console.log('in actions/gatherings :: addDefaultGroups');
    console.log('typeof grps2add: ' + typeof grps2add);
    const util = require('util');
    console.log(
        'defaultGroups: ' +
            util.inspect(grps2add, { showHidden: false, depth: null })
    );

    // going to need the meeting id. We will grab while rotating through...
    let mid = null;
    // let axiosResponse = null;
    try {
        const config = {
            headers: {
                'Content-Type': 'application/json',
            },
        };
        const newGroups = [];
        let result = grps2add.map((g) => {
            newGroups.push(g);
            mid = g.mid;
        });
        for (let i = 0; i < newGroups.length; i++) {
            const axiosResponse = await axios.post(
                '/api/groups/group/0',
                newGroups[i],
                config
            );
        }

        console.table(newGroups[0]);

        // for (let i = 0; i < newGroups.length; i++) {
        //     const axiosResponse = await axios.put(
        //         '/api/client/defaultgroup',
        //         newGroups[i],
        //         config
        //     );
        // }
        // now get the groups for the meeting and load in REDUX
        const res = await axios.get(`/api/groups/meeting/${mid}`);
        dispatch({ type: CLEAR_GROUPS });
        dispatch({
            type: GET_GROUPS,
            payload: res.data,
        });
    } catch (err) {
        console.log('actions/gatherings.js addDefaultGroups');
        console.error(err);
        // dispatch({
        //     //actions:getGroups
        //     type: GROUP_ERROR,
        //     payload: {
        //         msg: err.response.statusText,
        //         status: err.response.status,
        //     },
        // });
    }
};
