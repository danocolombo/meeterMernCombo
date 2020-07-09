import React, { Component } from 'react';
import axios from 'axios';
import Chart from 'react-apexcharts';

class attenChart extends Component {
    constructor(props) {
        super(props);
        this.state = {
            options: {
                chart: {
                    background: '#f4f4f4',
                    foreColor: '#333',
                    toolbar: {
                        show: false,
                    },
                    dropShadow: {
                        enabled: true,
                        top: 0,
                        left: 0,
                        blur: 3,
                        opacity: 0.5,
                    },
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
                yaxis: {
                    show: true,
                    max: 20,
                    min: 0,
                    forceNiceScale: true,
                },
                title: {
                    text: 'Weekly Attendance',
                    align: 'center',
                    margin: 20,
                    offsetY: 20,
                    style: {
                        fontSize: '25px',
                    },
                },
                noData: {
                    text: 'Loading...',
                    align: 'center',
                    verticalAlign: 'middle',
                    offsetX: 0,
                    offsetY: 0,
                    styles: {
                        color: 'yellow',
                        fontSize: '14px',
                        fontFamily: 'tahoma',
                    },
                },
            },
            series: [],
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
    loadChart = () => {
        var url = '/api/chartdata/attendance/vpc';

        axios({
            method: 'GET',
            url: url,
        }).then(function (response) {
            chart.updateSeries([
                {
                    name: 'Sales',
                    data: response.data,
                },
            ]);
        });
    };
    render() {
        return (
            <React.Fragment>
                <Chart
                    options={this.state.options}
                    series={this.state.series}
                    type='line'
                    height='450'
                    width='100%'
                />
                <button onClick={this.onClick50}>Load Data</button>

                {/* <button style={{ margin: 25 }} onClick={this.onClick20}>
                    20
                </button> */}
            </React.Fragment>
        );
    }
}
export default attenChart;
