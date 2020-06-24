import React, { Fragment } from 'react';
import { Link } from 'react-router-dom';
import moment from 'moment';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { deleteGathering } from '../../actions/gathering';
import { deleteGroupsByMeeting } from '../../actions/group';

const GatheringItem = ({
    deleteGathering,
    deleteGroupsByMeeting,
    gathering: {
        _id,
        meetingDate,
        title,
        supportRole,
        facilitator,
        attendance,
        newcomers,
        meetingType,
    },
    activeRole,
    activeStatus,
}) => (
    <Fragment>
        <div className={meetingType !== 'Other' ? 'PersonBox' : 'OtherBox'}>
            <Fragment>
                <div className='DeleteTarget'>
                    {activeStatus === 'approved' && activeRole !== 'guest' ? (
                        <a
                            id='deleteGathering'
                            title='-'
                            href='/#'
                            onClick={deleteEvent(_id)}
                            // onClick={() => deleteGathering(_id)}
                        >
                            <i className='fas fa-minus-circle'></i>
                        </a>
                    ) : (
                        <div></div>
                    )}
                </div>
            </Fragment>
            <div>
                <Link to={`/EditGathering/${_id}`}>
                    {moment.utc(meetingDate).format('ll')}
                </Link>
                <br />
                {meetingType}: {title}
                {supportRole && (
                    <Fragment>
                        <br />
                        {supportRole}
                    </Fragment>
                )}
                {attendance > 0 && (
                    <Fragment>
                        <br />
                        Attendance: {attendance}
                    </Fragment>
                )}
                {newcomers > 0 && (
                    <Fragment>
                        <br />
                        Newcomers: {newcomers}
                    </Fragment>
                )}
                <br />
                <Link to={`/EditGathering/${_id}`}>
                    {activeStatus === 'approved' && activeRole !== 'guest' ? (
                        <i className='fas fa-pen'></i>
                    ) : (
                        <i className='fas fa-search'></i>
                    )}
                </Link>
            </div>
        </div>
    </Fragment>
);
function deleteEvent(_id) {
    // alert('we can do this');
    deleteGroupsByMeeting(_id);
    deleteGathering(_id);
    
}
// function displayNewcomers(newcomers) {
//     if (newcomers > 0) {
//         return ['newcomers:', newcomers, <br />];
//     }
// }
GatheringItem.propTypes = {
    gathering: PropTypes.object.isRequired,
    deleteGathering: PropTypes.func.isRequired,
    deleteGroupsByMeeting: PropTypes.func.isRequired,
    activeRole: PropTypes.string.isRequired,
    activeStatus: PropTypes.string.isRequired,
};

export default connect(null, { deleteGathering, deleteGroupsByMeeting })(GatheringItem);
//post bg-white p-1 my-1
