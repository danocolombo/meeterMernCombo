import React, { Fragment } from 'react';
import { Link } from 'react-router-dom';
import moment from 'moment';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Spinner from '../layout/Spinner';
import { deleteGathering } from '../../actions/gathering';

const GatheringItem = ({
    deleteGathering,
    gathering: {
        _id,
        meetingDate,
        title,
        supportRole,
        facilitator,
        attendance,
        newcomers,
        meetingType,
        loading,
    },
    activeRole,
    activeStatus,
}) => {
    const handleDeleteRequest = () => {
        alert('going to delete someting!(' + _id + ')');
        deleteGathering(_id);
    };
    return loading ? (
        <Spinner />
    ) : (
        <Fragment>
            <div className={meetingType !== 'Other' ? 'PersonBox' : 'OtherBox'}>
                <Fragment>
                    <div className='DeleteTarget'>
                        {activeStatus === 'approved' &&
                        activeRole !== 'guest' ? (
                            <Fragment>
                                <i
                                    className='fa fa-trash'
                                    onClick={handleDeleteRequest}
                                ></i>
                            </Fragment>
                        ) : (
                            <Fragment>
                                <h5 className='large text-primary'>
                                    <i className='far fa-trash'></i>
                                </h5>
                            </Fragment>
                            // <div></div>
                            // <a
                            //     id='deleteGathering'
                            //     title='-'
                            //     href='/#'
                            //     // onClick={handleDeleteRequest(_id)}
                            //     // onClick={() => deleteGathering(_id)}
                            // >
                            //     <i className='fas fa-minus-circle'></i>
                            // </a>
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
                        {activeStatus === 'approved' &&
                        activeRole !== 'guest' ? (
                            <i className='fas fa-pen'></i>
                        ) : (
                            <i className='fas fa-search'></i>
                        )}
                    </Link>
                </div>
            </div>
        </Fragment>
    );
};

GatheringItem.propTypes = {
    gathering: PropTypes.object.isRequired,
    deleteGathering: PropTypes.func.isRequired,
    activeRole: PropTypes.string.isRequired,
    activeStatus: PropTypes.string.isRequired,
};

export default connect(null, { deleteGathering })(GatheringItem);
//post bg-white p-1 my-1
