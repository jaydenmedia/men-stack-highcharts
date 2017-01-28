/*
 * Type: Scatter Plot
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
                    creditCards.push([data[i]['Fare_amount'], data[i]['Trip_distance']]);
                    break;
                case 2:
                    cash.push([data[i]['Fare_amount'], data[i]['Trip_distance']]);
                    break;
                case 3:
                    noCharge.push([data[i]['Fare_amount'], data[i]['Trip_distance']]);
                    break;
                case 4:
                    dispute.push([data[i]['Fare_amount'], data[i]['Trip_distance']]);
                    break;
                case 5:
                    unknown.push([data[i]['Fare_amount'], data[i]['Trip_distance']]);
                    break;
                case 6:
                    voidedTrip.push([data[i]['Fare_amount'], data[i]['Trip_distance']]);
                    break;
                default:
                    console.log('no values exist');
            }

        }

        dataResult.push({
            name: 'Credit Card',
            data: creditCards
        }, {
            name: 'Cash',
            data: cash
        },
                {
                    name: 'No Charge',
                    data: noCharge
                }, {
            name: 'Dispute',
            data: dispute
        },
                {
                    name: 'Unknown',
                    data: unknown
                }, {
            name: 'Voided Trip',
            data: voidedTrip
        });



        var options = {
            chart: {
                renderTo: 'scatterchart',
                type: 'scatter',
                zoomType: 'xy'
            },
            title: {
                text: 'Fare Amount / Trip Distance By Payment Type'
            },
            subtitle: {
                text: document.ontouchstart === undefined ?
                        'Click and drag in the plot area to zoom in' :
                        'Pinch the chart to zoom in'
            },
            xAxis: {
                title: {
                    enabled: true,
                    text: 'Fare Amount ($)'
                },
                startOnTick: true,
                endOnTick: true,
                showLastLabel: true
            },
            yAxis: {
                title: {
                    text: 'Distance Traveled (miles)'
                }
            },
            legend: {
                layout: 'vertical',
                align: 'left',
                verticalAlign: 'top',
                x: 100,
                y: 70,
                floating: true,
                backgroundColor: (Highcharts.theme && Highcharts.theme.legendBackgroundColor) || '#FFFFFF',
                borderWidth: 1
            },
            plotOptions: {
                scatter: {
                    marker: {
                        radius: 5,
                        states: {
                            hover: {
                                enabled: true,
                                lineColor: 'rgb(100,100,100)'
                            }
                        }
                    },
                    states: {
                        hover: {
                            marker: {
                                enabled: false
                            }
                        }
                    },
                    tooltip: {
                        headerFormat: '<b>{series.name}</b><br>',
                        pointFormat: '${point.x}, {point.y} miles'
                    }
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


            