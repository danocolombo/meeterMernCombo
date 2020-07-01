import React, { Fragment, useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Spinner from '../layout/Spinner';
//--------------------------------------
//these are for expansion panels
import ExpansionPanel from '@material-ui/core/ExpansionPanel';
import ExpansionPanelDetails from '@material-ui/core/ExpansionPanelDetails';
import ExpansionPanelSummary from '@material-ui/core/ExpansionPanelSummary';
import Typography from '@material-ui/core/Typography';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
//--------------------------------------
import Modal from '../layout/Modal/Modal';
import UserConfirm from './UserConfirm';
import UserReject from './UserReject';
import DefaultGroup from './DefaultGroup';
import ClientUser from './ClientUser';
import DefaultGroupForm from './DefaultGroupForm';
import MeetingConfigForm from './MeetingConfigForm';

import {
    getClientUsers,
    getDefGroups,
    getMtgConfigs,
    grantUserRegistration,
} from '../../actions/admin';

const DisplaySecurity = ({
    getDefGroups,
    getMtgConfigs,
    getClientUsers,
    grantUserRegistration,
    auth: { activeClient, activeRole, activeStatus },
    meeter: { defaultGroups, clientUsers, loading },
    historyView,
}) => {
    useEffect(() => {
        if (activeClient) {
            getClientUsers(activeClient);
            getDefGroups(activeClient);
            getMtgConfigs(activeClient);
        }
    }, [activeClient, getClientUsers, getDefGroups, getMtgConfigs]);
    // const classes = useStyles();
    const [modalAction, setModalAction] = useState('');
    const [userSelected, setUserSelected] = useState('');
    const [userNameSelected, setUserNameSelected] = useState('');
    const [userEmail, setUserEmail] = useState('');

    // this initially hides the modal...
    const [showConfirmModal, setModal] = useState(false);
    const [showRejectModal, setRejectModal] = useState(false);
    // const [userId, setUserId] = useState('');
    const [expanded, setExpanded] = React.useState(false);
    const handleChange = (panel) => (event, isExpanded) => {
        setExpanded(isExpanded ? panel : false);
    };
    const handleApproval = (id, name, email) => {
        // this is coming back from the UI showing the register request.
        if (showRejectModal !== true) {
            setModalAction('approveUser');
            setModal(true); //show modal to grant access.
            setUserEmail(email);
            setUserSelected(id);
            setUserNameSelected(name);
        }
    };
    const handleRejection = (id, name) => {
        // this is coming back from the UI showing the register request.
        if (showConfirmModal !== true) {
            setModalAction('rejectUser');
            setRejectModal(true);
        }
    };
    const setRoleOfUser = (r) => {
        // this is coming back from modal with role assigned.
        if (r !== 'CANCEL') {
            console.log('########################################');
            console.log('DisplaySecurity :: setRoleOfUser');
            console.log('id: ' + userSelected);
            console.log('user: ' + userNameSelected);
            console.log('role: ' + r);
            console.log('email: ' + userEmail)
            console.log('Now we call api to update user record.');
            console.log('########################################');
            grantUserRegistration(activeClient, userSelected, r, userEmail);
        }
        setModal(false); // hide modal
    };
    const deleteRegistrationRequest = (r) => {
        // this is coming back from the UI as delete request.
        if (r !== 'CANCEL') {
            console.log('########################################');
            console.log('DisplaySecurity :: deleteRegistrationRequest');
            console.log('id: ' + userSelected);
            console.log('user: ' + userNameSelected);
            console.log('Now we call api to delete user record.');
            console.log('########################################');
        }
        setRejectModal(false);
    };
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
            <p>
                On this page you will find a variety of configurations and
                settings to manage your application.
            </p>

            <div className='medium'>
                <ExpansionPanel
                    expanded={expanded === 'panel1'}
                    onChange={handleChange('panel1')}
                >
                    <ExpansionPanelSummary
                        aria-controls='panel1bh-content'
                        id='panel1bh-header'
                    >
                        <h1>Default Group Definitions</h1>
                    </ExpansionPanelSummary>

                    <ExpansionPanelDetails>
                        <div className='posts'>
                            {defaultGroups ? (
                                <table>
                                    <thead>
                                        <tr></tr>
                                    </thead>
                                    <tbody>
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
                                    </tbody>
                                </table>
                            ) : null}
                            {/* {activeRole === 'superuser' ? (
                                <DefaultGroupForm />
                            ) : (
                                <Fragment>
                                    <p>Feature coming soon...</p>
                                    <br />
                                    <br />
                                </Fragment>
                            )} */}
                        </div>
                    </ExpansionPanelDetails>
                </ExpansionPanel>

                <ExpansionPanel
                    expanded={expanded === 'panel2'}
                    onChange={handleChange('panel2')}
                >
                    <ExpansionPanelSummary
                        aria-controls='panel1bh-content'
                        id='panel1bh-header'
                    >
                        <h1>Registered Users</h1>
                    </ExpansionPanelSummary>
                    <ExpansionPanelDetails>
                        <Modal show={showConfirmModal}>
                            <UserConfirm
                                handleAction={setRoleOfUser}
                                userName={userNameSelected}
                            />
                        </Modal>
                        <Modal show={showRejectModal}>
                            <UserReject
                                handleAction={deleteRegistrationRequest}
                                userName={userNameSelected}
                            />
                        </Modal>
                        <div className='posts'>
                            {clientUsers ? (
                                <table>
                                    <thead>
                                        <tr></tr>
                                    </thead>
                                    <tbody>
                                        <tr>
                                            <td>
                                                {clientUsers.map((user) => (
                                                    <ClientUser
                                                        key={user._id}
                                                        user={user}
                                                        approveAction={
                                                            handleApproval
                                                        }
                                                        deleteAction={
                                                            handleRejection
                                                        }
                                                    />
                                                ))}
                                            </td>
                                        </tr>
                                    </tbody>
                                </table>
                            ) : null}
                        </div>
                    </ExpansionPanelDetails>
                </ExpansionPanel>
                <ExpansionPanel
                    expanded={expanded === 'panel3'}
                    onChange={handleChange('panel3')}
                >
                    <ExpansionPanelSummary
                        aria-controls='panel1bh-content'
                        id='panel1bh-header'
                    >
                        <h1>Meeting Configurations</h1>
                    </ExpansionPanelSummary>

                    <ExpansionPanelDetails>
                        <div className='posts'>
                            {activeRole === 'superuser' ||
                            activeRole === 'owner' ? (
                                <MeetingConfigForm />
                            ) : (
                                <Fragment>
                                    <p>Feature coming soon...</p>
                                    <br />
                                    <br />
                                </Fragment>
                            )}
                        </div>
                    </ExpansionPanelDetails>
                </ExpansionPanel>
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
    getMtgConfigs: PropTypes.func.isRequired,
    grantUserRegistration: PropTypes.func.isRequired,
    auth: PropTypes.object.isRequired,
};
const mapStateToProps = (state) => ({
    auth: state.auth,
    meeter: state.meeter,
});
export default connect(mapStateToProps, {
    getClientUsers,
    getDefGroups,
    getMtgConfigs,
    grantUserRegistration,
})(DisplaySecurity);
