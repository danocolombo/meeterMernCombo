import axios from 'axios';
import { GET_CLIENT, ADMIN_ERROR } from './types';

// GET CLIENT INFO
export const getClientUsers = (client) => async (dispatch) => {
    try {
        return '<p>WIN</p';
        // console.log('@@@@@@@@@@@@@@@@@@@@@@@@@');
        // const util = require('client');
        // console.log(
        //     'mmmm: ' + util.inspect(client, { showHidden: false, depth: null })
        // );
        // console.log(
        //     'actions/admin :: getClientUsers (' +
        //         JSON.stringify(JSON.parse(client)) +
        //         ')'
        // );

        // const res = await axios.get(`/api/client/code/${client.activeClient}`);

        // // const util = require('res.data');
        // // console.log(util.inspect(res.data, { showHidden: false, depth: null }));
        // dispatch({
        //     type: GET_CLIENT,
        // });
        // return res;
    } catch (err) {
        dispatch({
            type: ADMIN_ERROR,
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
