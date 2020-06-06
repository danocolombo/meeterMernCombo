import React, { Fragment, useEffect } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import Spinner from '../layout/Spinner';
import UserProfileClients from './UserProfileClients';
// import ClientDef from './UserProfileClients';
const UserProfile = ({
    auth: { user, activeClient, activeRole, activeStatus },
}) => {
    // useEffect(() => {
    //     //getProfileById(match.params.id);
    // }, [getProfileById, match.params.id]);
    let uid = user && user._id;
    return (
        <Fragment>
            <Fragment>
                <h2 className='large text-primary'>
                    <i className='far fa fa-cogs'></i> Your profile
                </h2>
                <p>Welcome {user && user.name}</p>
                <p>{uid}</p>
                <p>Active Client: {activeClient}</p>
                <p>Active Role: {activeRole}</p>
                <p>Active Status: {activeStatus}</p>
            </Fragment>
            <UserProfileClients uid={uid} />
        </Fragment>
    );
};
function greetings(u) {
    return [
        <Fragment>
            <dif>Greetings {u && u.name}</dif>
        </Fragment>,
    ];
}
UserProfile.propTypes = {
    auth: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
    auth: state.auth,
});

export default connect(mapStateToProps, {})(UserProfile);
