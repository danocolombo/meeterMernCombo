import axios from 'axios';
import { setAlert } from './alert';
import { ADMIN_ERROR } from './types';

// GET CLIENT INFO

export const getDashboardAttendData = (cid) => (dispatch) => {
    try {
        console.log('@@@@@@@@@@@@@@@@@@@@@@@@@');
        console.log('actions/chart :: getDashboardAttendData (' + cid + ')');
        // const res = await axios.get(`/api/chartdata/attendance/${cid}`);
        // we expect to get some data, but it is not clear how much. The
        // goal is to return the latest 10. If we don't get 10, pad to
        // the future.
        // const aCount = res.data.size();
        // console.log('aCount:' + aCount);
        // res.data.map(r => {
        //     console.log('Meeting: ' + r.x);
        // })
        // const latestAttenance =

        const mtgs = ['6/15', '6/22', '6/29', '7/6', '7/14'];
        const points = [6, 10, 10, 19, 8];
        const aData = {
            attendance: points,
            meetings: mtgs,
        };
        const util = require('util');
        console.log(
            'action::aData: ' +
                util.inspect(aData, { showHidden: false, depth: null })
        );
        return aData;
    } catch (err) {
        console.log('actions/chart.js getDashboardAttendData ADMIN_ERROR');
        dispatch({
            type: ADMIN_ERROR,
        });
    }
};
