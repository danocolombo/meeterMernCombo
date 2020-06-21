import React, { Fragment, useEffect } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Spinner from '../layout/Spinner';
import DefaultGroup from './DefaultGroup';
import ClientUser from './ClientUser';
import DefaultGroupForm from './DefaultGroupForm';
import Button from '@material-ui/core/Button';
import { getClientUsers, getDefGroups } from '../../actions/admin';

const DisplaySecurity = ({
    getClientUsers,
    getDefGroups,
    auth: { activeClient, activeRole, activeStatus },
    meeter: { defaultGroups, clientUsers, loading },
    historyView,
}) => {
    useEffect(() => {
        if (activeClient) {
            getClientUsers(activeClient);
            getDefGroups(activeClient);
        }
    }, []);
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
                <h1>Default Group Definitions</h1>

                {defaultGroups ? (
                    <table>
                        <tr>
                            <td>
                                {defaultGroups.map((dGroup) => (
                                    <DefaultGroup
                                        key={dGroup._id}
                                        defGroup={dGroup}
                                    />
                                ))}
                            </td>
                        </tr>
                    </table>
                ) : null}
                {activeRole == 'superuser' ? (
                    <DefaultGroupForm />
                ) : (
                    <Fragment>
                        <p>Feature coming soon...</p>
                        <br />
                        <br />
                    </Fragment>
                )}
            </div>
            <hr />
            <div className='posts'>
                <h1>Registered Users</h1>
                {clientUsers ? (
                    <table>
                        <tr>
                            <td>
                                {clientUsers.map((user) => (
                                    <ClientUser key={user._id} user={user} />
                                ))}
                            </td>
                        </tr>
                    </table>
                ) : null}
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
    meeter: state.meeter,
});
export default connect(mapStateToProps, { getClientUsers, getDefGroups })(
    DisplaySecurity
);
