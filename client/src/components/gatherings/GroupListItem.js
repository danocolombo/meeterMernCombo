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
        <div className="GItem-Box">
            
            <div className={'GItem-GenderTitle'}>
                <Link to={`/EditGroup/${mid}/${_id}`}>
                    {gender === 'f' && <div>women's</div>}
                    {gender === 'm' && <div>men's</div>}
                </Link>{title}
            </div>
            <div className="GItem-LocationFacilitator">
                <p>Location</p><p>Facilitator</p></div>
            <div className="GItem-Button">Button</div>
        </div>
    </Fragment>
    // <p style={{ 'padding-left': 10 }}>
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
