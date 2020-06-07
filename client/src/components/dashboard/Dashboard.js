import React, { Fragment, useEffect } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Spinner from '../layout/Spinner';
import DashboardActions from './DashboardActions';
import DashboardPic from '../../img/Dashboard1-200.png';
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
    auth,
    profile: { profile, loading },
}) => {
    useEffect(() => {
        if(activeClient){
            getGatherings({ activeClient });
        }
        getCurrentProfile();
    }, [getGatherings, getCurrentProfile]);

    return loading && profile === null ? (
        <Spinner />
    ) : (
        <Fragment>
            {/* <h1 className="large text-primary">Dashboard</h1> */}
            <img className='dashboardLogo' src={DashLogo} alt='Meeter' />
            <p className='lead'>
                <i className='fas fa-user' /> Welcome {user && user.name}
            </p>
            {/* <p>
                <h5>PRIVS</h5>
                <CheckPrivs />
            </p> */}
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
                    <div>
                        <u>
                            <strong>[Authorized Information]</strong>
                        </u>
                    </div>
                    <NextGathering />
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
};

const mapStateToProps = (state) => ({
    auth: state.auth,
    profile: state.profile,
});

export default connect(mapStateToProps, {
    getGatherings,
    getCurrentProfile,
    deleteAccount,
})(Dashboard);
