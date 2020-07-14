const cProps = {
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
            data: [0, null, null, null, null, null, null, null, null, null],
        },
    ],
};