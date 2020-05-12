import React, { Fragment } from 'react';
//-----------------------------------------------------
//this displays the next gathering coming up. which is
// gathering.gatherings[0] which is already loaded in
// store
//-----------------------------------------------------
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

/* eslint react/prop-types: 0 */
const NextGathering = ({ gatherings }) => {
    return [
        <>
            {showFuture(gatherings)}
            <table>
                {gatherings.map((g) => (
                    <tr>
                        <td className='gatheringDate'>
                            {showDate(g.meetingDate)}
                        </td>
                        <td>&nbsp;</td>
                        <td>{g.meetingType}</td>
                    </tr>
                ))}
            </table>
        </>,
    ];
};
function showFuture(meetings) {
    console.log('SIZE:' + meetings.length);
    let mDate = new Date();
    let mTitle = ''
    let mPeep = ''
    let gotIt = false

    if (meetings.length > 0) {
        //=======================================
        // there are future gatherings in store
        //=======================================
        console.log('meeting[0].meetingDate:' + meetings[0].meetingDate);
        let mCnt = meetings.length;
        for (let index = 0; index < mCnt; index++) {
            // const element = array[index];
            console.log(index + ' - ' + meetings[index].meetingDate + meetings[index].meetingType);
            if (meetings[index].meetingType === 'Lesson'){
                mDate = meetings[index].meetingDate;
                mTitle = meetings[index].title;
                mPeep = meetings[index].supportRole;
                mCnt = index;
            }
            if (meetings[index].meetingType === 'Testimony'){
                mDate = meetings[index].meetingDate;
                mTitle = meetings[index].meetingType;
                mPeep = meetings[index].title;
                mCnt = index;
            }
            
        }
        console.log('===============================');
        console.log('our next meeting');
        console.log(mDate + "  " + " - " + mTitle + "  " + " - " + mPeep);
        
        // we have the next testimony/lesson defined (if available)
        return [
                <h2>WE HAVE A FUTURE!!</h2>
        ];
    } else {
        return [<h4>We have no future</h4>];
    }
}
function showDate(d) {
    //return 'mm/dd/yyyy';
    let date = new Date(d);
    let year = date.getFullYear();
    let month = date.getMonth() + 1;
    let dt = date.getDate() + 1;
    let nDate = month + '/' + dt + '/' + year;
    return nDate;
}

NextGathering.propTypes = {
    gatherings: PropTypes.array.isRequired,
};
const mapStateToProps = (state) => {
    return { gatherings: state.gathering.gatherings };
};

export default connect(mapStateToProps)(NextGathering);
