import axios from 'axios';
import { setAlert } from './alert';
import {
  POST_ERROR,
ADMIN_ERROR,
  REMOVE_COMMENT
} from './types';

// Delete comment
// export const deleteComment = (postId, commentId) => async dispatch => {
//   try {
//     await axios.delete(`/api/posts/comment/${postId}/${commentId}`);

//     dispatch({
//       type: REMOVE_COMMENT,
//       payload: commentId
//     });

//     dispatch(setAlert('Comment Removed', 'success'));
//   } catch (err) {
//     dispatch({
//       type: POST_ERROR,
//       payload: { msg: err.response.statusText, status: err.response.status }
//     });
//   }
// };


export const getDashboardAttendance = (cid) => async (dispatch) => {
    try {
        console.log('in getDachboardAttendance');
        // const res = await axios.get(`/api/chartdata/attendance/${cid}`);
        // we expect to get some data, but it is not clear how much. The
        // goal is to return the latest 10. If we don't get 10, pad to
        // the future.
        // const aCount = res.data.size();
        // console.log('aCount:' + aCount);
        // res.data.map(r => {
        //     console.log('Meeting: ' + r.x);
        // })
        const aData = {};
        return(aData);
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



