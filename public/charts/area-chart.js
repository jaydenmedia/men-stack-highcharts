/*
 * Type: Area
 * Note: chart{type: 'columnrange'} uses highcharts-more.js
 * @returns {undefined}
 */
$(document).ready(function () {
    var ranges = [],
            averages = [],
            dataResult = [];


    $.getJSON('/api/green', function (data) {
        var max = 0,
                min = 0;

        for (var len = data.length, i = 0; i < len; i++) {

            var pickup = Date.parse(data[i].lpep_pickup_datetime) / 1000;
            var passengerCount = data[i].Passenger_count;

            (passengerCount >= max) ? max = passengerCount : 1;
            (passengerCount <= min) ? min = passengerCount : 1;

            var avg = (min + max) / 2;

            ranges.push([pickup, min, max]);
            averages.push([pickup, avg]);
        }

        dataResult.push({
            name: 'Temperature',
            data: averages,
            zIndex: 1,
            marker: {
                fillColor: 'white',
                lineWidth: 2,
                lineColor: Highcharts.getOptions().colors[0]
            }
        }, {
            name: 'Range',
            data: ranges,
            type: 'arearange',
            lineWidth: 0,
            linkedTo: ':previous',
            color: Highcharts.getOptions().colors[0],
            fillOpacity: 0.3,
            zIndex: 0
        });


        var options = {
            chart: {
                renderTo: 'areachart'
            },
            title: {
                text: 'June 2016 Taxi Pickups'
            },
            xAxis: {
                type: 'datetime'
            },
            yAxis: {
                title: {
                    text: null
                }
            },
            tooltip: {
                shared: true,
                crosshairs: true,
                valueSuffix: '\xB0C'
            },
            legend: {
            },
            series: dataResult
        };

        var chart = new Highcharts.Chart(options);
        
    });
});