import React, { Fragment, useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Spinner from '../layout/Spinner';

import DashLogo from '../../img/MMeeterLogo.png';
import AttenChart from '../charts/AttenChart';
import { Really } from '../charts/really';
import NextGathering from '../gatherings/NextGathering';
// import CheckPrivs from './CheckPrivs';
// import ClientDef from './ClientDef';
// import DashboardMeeterLogo from '../../img/DashboardMeeterLogo.png';
import { getCurrentProfile, deleteAccount } from '../../actions/profile';
import { getGatherings } from '../../actions/gathering';
import { dashAttenChart } from '../../actions/charts';

const Dashboard = ({
    getGatherings,
    getCurrentProfile,
    // dashAttenChart,
    deleteAccount,
    auth: { user, activeClient },
    gathering: { gatherings },
    auth,
    profile: { profile, loading },
}) => {
    const [chartReady, setChartReady] = useState(false);
    const [attenData, setAttenData] = useState({});
    useEffect(() => {
        //check for activeClient, get it if needed
        if (!activeClient) {
            // when first logging in, sometimes the delay
            // in processing might get us to dashboard
            // before activeClient is set. If undefined,
            // go get the users default client value

            getCurrentProfile();
        }
    }, [activeClient]);
    useEffect(() => {
        getCurrentProfile();
        if (activeClient) {
            getGatherings({ activeClient });
        }
    }, [getGatherings, getCurrentProfile]);
    useEffect(() => {
        if (activeClient) {
            let chartInfo = {};
            chartInfo = dashAttenChart(activeClient);
            let DEBUG = true;
            if (DEBUG) {
                const util = require('util');
                console.log(
                    'chartInfo: ' +
                        util.inspect(chartInfo, {
                            showHidden: false,
                            depth: null,
                        })
                );

                setAttenData(chartInfo);
                if (chartInfo) setChartReady(true);
                if (!chartInfo) console.log('no data');
            }
        }
        if (gatherings.length === 0) {
            getGatherings({ activeClient });
        }
    }, [attenData]);
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
                {chartReady ? (
                    <Really cid={activeClient} aData={attenData} />
                ) : (
                    <div>Enjoy your day!</div>
                )}
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
