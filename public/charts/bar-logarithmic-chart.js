/*
 * Type: Bar Chart with Logarithmic Values
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
            switch (data[i]['Passenger_count']) {
                case 1:
                    creditCards.push([data[i]['Payment_type'], data[i]['Fare_amount']]);
                    break;
                case 2:
                    cash.push([data[i]['Payment_type'], data[i]['Fare_amount']]);
                    break;
                case 3:
                    noCharge.push([data[i]['Payment_type'], data[i]['Fare_amount']]);
                    break;
                case 4:
                    dispute.push([data[i]['Payment_type'], data[i]['Fare_amount']]);
                    break;
                case 5:
                    unknown.push([data[i]['Payment_type'], data[i]['Fare_amount']]);
                    break;
                case 6:
                    voidedTrip.push([data[i]['Payment_type'], data[i]['Fare_amount']]);
                    break;
                default:
                    // console.log('no values exist');
            }
        }


        dataResult.push({
            name: 'Credit Card',
            data: creditCards
        }, {
            name: 'Cash',
            data: cash
        }, {
            name: 'No Charge',
            data: noCharge
        }, {
            name: 'Dispute',
            data: dispute
        }, {
            name: 'Unknown',
            data: unknown
        }, {
            name: 'Voided Trip',
            data: voidedTrip
        });


        var options = {
            chart: {
                renderTo: 'barlogarithmicchart',
                type: 'bar',
                zoomType: 'xy'
            },
            title: {
                text: 'Total Amount By Payment Type'
            },
            subtitle: {
                text: document.ontouchstart === undefined ?
                        'Click and drag in the plot area to zoom in' :
                        'Pinch the chart to zoom in'
            },
            xAxis: {
                categories: ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9'],
                title: {
                    text: 'Passengers'
                }
            },
            yAxis: {
                min: 0,
                title: {
                    text: 'Total Amount (dollars)',
                    align: 'high'
                },
                labels: {
                    overflow: 'justify'
                }
            },
            tooltip: {
                valuePrefix: '$'
            },
            plotOptions: {
                bar: {
                    dataLabels: {
                        enabled: false
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

