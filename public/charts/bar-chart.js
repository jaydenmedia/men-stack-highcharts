/*
 * Type: Bar Chart Columns with Negative Values
 * Note: 
 * @returns {undefined}
 */
$(document).ready(function () {
    var dataResult = [];

    $.getJSON('/api/g_travel_summary', function (data) {
        var arrIDs = [],
                arrValues = [],
                obj = {
                    name: 0,
                    data: []
                };


        data.forEach(function (item) {
            var id = item._id,
                    val = item.value;
            obj.name = val.VendorID;

            if (obj.name === 1) {
                arrIDs.push(val.TotalAmount);
            } else if (obj.name === 2) {
                arrValues.push(val.TotalAmount);
            } else {
                console.log('no value for record: ' + id);
            }
        });

        dataResult = [{name: '1', data: arrIDs}, {name: '2', data: arrValues}];


        var arrayAvg = function (array) {
            var average = 0;

            for (var i = 0, arrayLen = array.length; i < arrayLen; i++) {
                if (typeof (arrIDs[i]) === 'number') {
                    var sum = arrIDs[i];
                    average += (sum / arrayLen);
                } else {
                    //console.log(typeof (arrIDs[i]));
                }
            }
            return average;
        };

        var arraysAvg = function (array1, array2) {
            var arrAvg1 = 0,
                    arrAvg2 = 0;

            for (var i = 0, arrayLen1 = array1.length; i < arrayLen1; i++) {
                if (typeof (arrIDs[i]) === 'number') {
                    var sum = arrIDs[i];
                    arrAvg1 += (sum / arrayLen1);
                } else {
                    console.log(typeof (arrIDs[i]));
                }
            }
            for (var i = 0, arrayLen2 = array2.length; i < arrayLen2; i++) {
                if (typeof (arrIDs[i]) === 'number') {
                    var sum = arrIDs[i];
                    arrAvg2 += (sum / arrayLen2);
                    console.log(arrAvg2);
                } else {
                    console.log(typeof (arrIDs[i]));
                }
            }
            var average = (arrAvg1 + arrAvg2) / 2;
            return average;
        };

        var arrIDsAvg = arrayAvg(arrIDs),
                arrValuesAvg = arrayAvg(arrValues),
                arraysAvg = arrayAvg(arrIDsAvg, arrValuesAvg);

        var options = {
            chart: {
                renderTo: 'barchart',
                type: 'column'
            },
            title: {
                text: 'Column chart with negative values'
            },
            credits: {
                enabled: true
            },
            series: dataResult
        };

        var chart = new Highcharts.Chart(options);
        
    });
});