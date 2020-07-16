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

export const getDashboardAttendData = (cid) => (dispatch) => {
    try {
        console.log('@@@@@@@@@@@@@@@@@@@@@@@@@');
        console.log('actions/chart :: getDashboardAttendData (' + cid + ')');
        // const res = await axios.get(`/api/chartdata/attendance/${cid}`);
        // we expect to get some data, but it is not clear how much. The
        // goal is to return the latest 10. If we don't get 10, pad to
        // the future.
        // const aCount = res.data.size();
        // console.log('aCount:' + aCount);
        // res.data.map(r => {
        //     console.log('Meeting: ' + r.x);
        // })
        // const latestAttenance =

        const mtgs = ['6/15', '6/22', '6/29', '7/6', '7/14'];
        const points = [6, 10, 10, 19, 8];
        const aData = {
            attendance: points,
            meetings: mtgs,
        };
        const util = require('util');
        console.log(
            'action::aData: ' +
                util.inspect(aData, { showHidden: false, depth: null })
        );
        return aData;
    } catch (err) {
        console.log('actions/chart.js getDashboardAttendData ADMIN_ERROR');
        dispatch({
            type: ADMIN_ERROR,
        });
    }
};
export const aTest = (cid) => {
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
                '8/11',
                '8/17',
            ],
        },
        // chart: { ...chartOptions.chart, id: 'DANO' },
    };
    chartOptions = tOptions;

    // let tSeries = {
    //     ...chartSeries,
    //     name: 'series-X',
    // };
    // chartSeries = tSeries;

    // const util = require('util');
    // console.log(
    //     'chartSeries: ' +
    //         util.inspect(chartSeries, { showHidden: false, depth: null })
    // );
    // console.log(
    //     'chartOptions: ' +
    //         util.inspect(chartOptions, { showHidden: false, depth: null })
    // );
    let cData = {};
    cData.Series = chartSeries;
    cData.Options = chartOptions;
    return cData;
};
