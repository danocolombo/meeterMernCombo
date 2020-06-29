import React, { Fragment, useEffect } from 'react';
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

import DefaultGroup from './DefaultGroup';
import ClientUser from './ClientUser';
import DefaultGroupForm from './DefaultGroupForm';
import MeetingConfigForm from './MeetingConfigForm';

import {
    getClientUsers,
    getDefGroups,
    getMtgConfigs,
} from '../../actions/admin';

const DisplaySecurity = ({
    getDefGroups,
    getMtgConfigs,
    getClientUsers,
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
    const [expanded, setExpanded] = React.useState(false);
    const handleChange = (panel) => (event, isExpanded) => {
        setExpanded(isExpanded ? panel : false);
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
                        <div className='posts'>
                            {clientUsers ? (
                                <table>
                                    <tr>
                                        <td>
                                            {clientUsers.map((user) => (
                                                <ClientUser
                                                    key={user._id}
                                                    user={user}
                                                />
                                            ))}
                                        </td>
                                    </tr>
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
})(DisplaySecurity);
