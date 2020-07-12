import React, { Component } from 'react';
import axios from 'axios';
import Chart from 'react-apexcharts';
import ApexCharts from 'apexcharts';

class attenChart extends Component {
    constructor(props) {
        super(props);
        this.updateCharts = this.updateCharts.bind(this);
        this.state = {
            theChartOptions: {
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
            },
            theChartSeries: [
                {
                    name: 'series-1',
                    type: 'line',
                    data: [8, 10, 10, 18, null, null, null, null, null, null],
                },
            ],
        };
    }
    onClick50 = () => {
        //this will demonstrate how to change a value in the state for y height
        this.setState({
            options: {
                ...this.state.options,
                yaxis: { ...this.state.options.yaxis, max: 50 },
            },
        });
    };
    onClick20 = () => {
        //this will demonstrate how to change a value in the state for y height
        this.setState({
            options: {
                ...this.state.options,
                yaxis: { ...this.state.options.yaxis, max: 20 },
            },
        });
    };

    //theChartSeries
    updateCharts() {
        const newChartSeries = [];
        const newChartOptions = [];

        this.state.theChartSeries.forEach((s) => {
            const data = [7, 10, 10, 18, 23, null, null, null, null, null];
            newChartSeries.push({ data: data, type: s.type });
        });

        // this.state.theChartOptions.forEach((s) => {
        //     const data = [
        //         '6/22',
        //         '6/29',
        //         '7/6',
        //         '7/13',
        //         '7/20',
        //         '7/27',
        //         '8/3',
        //         '8/10',
        //         '8/17',
        //         '8/24',
        //     ];
        //     newChartOptions.push({ 'xaxis.categories': data });
        // });

        this.setState({
            theChartSeries: newChartSeries,
            // theChartOptions: newChartOptions,
        });
        this.setState({
            options: {
                ...this.state.theChartOptions,
                xaxis: {
                    ...this.state.theChartOptions.xaxis,
                    categories: [
                        '6/22',
                        '6/29',
                        '7/6',
                        '7/13',
                        '7/20',
                        '7/27',
                        '8/3',
                        '8/10',
                        '8/17',
                        '8/24',
                    ],
                },
            },
        });
    }
    render() {
        return (
            <React.Fragment>
                <div id='chart'>
                    <Chart
                        options={this.state.theChartOptions}
                        series={this.state.theChartSeries}
                        type='line'
                        width='500'
                    />
                </div>
                <button onClick={this.updateCharts}>Update!</button>
            </React.Fragment>
        );
    }
}
export default attenChart;
