/* App.js */
import React, { Component } from 'react';
import CanvasJSReact from '../../utils/canvasjs.react';
var CanvasJSChart = CanvasJSReact.CanvasJSChart;

class ChartAttendance extends Component {
    render() {
        const options = {
            animationEnabled: true,
            exportEnabled: false,
            theme: 'light2', // "light1", "dark1", "dark2"
            title: {
                text: 'Wynnbrook CR Attendance',
            },
            axisY: {
                title: 'Attendance',
                // suffix: '%',
            },
            axisX: {
                title: 'Meetings',

                // prefix: 'W',
                // interval: 2,
            },
            data: [
                {
                    type: 'line',
                    // toolTipContent: 'Week {x}: {y}%',
                    xValueFormatString: 'MMM YYYY',
                    dataPoints: [
                        { x: new Date('2020-07-20'), y: 9 },
                        { x: new Date('2020-07-27'), y: 10 },
                        { x: new Date('2020-08-10'), y: 12 },
                        { x: new Date('2020-08-17'), y: 20 },
                        { x: new Date('2020-08-24'), y: 20 },
                        { x: new Date('2020-08-31'), y: 22 },
                        { x: new Date('2020-09-07'), y: 17 },
                        { x: new Date('2020-09-14'), y: 20 },
                        { x: new Date('2020-09-21'), y: 18 },
                        { x: new Date('2020-09-28'), y: 20 },
                        // { x: 1, y: 9 },
                        // { x: 2, y: 10 },
                        // { x: 3, y: 12 },
                        // { x: 4, y: 20 },
                        // { x: 5, y: 20 },
                        // { x: 6, y: 22 },
                        // { x: 7, y: 17 },
                        // { x: 8, y: 20 },
                        // { x: 9, y: 18 },
                        // { x: 10, y: 20 },
                    ],
                },
            ],
        };
        return (
            <div>
                <CanvasJSChart
                    options={options}
                    /* onRef={ref => this.chart = ref} */
                />
                {/*You can get reference to the chart instance as shown above using onRef. This allows you to access all chart properties and methods*/}
            </div>
        );
    }
}
export default ChartAttendance;
