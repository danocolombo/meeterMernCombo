import React, { useState, useEffect } from 'react';
import Chart from 'react-apexcharts';
// import { getDashboardAttendData } from '../../actions/charts';
export const Really = ({ cid, aData }) => {
    const [theChartOptions, setChartOptions] = useState({
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
    });

    const [theChartSeries, setChartSeries] = useState([
        {
            name: 'attendance',
            type: 'line',
            // data: dashData.attendance,
            // data: newData,
            data: [0, null, null, null, null, null, null, null, null, null],
        },
    ]);
    // useEffect(() => {
    //     //if(theChartSeries){
    //     if (aData) {
    //         console.log('ready');
    //         // console.log('aData type: ' + typeof aData);
    //         // const util = require('util');
    //         // console.log(
    //         //     'aData: ' +
    //         //         util.inspect(aData, { showHidden: false, depth: null })
    //         // );
    //         // console.log('attendance[1]: ' + aData.attendance[1]);
    //         // console.log('attendance.length: ' + aData.attendance.length);
    //         //get the attendance numbers
    //         let attendance = [];
    //         if (aData.attendance) {
    //             for (let index = 0; index < aData.attendance.length; index++) {
    //                 attendance.push(aData.attendance[index]);
    //             }
    //             // console.log('attendance[] = ' + attendance.toString());
    //             // //gotta have 10, add nulls if necessary
    //             // console.log('attendance.length: ' + attendance.length);
    //             for (let index = attendance.length; index < 10; index++) {
    //                 attendance.push(null);
    //             }
    //         }
    //         // console.log('2 attendance[] = ' + attendance.toString());
    //         // console.log('attendance.length: ' + attendance.length);
    //         // //now get the meeting dates
    //         // console.log('meeting[1] : ' + aData.meetings[1]);
    //         let meetings = [];
    //         if (aData.meetings) {
    //             for (let index = 0; index < aData.meetings.length; index++) {
    //                 meetings.push(aData.meetings[index]);
    //             }
    //             // console.log('attenance: ' + attendance.toString());
    //             // console.log('meetings: ' + meetings.toString());
    //             // //gotta have 10
    //             for (let index = meetings.length; index < 10; index++) {
    //                 meetings.push(null);
    //             }
    //         }
    //         console.log('meetings: ' + meetings.toString());
    //         console.log('attendance: ' + attendance.toString());

    //         // console.log('aData type: ' + typeof aData);
    //         // console.log('aData length is ' + aData.length);
    //         // console.log('dashData type: ' + typeof dashData);
    //         // console.log('meetings: ' + dashData.meetings);
    //         // console.log('attenance: ' + aData.attendance);
    //     }
    // }, [aData]);
    useEffect(() => {
        async function fetchData() {
            try {
                const response = await fetch(
                    `/api/chartdata/attendance/${cid}`
                );
                const json = await response.json();
                console.log({ json });
                console.log('meetingsssss: ' + json.meetings.toString());
                console.log('attendance: ' + json.attendance.toString());
                // copy state, update and update state
                let newState = theChartOptions;
                newState.xaxis.categories = json.meetings;
                setChartOptions(newState);

                newState = theChartSeries;
                newState[0].data = json.attendance;
                setChartSeries(newState);
                // const util = require('util');
                // console.log(
                //     'newState: ' +
                //         util.inspect(newState, {
                //             showHidden: false,
                //             depth: null,
                //         })
                // );
            } catch (error) {}
        }
        if (cid != -'') {
            fetchData();
        }
    }, [theChartOptions, theChartSeries]);
    return (
        <div>
            <div>really client: {cid}</div>
            <div>
                AttenData from Dashboard
                <br />
            </div>
            <Chart
                options={theChartOptions}
                series={theChartSeries}
                type='line'
                width='500'
            />
        </div>
    );
};
export default Really;
