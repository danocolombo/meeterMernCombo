import axios from 'axios';
import { setAlert } from './alert';
import {
    GET_PEOPLE,
    PERSON_ERROR,
    CLEAR_PERSON,
    SET_PERSON,
    DELETE_PERSON,
} from './types';

export const getPeople = (cid) => async (dispatch) => {
    try {
        //we know that this is called when the people list is created.
        //for this reason. Clear out the temporary person value.
        dispatch({ type: CLEAR_PERSON });
        const res = await axios.get(`/api/people/client/${cid}`);
        dispatch({
            type: GET_PEOPLE,
            payload: res.data,
        });
    } catch (err) {
        dispatch({
            type: PERSON_ERROR,
            payload: {
                msg: err.response.statusText,
                status: err.response.status,
            },
        });
    }
};
// getCurrentPerson is used when editting a person, need to get it, to edit it.DeleteTarget
export const getCurrentPerson = (id) => async (dispatch) => {
    try {
        dispatch({ CLEAR_PERSON });
        const res = await axios.get(`/api/people/${id}`);
        dispatch({
            type: SET_PERSON,
            payload: res.data,
        });
    } catch (err) {
        dispatch({
            type: PERSON_ERROR,
            payload: {
                msg: err.response.statusText,
                status: err.response.status,
            },
        });
    }
};

export const getPerson = (id) => async (dispatch) => {
    if (id.length < 1) return;
    if (id === 0) return;
    try {
        console.log('getPerson: CLEAR_PERSON..................');
        //dispatch({ type: CLEAR_PERSON });
        const res = await axios.get(`/api/people/${id}`);

        dispatch({
            type: SET_PERSON,
            payload: res.data,
        });
    } catch (err) {
        dispatch({
            type: PERSON_ERROR,
            payload: {
                msg: err.response.statusText,
                status: err.response.status,
            },
        });
    }
};
// Create or update a person
export const createPerson = (
    formData,
    activeClient,
    history,
    edit = false
) => async (dispatch) => {
    try {
        const config = {
            headers: {
                'Content-Type': 'application/json',
            },
        };
        //need to add tentantId to formData
        formData.tenantId = 'people-' + activeClient;
        const res = await axios.post('/api/people', formData, config);
        if (!res) console.log('no response back from /api/people');
        // dispatch({
        //     type: SET_PERSON,
        //     payload: res.data,
        // });
        dispatch({ type: CLEAR_PERSON });
        const ress = await axios.get(`/api/people/client/${activeClient}`);
        dispatch({
            type: GET_PEOPLE,
            payload: ress.data,
        });
        const res2 = await axios.get(`/api/people/${formData._id}`);
        dispatch({
            type: SET_PERSON,
            payload: res2.data,
        });

        dispatch(
            setAlert(edit ? 'Person Updated' : 'Person Created', 'success')
        );

        if (!edit) {
            history.push('/people');
        }
    } catch (err) {
        const errors = err.response.data.errors;

        if (errors) {
            errors.forEach((error) => dispatch(setAlert(error.msg, 'danger')));
        }

        dispatch({
            type: PERSON_ERROR,
            payload: {
                msg: err.response.statusText,
                status: err.response.status,
            },
        });
    }
};
// Delete PERSON
export const deletePerson = (id) => async (dispatch) => {
    console.log('what?');
    try {
        console.log('how come?');
        await axios.delete(`/api/people/${id}`);

        dispatch({
            type: DELETE_PERSON,
            payload: id,
        });
        dispatch(setAlert('Person Removed', 'success'));
    } catch (err) {
        dispatch({
            type: PERSON_ERROR,
            payload: {
                msg: err.response.statusText,
                status: err.response.status,
            },
        });
    }
};
export const removePerson = (id) => async (dispatch) => {
    console.log('removing :' + id);
};
export const editPerson = (id) => async (dispatch) => {
    try {
        //something
        dispatch({ CLEAR_PERSON });
    } catch (err) {
        dispatch({
            type: PERSON_ERROR,
            payload: {
                msg: err.response.statusText,
                status: err.response.status,
            },
        });
    }
};
