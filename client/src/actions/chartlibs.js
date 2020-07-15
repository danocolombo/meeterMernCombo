export const chartOptions = {};
const chart = {
    id: 'basic-bar',
    toolbox: {
        show: false
    },
    zoom: {
        enabled: false
    }
}
chartOptions.chart = chart;
const plotOptions = {
    bar: {
        columnWidth: '50%',
        endingShape: 'arrow'
    }
}
chartOptions.plotOptions = plotOptions;
const stroke = {
    width: [4, 0, 0],
}
chartOptions.stroke = stroke;
const xaxis = {
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
    ]
}
chartOptions.xaxis = xaxis;
const markers = {
    size: 6,
    strokeWidth: 3,
    fillOpacity: 0,
    strokeOpacity: 0,
    hover: {
        size: 8,
    }
}
chartOptions.markers = markers
const yaxis = {
    // tickAmount: 5,
    // min: 0,
    max: 35,
}

chartOptions.yaxis = yaxis;
//---------------------------
// Chart Series
export const chartSeries = [
    {
        name: 'series-1',
        type: 'line',
        data: [0, null, null, null, null, null, null, null, null, null],
    },
];