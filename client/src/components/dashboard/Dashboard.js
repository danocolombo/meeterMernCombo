import React, { Fragment, useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Spinner from '../layout/Spinner';

import DashLogo from '../../img/MMeeterLogo.png';
import AttenChart from '../charts/AttenChart';
import {Really} from '../charts/really';
import NextGathering from '../gatherings/NextGathering';
// import CheckPrivs from './CheckPrivs';
// import ClientDef from './ClientDef';
// import DashboardMeeterLogo from '../../img/DashboardMeeterLogo.png';
import { getCurrentProfile, deleteAccount } from '../../actions/profile';
import { getGatherings } from '../../actions/gathering';
import { getDashboardAttendData } from '../../actions/charts';


const Dashboard = ({
    getGatherings,
    getCurrentProfile,
    getDashboardAttendData,
    deleteAccount,
    auth: { user, activeClient },
    gathering: { gatherings },
    auth,
    profile: { profile, loading },
}) => {
    const [attenData, setAttenData] = useState({});
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
        setAttenData(getDashboardAttendData({activeClient}));
        // console.log('++++++++++++++++++++++++');
        // console.log('attenData: ' + attenData);
        // console.log('++++++++++++++++++++++++');
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
                <i className='fas fa-user' /> Welcome {user && user.name}
            </p>
            {/* <strong>What's happening...</strong>
            {privledgedInfo(auth)} */}
            <div className='chart-container'>
                {/* <ANewAttenChart cid={activeClient} aData={attenData} /> */}
                {/* <AttenChart cid={activeClient} aData={attenData} /> */}
                <Really cid={activeClient} aData={attenData}/>
            </div>
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
    getDashboardAttendData: PropTypes.func.isRequired,
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
    getDashboardAttendData,
})(Dashboard);
