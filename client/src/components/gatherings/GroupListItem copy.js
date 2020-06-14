import React, { Fragment } from 'react'
import PropTypes from 'prop-types'
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { deleteGroup, getGroups } from '../../actions/gathering';

const GroupListItem = ({
    deleteGroup,
    group: { _id, gender, title, location, facilitator },
    gathering: { gathering };
}) => {
    useEffect(() => {
        if (activeClient) {
            getGroups(gathering._id);
            getDefGroups(activeClient);
        }
        
    }, []);
    return (
        <div className={'groupListItem'}>
            {gender}
        </div>
        <div>
            <p className='my-1'>
                {title}
            </p>
            <Fragment>
                <p>{location}</p>
            </Fragment>
        </div>
    )
}

GroupListItem.propTypes = {
    group: PropTypes.object.isRequired,
    deleteGroup: PropTypes.func.isRequired,
    gathering: PropTypes.object.isRequired,
}
const mapStateToProps = (state) => ({
    gathering: state.gathering;
});
export default connect(mapStateToProps, { deleteGroup })(GroupListItem);
