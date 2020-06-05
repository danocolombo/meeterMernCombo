import React, { Fragment, useEffect } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import Spinner from '../layout/Spinner';
import ProfileTop from '../profile/ProfileTop';
import ProfileAbout from '../profile//ProfileAbout';
import ProfileExperience from '../profile//ProfileExperience';
import ProfileEducation from '../profile//ProfileEducation';
import ProfileGithub from '../profile//ProfileGithub';
import { getProfileById } from '../../actions/profile';

const Admin = ({
    getProfileById,
    profile: { profile, loading },
    auth,
    match,
}) => {
    useEffect(() => {
        //getProfileById(match.params.id);
    }, [getProfileById, match.params.id]);

    return (
        <Fragment>
            <Fragment>
                <h2 className='large text-primary'>
                    <i className='far fa fa-cogs'></i> Admin
                </h2>
            </Fragment>
        </Fragment>
    );
};

Admin.propTypes = {
    getProfileById: PropTypes.func.isRequired,
    profile: PropTypes.object.isRequired,
    auth: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
    profile: state.profile,
    auth: state.auth,
});

export default connect(mapStateToProps, { getProfileById })(Admin);
