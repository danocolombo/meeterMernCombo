import React, { useState } from 'react'
import PropTypes from 'prop-types'
import chartProps from './chartProps';
import Chart from 'react-apexcharts';
const aNewAttenChart = ({
    cid

}) => {
    const [aValue, setAValue] = useState('');
    // const [theChart, updateTheChart] = useState({
    //     theChartOptions: {
    //         chart: {
    //             id: 'basic-bar',
    //             toolbar: {
    //                 show: false,
    //             },
    //             zoom: {
    //                 enabled: false,
    //             },
    //         },
    //         plotOptions: {
    //             bar: {
    //                 columnWidth: '50%',
    //                 endingShape: 'arrow',
    //             },
    //         },
    //         stroke: {
    //             width: [4, 0, 0],
    //         },
    //         xaxis: {
    //             categories: [
    //                 '6/15',
    //                 '6/22',
    //                 '6/29',
    //                 '7/6',
    //                 '7/13',
    //                 '7/20',
    //                 '7/27',
    //                 '8/3',
    //                 '8/10',
    //                 '8/17',
    //             ],
    //         },
    //         markers: {
    //             size: 6,
    //             strokeWidth: 3,
    //             fillOpacity: 0,
    //             strokeOpacity: 0,
    //             hover: {
    //                 size: 8,
    //             },
    //         },
    //         yaxis: {
    //             // tickAmount: 5,
    //             // min: 0,
    //             max: 35,
    //         },
    //     },
    //     theChartSeries: [
    //         {
    //             name: 'series-1',
    //             type: 'line',
    //             data: [0, null, null, null, null, null, null, null, null, null],
    //         },
    //     ],
    // });

    // ^^^^^^^^^^ end of useState

    // const updateCharts = () => updateChart.bind;
    // const updateChart = (cid) => {
    //     const newChartSeries = [];
    //     const newChartOptions = [];
    //     const chartData = JSON.parse(this.props.aData);
    //     if(chartData.attendance.length<10){
    //         //need to add some nulls
    //         for (let index = chartData.attendance.length; index < 10; index++) {
    //             chartData.attendance.push(null);
                
    //         }
    //     }
    //     this.state.theChartSeries.forEach((s) => {
    //         //const data = [null, null, null, null, null, null, null, null, null, null];
    //         newChartSeries.push({ data: chartData.attendance, type: s.type });
    //     });
    //     this.setState({
    //         theChartSeries: newChartSeries,
    //     });
    //     console.log('in updateChart');
    //     //loop through the data and get the greatest value.
    //     let maxAttendance = 0;
    //     for (let index = 0; index < chartData.attendance.length; index++) {
    //         if(chartData.attendance[index] > maxAttendance){
    //             maxAttendance = chartData.attendance[index];
    //         }
            
    //     }
    //     const yMax = maxAttendance + 5;
    //     console.log('yMax: ' + yMax);
    //     // this.setState({
    //     //     theChartOptions: {
    //     //         ...this.state.theChartOptions,
    //     //         yaxis: { ...this.state.theChartOptions.yaxis, max: 50 },
    //     //     },
    //     // });
    //     console.log('in the belly');
    //     console.log('&&&&&&&&&&&&&&&&&&&&&&&&&&&&&');
    //     console.log(' we got props.aData');
    //     console.log('----------------------------------');
    //     console.log(this.props.aData);
        
    //     console.log('attendance: ' + chartData.attendance);
    //     // console.log('pts type is: ' + typeof pts);
    //     this.setState({
    //         theChartOptions: {
    //             ...this.state.theChartOptions,
    //             xaxis: { ...this.state.theChartOptions.xaxis, categories: chartData.meetings },
    //             yaxis: {...this.state.theChartOptions.yaxis, max: yMax },
    //         },
    //     });
    // }
    return (
        <div>
            <div>Client: {cid}</div>
        </div>
    )
};

aNewAttenChart.propTypes = {    
    cid: PropTypes.string.isRequired,
}

export default aNewAttenChart
