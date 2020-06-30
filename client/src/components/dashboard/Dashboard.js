import React, { Fragment, useEffect } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Spinner from '../layout/Spinner';

import DashLogo from '../../img/MMeeterLogo.png';
import NextGathering from '../gatherings/NextGathering';
// import CheckPrivs from './CheckPrivs';
// import ClientDef from './ClientDef';
// import DashboardMeeterLogo from '../../img/DashboardMeeterLogo.png';
import Experience from './Experience';
import Education from './Education';
import { getCurrentProfile, deleteAccount } from '../../actions/profile';
import { getGatherings } from '../../actions/gathering';

const Dashboard = ({
    getGatherings,
    getCurrentProfile,
    deleteAccount,
    auth: { user, activeClient },
    gathering: { gatherings },
    auth,
    profile: { profile, loading },
}) => {
    useEffect(() => {
        console.log('(1)');
        //check for activeClient, get it if needed
        console.log('activeClient: ' + activeClient);
        if (!activeClient) {
            // when first logging in, sometimes the delay
            // in processing might get us to dashboard
            // before activeClient is set. If undefined,
            // go get the users default client value

            getCurrentProfile();
        }
        if (gatherings.length === 0) {
            getGatherings({ activeClient });
        }
    }, [activeClient]);
    useEffect(() => {
        getCurrentProfile();
        if (activeClient) {
            getGatherings({ activeClient });
        }
    }, [getGatherings, getCurrentProfile]);

    return loading ? (
        <Spinner />
    ) : (
        <Fragment>
            {/* <h1 className="large text-primary">Dashboard</h1> */}
            <img className='dashboardLogo' src={DashLogo} alt='Meeter' />
            <p className='lead'>
                <i className='fas fa-user' /> Welcome{' '}
                {user && user.name.replace(/ .*/, '')}
            </p>
            <strong>What's happening...</strong>
            {privledgedInfo(auth)}
            {/* <p>
                <h3>Next Meeting</h3>
                <NextGathering />
            </p> */}

            {/* {profile !== null ? (
                <Fragment>
                    <DashboardActions />
                    <Experience experience={profile.experience} />
                    <Education education={profile.education} />
                    <div className='my-2'>
                        <button
                            className='btn btn-danger'
                            onClick={() => deleteAccount()}
                        >
                            <i className='fas fa-user-minus' /> Delete My
                            Account
                        </button>
                    </div>
                </Fragment>
            ) : (
                <Fragment>
                    <p>
                        You have not yet setup a profile, please add some info
                    </p>
                    <Link to='/create-profile' className='btn btn-primary my-1'>
                        Create Profile
                    </Link>
                </Fragment>
            )} */}
        </Fragment>
    );
    function privledgedInfo(auth) {
        if (auth.activeStatus === 'approved') {
            return [
                <Fragment>
                    {/* <div>
                        <u>
                            <strong>What's happening...</strong>
                        </u>
                    </div> */}
                    <NextGathering gatherings={gatherings} />
                </Fragment>,
            ];
        } else {
            return [
                <div>
                    Please check with your system contact to get approved for
                    use.
                </div>,
            ];
        }
    }
};

Dashboard.propTypes = {
    getGatherings: PropTypes.func.isRequired,
    getCurrentProfile: PropTypes.func.isRequired,
    deleteAccount: PropTypes.func.isRequired,
    auth: PropTypes.object.isRequired,
    profile: PropTypes.object.isRequired,
    gathering: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
    auth: state.auth,
    profile: state.profile,
    gathering: state.gathering,
});

export default connect(mapStateToProps, {
    getGatherings,
    getCurrentProfile,
    deleteAccount,
})(Dashboard);
