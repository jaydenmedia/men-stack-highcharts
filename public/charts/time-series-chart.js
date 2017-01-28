/*
 * Type: Time series zoomable
 * Note: 
 * @returns {undefined}
 */
$(document).ready(function () {
    var creditCards = [],
            cash = [],
            noCharge = [],
            dispute = [],
            unknown = [],
            voidedTrip = [],
            dataResult = [];


    $.getJSON('/api/green', function (data) {
        for (var len = data.length, i = 0; i < len; i++) {
            switch (data[i]['Payment_type']) {
                case 1:
                    creditCards.push([data[i]['pickupTime'], data[i]['Total_amount']]);
                    break;
                case 2:
                    cash.push([data[i]['pickupTime'], data[i]['Total_amount']]);
                    break;
                case 3:
                    noCharge.push([data[i]['pickupTime'], data[i]['Total_amount']]);
                    break;
                case 4:
                    dispute.push([data[i]['pickupTime'], data[i]['Total_amount']]);
                    break;
                case 5:
                    unknown.push([data[i]['pickupTime'], data[i]['Total_amount']]);
                    break;
                case 6:
                    voidedTrip.push([data[i]['pickupTime'], data[i]['Total_amount']]);
                    break;
                default:
                    // console.log('no values exist');
            }

        }

        dataResult.push({
            type: 'area',
            name: '$',
            pointInterval: 3600 * 1000,
            pointStart: Date.UTC(2016, 5, 1),
            data: creditCards
        });

        var options = {
            chart: {
                renderTo: 'timeserieschart',
                zoomType: 'x'
            },
            title: {
                text: 'Total Collected Each Hour'
            },
            subtitle: {
                text: document.ontouchstart === undefined ?
                        'Click and drag in the plot area to zoom in' :
                        'Pinch the chart to zoom in'
            },
            xAxis: {
                type: 'datetime',
                minRange: 0.5 * 24 * 3600000 // 10 hours
            },
            yAxis: {
                title: {
                    text: 'Total Collected ($)'
                }
            },
            legend: {
                enabled: false
            },
            plotOptions: {
                area: {
                    fillColor: {
                        linearGradient: {x1: 0, y1: 0, x2: 0, y2: 1},
                        stops: [
                            [0, Highcharts.getOptions().colors[0]],
                            [1, Highcharts.Color(Highcharts.getOptions().colors[0]).setOpacity(0).get('rgba')]
                        ]
                    },
                    marker: {
                        radius: 2
                    },
                    lineWidth: 1,
                    states: {
                        hover: {
                            lineWidth: 1
                        }
                    },
                    threshold: null
                }
            },
            credits: {
                enabled: false
            },
            series: dataResult
        };

        var chart = new Highcharts.Chart(options);
        
    });
});