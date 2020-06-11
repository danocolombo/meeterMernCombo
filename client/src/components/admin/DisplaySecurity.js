import React, { Fragment, useEffect } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Spinner from '../layout/Spinner';
import DefaultGroup from './DefaultGroup';
import Button from '@material-ui/core/Button';
import { getClientUsers, getDefGroups } from '../../actions/admin';

const DisplaySecurity = ({
    getClientUsers,
    getDefaultGroups,
    auth: { activeClient, activeRole, activeStatus },
    meeter: { defaultGroups, loading },
    historyView,
}) => {
    useEffect(() => {
        if (activeClient) {
            getClientUsers(activeClient);
            getDefGroups(activeClient);
        }
    }, [getDefGroups]);
    return loading ? (
        <Spinner />
    ) : (
        <Fragment>
            <div>
                <h2 className='large text-primary'>
                    <i className='fa fa-user-secret'></i>&nbsp;&nbsp;Admin /
                    Security
                </h2>
            </div>
            <p>This will be the security information for {activeClient}</p>
            <div className='posts'>
                {defaultGroups.map(dGroup => (
                <DefaultGroup key={dGroup._id} group={dGroup} />
                ))}
            </div>
        </Fragment>
    );
};

DisplaySecurity.defaultProps = {
    historyView: false,
};
DisplaySecurity.propTypes = {
    meeter: PropTypes.object.isRequired,
    getClientUsers: PropTypes.func.isRequired,
    getDefGroups: PropTypes.func.isRequired,
    auth: PropTypes.object.isRequired,
};
const mapStateToProps = (state) => ({
    auth: state.auth,
    
});
export default connect(mapStateToProps, { getClientUsers, getDefGroups })(DisplaySecurity);
