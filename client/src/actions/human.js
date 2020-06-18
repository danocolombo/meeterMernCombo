import axios from 'axios';
import { setAlert } from './alert';
import {
    GET_HUMANS,
    HUMAN_ERROR,
    CLEAR_HUMAN,
    GET_HUMAN,
    DELETE_HUMAN,
} from './types';

export const getHumans = (cid) => async (dispatch) => {
    try {
        dispatch({ type: CLEAR_HUMAN });
        const res = await axios.get(`/api/human/client/${cid}`);
        dispatch({
            type: GET_HUMANS,
            payload: res.data,
        });
    } catch (err) {
        dispatch({
            type: HUMAN_ERROR,
            payload: {
                msg: err.response.statusText,
                status: err.response.status,
            },
        });
    }
};

export const getCurrentHuman = (id) => async (dispatch) => {
    try {
        dispatch({ CLEAR_HUMAN });
        const res = await axios.get(`/api/human/${id}`);
        dispatch({
            type: GET_HUMAN,
            payload: res.data,
        });
    } catch (err) {
        dispatch({
            type: HUMAN_ERROR,
            payload: {
                msg: err.response.statusText,
                status: err.response.status,
            },
        });
    }
};

export const getHuman = (id) => async (dispatch) => {
    if (id.length < 1) return;
    if (id === 0) return;
    try {
        const res = await axios.get(`/api/human/${id}`);
        dispatch({
            type: GET_HUMAN,
            payload: res.data,
        });
    } catch (err) {
        dispatch({
            type: HUMAN_ERROR,
            payload: {
                msg: err.response.statusText,
                status: err.response.status,
            },
        });
    }
};

export const createHuman = (formData, history, edit = false) => async (
    dispatch
) => {
    try {
        console.log('formData:');
        console.table(formData);
        const config = {
            headers: {
                'Content-Type': 'application/json',
            },
        };
        const res = await axios.post('/api/human', formData, config);

        dispatch({
            type: GET_HUMAN,
            payload: res.data,
        });

        dispatch(
            setAlert(edit ? 'Person Updated' : 'Person Created', 'success')
        );

        if (!edit) {
            history.push('/humans');
        }
    } catch (err) {
        const errors = err.response.data.errors;

        if (errors) {
            errors.forEach((error) => dispatch(setAlert(error.msg, 'danger')));
        }

        dispatch({
            type: HUMAN_ERROR,
            payload: {
                msg: err.response.statusText,
                status: err.response.status,
            },
        });
    }
};
// Delete PERSON
export const deleteHuman = (id) => async (dispatch) => {
    try {
        await axios.delete(`/api/human/${id}`);

        dispatch({
            type: DELETE_HUMAN,
            payload: id,
        });
        dispatch(setAlert('Person Removed', 'success'));
    } catch (err) {
        dispatch({
            type: HUMAN_ERROR,
            payload: {
                msg: err.response.statusText,
                status: err.response.status,
            },
        });
    }
};
export const editHuman = (id) => async (dispatch) => {
    try {
        //something
        dispatch({ CLEAR_HUMAN });
    } catch (err) {
        dispatch({
            type: HUMAN_ERROR,
            payload: {
                msg: err.response.statusText,
                status: err.response.status,
            },
        });
    }
};
