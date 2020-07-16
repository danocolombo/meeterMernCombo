import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
// import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
// import Spinner from '../layout/Spinner';
//-----------these are for expansion panels
import ExpansionPanel from '@material-ui/core/ExpansionPanel';
import ExpansionPanelDetails from '@material-ui/core/ExpansionPanelDetails';
import ExpansionPanelSummary from '@material-ui/core/ExpansionPanelSummary';
//--------------------
import UserProfileClients from './UserProfileClients';
// import ClientDef from './UserProfileClients';
const UserProfile = ({
    auth: { user, activeClient, activeRole, activeStatus },
}) => {
    const [showPasswordPanel, setPasswordPanel] = React.useState(false);
    const handleChange = (panel) => (event, isExpanded) => {
        setPasswordPanel(isExpanded ? panel : false);
    };
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
            <div>
                <ExpansionPanel
                    expanded={showPasswordPanel === 'panel1'}
                    onChange={handleChange('panel1')}
                >
                    <ExpansionPanelSummary
                        aria-controls='panel1bh-content'
                        id='panel1bh-header'
                    >
                        <h1>Change Password</h1>
                    </ExpansionPanelSummary>

                    <ExpansionPanelDetails>
                        <div className='posts'>
                            <Fragment>
                                <p>Feature coming soon...</p>
                                <br />
                                <br />
                            </Fragment>
                        </div>
                    </ExpansionPanelDetails>
                </ExpansionPanel>
            </div>
        </Fragment>
    );
};

UserProfile.propTypes = {
    auth: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
    auth: state.auth,
});

export default connect(mapStateToProps, {})(UserProfile);
