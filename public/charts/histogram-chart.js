/*
 * Type: Histogram with Scatter Plot
 * Note: 
 * @returns {undefined}
 */
$(document).ready(function () {
    var arrIDs = [],
            arrValues = [],
            arrArray = [],
            dataResult = [];


    $.getJSON('/api/g_fare_amount_totals', function (data) {
        data.forEach(function (item) {
            var id = item._id,
                    val = item.value;

            arrIDs.push("$" + id);
            arrValues.push(val);
            arrArray.push([id, val]);
        });

        /**
         * Get histogram data out of xy data
         * @param   {Array} data  Array of tuples [x, y]
         * @param   {Number} step Resolution for the histogram
         * @returns {Array}       Histogram data
         */
        function histogram(arrArray, step) {
            var histo = {},
                    x,
                    i,
                    arr = [];

            // Group down
            for (i = 0; i < arrArray.length; i++) {
                x = Math.floor(arrArray[i][0] / step) * step;
                if (!histo[x]) {
                    histo[x] = 0;
                }
                histo[x]++;
            }

            // Make the histo group into an array
            for (x in histo) {
                if (histo.hasOwnProperty((x))) {
                    arr.push([parseFloat(x), histo[x]]);
                }
            }

            arr.sort(function (a, b) {
                return a[0] - b[0];
            });

            return arr;

        }

        dataResult.push({
            name: 'Histogram',
            type: 'column',
            data: histogram(arrArray, 10),
            pointPadding: 0,
            groupPadding: 0,
            pointPlacement: 'between'
        }, {
            name: 'XY data',
            type: 'scatter',
            data: arrArray,
            yAxis: 1,
            marker: {
                radius: 1.5
            }
        });


        var options = {
            chart: {
                renderTo: 'histogramscatterchart',
                type: 'column',
                zoomType: 'xy'
            },
            title: {
                text: 'Fare Amount Totals'
            },
            subtitle: {
                text: document.ontouchstart === undefined ?
                        'Click and drag in the plot area to zoom in' :
                        'Pinch the chart to zoom in'
            },
            xAxis: {
                gridLineWidth: 1,
                title: {
                    text: 'Total Spent ($)'
                }
            },
            yAxis: [{
                    title: {
                        text: 'Histogram Count'
                    }
                }, {
                    opposite: true,
                    title: {
                        text: 'Total Occurances'
                    }
                }],
            credits: {
                enabled: false
            },
            series: dataResult
        };
        
        var chart = new Highcharts.Chart(options);
        
    });
});


            