import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
// import Moment from 'react-moment';
import { connect } from 'react-redux';
import { deleteGroup } from '../../actions/group';

const GroupListItem = ({
    deleteGroup,
    mid,
    auth: { activeRole },
    group: { _id, gender, title, location, facilitator },
}) => (
    <Fragment>
        <div className={'GGL-Box'} id={_id}>
            <div className='GGL-Gender my-1 pl-1 pr-1'>
                <Link to={`/EditGroup/${mid}/${_id}`}>
                    {gender === 'f' && <div>women</div>}
                    {gender === 'm' && <div>men</div>}
                    {gender === 'x' && <div>mixed</div>}
                </Link>
            </div>

            <div>
                <p className='GGL-Title my-1 pr-1'>{title}</p>
            </div>
            <div>
                <p className='GGL-Location my-1'>{location}</p>
            </div>
            <div>
                <p className='GGL-Facilitator my-1 pl'>{facilitator}</p>
            </div>

            <div className='GGL-Button my'>
                <button
                    onClick={() => deleteGroup(_id, mid)}
                    type='button'
                    className='btn btn-danger my0'
                >
                    <i className='fas fa-times' />
                </button>
            </div>
        </div>
    </Fragment>
);

GroupListItem.propTypes = {
    group: PropTypes.object.isRequired,
    auth: PropTypes.object.isRequired,
    deleteGroup: PropTypes.func.isRequired,
    mid: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
    auth: state.auth,
});

export default connect(mapStateToProps, { deleteGroup })(GroupListItem);
