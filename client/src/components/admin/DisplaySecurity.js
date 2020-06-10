import React, { Fragment, useEffect } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Button from '@material-ui/core/Button';
import Spinner from '../layout/Spinner';
import { getClientUsers } from '../../actions/admin';

const DisplaySecurity = ({
    getClientUsers,
    auth: { activeClient, activeRole, activeStatus },
    historyView,
}) => {
    useEffect(() => {
        if (activeClient) {
            getClientUsers(activeClient);
        }
    }, []);
    return (
        <Fragment>
            <div>
                <h2 className='large text-primary'>
                    <i className='fa fa-user-secret'></i>&nbsp;&nbsp;Admin /
                    Security
                </h2>
            </div>
            <p>This will be the security information for {activeClient}</p>
        </Fragment>
    );
};

DisplaySecurity.defaultProps = {
    historyView: false,
};
DisplaySecurity.propTypes = {
    getClientUsers: PropTypes.func.isRequired,
    auth: PropTypes.object.isRequired,
};
const mapStateToProps = (state) => ({
    auth: state.auth,
});
export default connect(mapStateToProps, { getClientUsers })(DisplaySecurity);
