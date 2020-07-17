import axios from 'axios';
import { setAlert } from './alert';
import { ADMIN_ERROR } from './types';
// import { chartOptions, chartSeries } from './chartlibs';

//apexcharts needs two configurations options and series...
const theChartOptions = {
    chart: {
        id: 'basic-bar',
        toolbar: {
            show: false,
        },
        zoom: {
            enabled: false,
        },
    },
    plotOptions: {
        bar: {
            columnWidth: '50%',
            endingShape: 'arrow',
        },
    },
    stroke: {
        width: [4, 0, 0],
    },
    xaxis: {
        categories: [
            '6/15',
            '6/22',
            '6/29',
            '7/6',
            '7/13',
            '7/20',
            '7/27',
            '8/3',
            '8/10',
            '8/17',
        ],
    },
    markers: {
        size: 6,
        strokeWidth: 3,
        fillOpacity: 0,
        strokeOpacity: 0,
        hover: {
            size: 8,
        },
    },
    yaxis: {
        // tickAmount: 5,
        // min: 0,
        max: 35,
    },
};
const theChartSeries = [
    {
        name: 'series-1',
        type: 'line',
        data: [0, null, null, null, null, null, null, null, null, null],
    },
];

export const dashAttenChart = (cid) => {
    // get the data from mongo...
    try {
        console.log('#### dashAttenChart starts here....');
        console.log('client: ' + cid);
        const response = axios
            .get(`/api/chartdata/attendance/${cid}`)
            .then(function (response) {
                //now we have data...

                console.log('MAYBE');
                const util = require('util');
                console.log(
                    'response returned: ' +
                        util.inspect(response, {
                            showHidden: false,
                            depth: null,
                        })
                );
                const json = response.data;
                console.log({ json });
                console.log('meetingsssss: ' + json.meetings.toString());
                console.log('attendance: ' + json.attendance.toString());
                let chartSeries = {};
                chartSeries = theChartSeries;
                let chartOptions = theChartOptions;
                //===============================
                // now update with latest info
                //===============================
                let tOptions = {
                    ...chartOptions,
                    yaxis: { ...chartOptions.yaxis, max: 25 },
                    xaxis: {
                        ...chartOptions.xaxis,
                        categories: [
                            '6/15',
                            '6/22',
                            '6/29',
                            '7/6',
                            '7/13',
                            '7/20',
                            '7/27',
                            '8/3',
                            '8/10',
                            '8/17',
                        ],
                    },
                    // chart: { ...chartOptions.chart, id: 'DANO' },
                };
                chartOptions = tOptions;
                console.log('WE ARE DONE....');
                let cData = {};
                cData.Series = chartSeries;
                cData.Options = chartOptions;
                return cData;
            });
        console.log('we got data back...');

        // copy state, update and update state
        // let newState = theChartOptions;
        // newState.xaxis.categories = json.meetings;
        // setChartOptions(newState);

        // newState = theChartSeries;
        // newState[0].data = json.attendance;
        // setChartSeries(newState);

        // aTest(cid);
        // const util = require('util');
        // console.log(
        //     'newState: ' +
        //         util.inspect(newState, {
        //             showHidden: false,
        //             depth: null,
        //         })
        // );
    } catch (error) {
        console.log('error getting dashattendata');
    }
};
