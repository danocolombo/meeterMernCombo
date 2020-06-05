import React, { Fragment } from 'react';
//-----------------------------------------------------
//this does something
//-----------------------------------------------------
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

/* eslint react/prop-types: 0 */
const CheckPrivs = ({ user }) => {
    return [
        <>
            {getActiveClient(user)}
            <h2>hic-up</h2>
        </>,
    ];
};
function getActiveClient(user) {
    return (
        <div>
            CLIENT:{' '}
            {/* <strong>
                <i>{user.activeClient}</i>
            </strong> */}
        </div>
    );
}
// function showFuture(meetings) {
//     console.log('SIZE:' + meetings.length);
//     let mDate = null;
//     let mTitle = '';
//     let mPeep = '';
//     let gotIt = false;
//     let theNext = (
//         <ul>
//             <li>yep</li>
//         </ul>
//     );

//     if (meetings.length > 0) {
//         //=======================================
//         // there are future gatherings in store
//         //=======================================
//         console.log('meeting[0].meetingDate:' + meetings[0].meetingDate);
//         let mCnt = meetings.length;
//         for (let index = 0; index < mCnt; index++) {
//             // const element = array[index];
//             console.log(
//                 index +
//                     ' - ' +
//                     meetings[index].meetingDate +
//                     meetings[index].meetingType
//             );
//             if (meetings[index].meetingType === 'Lesson') {
//                 mDate = meetings[index].meetingDate;
//                 mTitle = 'Lesson:' + meetings[index].title;
//                 mPeep = meetings[index].supportRole;
//                 mCnt = index;
//                 theNext = (
//                     <div>
//                         {mDate} {mTitle} {mPeep}{' '}
//                     </div>
//                 );
//             }
//             if (meetings[index].meetingType === 'Testimony') {
//                 mDate = meetings[index].meetingDate;
//                 mTitle = meetings[index].meetingType;
//                 mPeep = meetings[index].title;
//                 mCnt = index;
//                 theNext = (
//                     <div>
//                         {mDate} {mTitle} {mPeep}{' '}
//                     </div>
//                 );
//             }
//         }
//         if (mDate != null) {
//             console.log('===============================');
//             console.log('our next meeting');
//             console.log(mDate + '  ' + ' - ' + mTitle + '  ' + ' - ' + mPeep);
//         }
//         // we have the next testimony/lesson defined (if available)
//         return [<>{theNext}</>];
//     } else {
//         return [<h4>We have no future</h4>];
//     }
// }
// function showDate(d) {
//     //return 'mm/dd/yyyy';
//     let date = new Date(d);
//     let year = date.getFullYear();
//     let month = date.getMonth() + 1;
//     let dt = date.getDate() + 1;
//     let nDate = month + '/' + dt + '/' + year;
//     return nDate;
// }

CheckPrivs.propTypes = {
    user: PropTypes.array.isRequired,
};
const mapStateToProps = (state) => {
    return { user: state.auth.user };
};

export default connect(mapStateToProps)(CheckPrivs);
