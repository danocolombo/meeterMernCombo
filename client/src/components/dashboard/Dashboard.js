import React, { Fragment, useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Spinner from '../layout/Spinner';

import DashLogo from '../../img/MMeeterLogo.png';
import { Really } from '../charts/really';

import { getCurrentProfile, deleteAccount } from '../../actions/profile';
import { getGatherings } from '../../actions/gathering';
import { dashAttenChart } from '../../actions/chart';

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
        console.log('chartReady: ' + chartReady);

        if (activeClient) {
            async function getChartData() {
                let chartInfo = {};
                chartInfo = dashAttenChart(activeClient);
                const util = require('util');
                if (chartInfo) {
                    console.log(
                        'chartInfo: ' +
                            util.inspect(chartInfo, {
                                showHidden: false,
                                depth: null,
                            })
                    );
                }
                setAttenData(chartInfo);
                console.log('Dashboardjs : chartInfo:');
                console.log(chartInfo.Meetings);
                if (chartInfo) setChartReady(true);
                if (!chartInfo) console.log('no data');
            }
            //execute the async function
            getChartData();
            console.log('done getting getChartData in useEffect');
        }
        console.log('chartReady: ' + chartReady);
    }, [activeClient, getCurrentProfile]);
    useEffect(() => {
        getCurrentProfile();
        if (activeClient) {
            getGatherings({ activeClient });
        }
    }, [getGatherings, getCurrentProfile]);
    // useEffect(() => {
    //     //scoped function to get data
    //     if (activeClient) {
    //         async function getChartData() {
    //             let chartInfo = {};
    //             chartInfo = dashAttenChart(activeClient);
    //             const util = require('util');
    //             console.log(
    //                 'chartInfo: ' +
    //                     util.inspect(chartInfo, {
    //                         showHidden: false,
    //                         depth: null,
    //                     })
    //             );
    //             setAttenData(chartInfo);
    //             if (chartInfo) setChartReady(true);
    //             if (!chartInfo) console.log('no data');
    //         }
    //         //execute the async function
    //         getChartData();
    //         console.log('done getting getChartData in useEffect');
    //     }
    // }, [activeClient]);

    // useEffect(() => {
    //     if (activeClient) {
    //         let chartInfo = {};

    //         chartInfo = dashAttenChart(activeClient);

    //         const util = require('util');
    //         console.log(
    //             'chartInfo: ' +
    //                 util.inspect(chartInfo, {
    //                     showHidden: false,
    //                     depth: null,
    //                 })
    //         );

    //         setAttenData(chartInfo);
    //         if (chartInfo) setChartReady(true);
    //         if (!chartInfo) console.log('no data');
    //     }
    //     if (gatherings.length === 0) {
    //         getGatherings({ activeClient });
    //     }
    // }, []);
    return loading ? (
        <Spinner />
    ) : (
        <Fragment>
            {/* <h1 className="large text-primary">Dashboard</h1> */}
            <img className='dashboardLogo' src={DashLogo} alt='Meeter' />
            <p className='lead'>
                <i className='fas fa-user' /> Welcome {user && user.name}
            </p>
            <div className='chart-container'>
                {chartReady ? (
                    <Really cid={activeClient} aData={attenData} />
                ) : (
                    <div>Enjoy your day!</div>
                )}
            </div>
        </Fragment>
    );
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
