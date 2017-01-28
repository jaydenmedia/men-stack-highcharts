/* 
 * Signatures for various data types used in Highcharts
 * 
 * 
 */


/* HEAT MAP */
var heatmap = {
    xAxis: {
        categories: ['Alexander', 'Marie', 'Maximilian', 'Sophia', 'Lukas', 'Maria', 'Leon', 'Anna', 'Tim', 'Laura']
    },
    yAxis: {
        categories: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday']
    },
    series: [{
            name: 'Sales per employee',
            borderWidth: 1,
            data: [[0, 0, 10], [0, 1, 19]], // to nth...
            dataLabels: {
                enabled: true,
                color: '#000000'
            }
        }]
};


/* BUBBLE */
var bubble = {
    series: [{
            data: [[97, 36, 79], [94, 74, 60]] // to nth...
        }, {
            data: [[25, 10, 87], [2, 75, 59]] // to nth...
        }, {
            data: [[47, 47, 21], [20, 12, 4]] // to nth...
        }
    ]
};


/* SCATTER */
var scatter = {
    xAxis: {
        title: {
            enabled: true,
            text: 'Height (cm)'
        },
        startOnTick: true,
        endOnTick: true,
        showLastLabel: true
    },
    yAxis: {
        title: {
            text: 'Weight (kg)'
        }
    },
    series: [{
            name: 'Female',
            color: 'rgba(223, 83, 83, .5)',
            data: [[161.2, 51.6], [167.5, 59.0]] // to nth...

        }, {
            name: 'Male',
            color: 'rgba(119, 152, 191, .5)',
            data: [[174.0, 65.6], [175.3, 71.8]] // to nth...
        }
    ]
};


/* SEMICIRCLE */
var semicircle = {
    series: [{
            type: 'pie',
            name: 'Browser share',
            innerSize: '50%',
            data: [
                ['Firefox', 45.0],
                ['IE', 26.8],
                ['Chrome', 12.8],
                ['Safari', 8.5],
                ['Opera', 6.2],
                {
                    name: 'Others',
                    y: 0.7,
                    dataLabels: {
                        enabled: false
                    }
                }
            ]
        }]
};


/* CIRCLE */
var circle = function () {
    var categories = ['MSIE', 'Firefox', 'Chrome', 'Safari', 'Opera'];
    var data = [{
            y: 55.11,
            color: colors[0],
            drilldown: {
                name: 'MSIE versions',
                categories: ['MSIE 6.0', 'MSIE 7.0', 'MSIE 8.0', 'MSIE 9.0'],
                data: [10.85, 7.35, 33.06, 2.81],
                color: colors[0]
            }
        }, {
            y: 21.63,
            color: colors[1],
            drilldown: {
                name: 'Firefox versions',
                categories: ['Firefox 2.0', 'Firefox 3.0', 'Firefox 3.5', 'Firefox 3.6', 'Firefox 4.0'],
                data: [0.20, 0.83, 1.58, 13.12, 5.43],
                color: colors[1]
            }
        }, {
            y: 11.94,
            color: colors[2],
            drilldown: {
                name: 'Chrome versions',
                categories: ['Chrome 5.0', 'Chrome 6.0', 'Chrome 7.0', 'Chrome 8.0', 'Chrome 9.0',
                    'Chrome 10.0', 'Chrome 11.0', 'Chrome 12.0'],
                data: [0.12, 0.19, 0.12, 0.36, 0.32, 9.91, 0.50, 0.22],
                color: colors[2]
            }
        }, {
            y: 7.15,
            color: colors[3],
            drilldown: {
                name: 'Safari versions',
                categories: ['Safari 5.0', 'Safari 4.0', 'Safari Win 5.0', 'Safari 4.1', 'Safari/Maxthon',
                    'Safari 3.1', 'Safari 4.1'],
                data: [4.55, 1.42, 0.23, 0.21, 0.20, 0.19, 0.14],
                color: colors[3]
            }
        }, {
            y: 2.14,
            color: colors[4],
            drilldown: {
                name: 'Opera versions',
                categories: ['Opera 9.x', 'Opera 10.x', 'Opera 11.x'],
                data: [0.12, 0.37, 1.65],
                color: colors[4]
            }
        }];

    series: [{
            name: 'Browsers',
            colorByPoint: true,
            data: browserData,
            size: '60%',
            dataLabels: {
                formatter: function () {
                    return this.y > 5 ? this.point.name : null;
                },
                color: 'white',
                distance: -30
            }
        }, {
            name: 'Versions',
            data: versionsData,
            size: '80%',
            innerSize: '60%',
            dataLabels: {
                formatter: function () {
                    // display only if larger than 1
                    return this.y > 1 ? '' + this.point.name + ': ' + this.y + '%' : null;
                }
            }
        }
    ];
    drilldown: {
        series: versionsData //drilldownSeries
    }
};

/* Bar Chart Column Range */
var bar_chart_column_range = {
    xAxis: {
        categories: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']
    },
    yAxis: {
        title: {
            text: 'Temperature ( \xB0C )'
        }
    },
    series: [{
            name: 'Temperatures',
            data: [
                [-9.7, 9.4],
                [-8.7, 6.5]
            ]
        }]
};


/* Bar Chart Columns with Negative Values */
var bar_chart_columns_neg_values = {
    xAxis: {
        categories: ['Apples', 'Oranges', 'Pears', 'Grapes', 'Bananas']
    },
    series: [{
            name: 'John',
            data: [5, 3, 4, 7, 2]
        }, {
            name: 'Jane',
            data: [2, -2, -3, 2, 1]
        }, {
            name: 'Joe',
            data: [3, 4, 4, -2, 5]
        }
    ]
};


/* Bar Chart with Negative Values */
var bar_chart_neg_values = {
    xAxis: {
        categories: ['Apples', 'Oranges', 'Pears', 'Grapes', 'Bananas']
    },
    credits: {
        enabled: false
    },
    series: [{
            name: 'John',
            data: [5, 3, 4, 7, 2]
        }, {
            name: 'Jane',
            data: [2, -2, -3, 2, 1]
        }, {
            name: 'Joe',
            data: [3, 4, 4, -2, 5]
        }
    ]
};


/* Time series zoomable */
var time_series_zoomable = {
    xAxis: {
        type: 'datetime',
        minRange: 14 * 24 * 3600000 // fourteen days
    },
    yAxis: {
        title: {
            text: 'Exchange rate'
        }
    },
    series: [{
            type: 'area',
            name: 'USD to EUR',
            pointInterval: 24 * 3600 * 1000,
            pointStart: Date.UTC(2006, 0, 1),
            data: [
                0.8446, 0.8445, 0.8444, 0.8451, 0.8418, 0.8264, 0.8258, 0.8232, 0.8233, 0.8258,
                0.8283, 0.8278, 0.8256, 0.8292, 0.8239, 0.8239, 0.8245, 0.8265, 0.8261, 0.8269
            ]
        }
    ]
};


/* Time interval */
var time_interval = {
    xAxis: {
        type: 'datetime',
        dateTimeLabelFormats: {// don't display the dummy year
            month: '%e. %b',
            year: '%b'
        },
        title: {
            text: 'Date'
        }
    },
    yAxis: {
        title: {
            text: 'Snow depth (m)'
        },
        min: 0
    },
    series: [{
            name: 'Winter 2007-2008',
            // Define the data points. All series have a dummy year
            // of 1970/71 in order to be compared on the same x axis. Note
            // that in JavaScript, months start at 0 for January, 1 for February etc.
            data: [
                [Date.UTC(1970, 9, 27), 0],
                [Date.UTC(1970, 10, 10), 0.6],
                [Date.UTC(1970, 10, 18), 0.7]
            ]
        }, {
            name: 'Winter 2008-2009',
            data: [
                [Date.UTC(1970, 9, 18), 0],
                [Date.UTC(1970, 9, 26), 0.2],
                [Date.UTC(1970, 11, 1), 0.47]
            ]
        }, {
            name: 'Winter 2009-2010',
            data: [
                [Date.UTC(1970, 9, 9), 0],
                [Date.UTC(1970, 9, 14), 0.15],
                [Date.UTC(1970, 10, 28), 0.35]
            ]
        }
    ]
};


/* Basic Area */
var basic_area = {
    xAxis: {
            allowDecimals: false,
            labels: {
                formatter: function () {
                    return this.value; // clean, unformatted number for year
                }
            }
        },
        yAxis: {
            title: {
                text: 'Nuclear weapon states'
            },
            labels: {
                formatter: function () {
                    return this.value / 1000 + 'k';
                }
            }
        },
        series: [{
                name: 'USA',
                data: [null, null, null, null, null, 6, 11, 32, 110, 235, 369, 640,
                    1005, 1436, 2063, 3057, 4618, 6444, 9822, 15468, 20434, 24126]
            }, {
                name: 'USSR/Russia',
                data: [null, null, null, null, null, null, null, null, null, null,
                    5, 25, 50, 120, 150, 200, 426, 660, 869, 1060, 1605, 2471, 3322]
            }
        ]
};


/* Basic Area */
var basic_area = {
    xAxis: {
            categories: ['Apples', 'Oranges', 'Pears', 'Grapes', 'Bananas']
        },
        series: [{
                name: 'John',
                data: [5, 3, 4, 7, 2]
            }, {
                name: 'Jane',
                data: [2, -2, -3, 2, 1]
            }, {
                name: 'Joe',
                data: [3, 4, 4, -2, 5]
            }
        ]
};


/* Area Stacked */
var area_stacked = {
    xAxis: {
            categories: ['1750', '1800', '1850', '1900', '1950', '1999', '2050'],
            tickmarkPlacement: 'on',
            title: {
                enabled: false
            }
        },
        yAxis: {
            title: {
                text: 'Billions'
            },
            labels: {
                formatter: function () {
                    return this.value / 1000;
                }
            }
        },
        series: [{
                name: 'Asia',
                data: [502, 635, 809, 947, 1402, 3634, 5268]
            }, {
                name: 'Africa',
                data: [106, 107, 111, 133, 221, 767, 1766]
            }, {
                name: 'Europe',
                data: [163, 203, 276, 408, 547, 729, 628]
            }, {
                name: 'America',
                data: [18, 31, 54, 156, 339, 818, 1201]
            }, {
                name: 'Oceania',
                data: [2, 2, 2, 6, 13, 30, 46]
            }
        ]
};


/* Area Range and Line */
var area_range_line = {
    ranges: [
        [1246406400000, 14.3, 27.7],
        [1246492800000, 14.5, 27.8],
        [1246579200000, 15.5, 29.6]
    ],
    averages: [
        [1246406400000, 21.5],
        [1246492800000, 22.1],
        [1246579200000, 23]
    ],
    series: [{
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
            }
        ]
};


/* Area Range */
var area_range = {
    data: [
        /* 2014-01-01 */
        [1388538000000, 1.1, 4.7],
        [1388624400000, 1.8, 6.4],
        [1388710800000, 1.7, 6.9]
        /* 2014-02-01 */
        [1391216400000, -2.7, 2.6],
        [1391302800000, -1.3, 8.2],
        [1391389200000, 1.5, 7.7]
        /* 2014-03-01 */
        [1393635600000, 2.1, 8.9],
        [1393722000000, 0.6, 6.1],
        [1393808400000, 1.2, 9.4]
    ],
    xAxis: {
            type: 'datetime'
        },
        yAxis: {
            title: {
                text: null
            }
        },
        series: [{
                name: 'Temperatures',
                data: data
            }]
};


/* Bar Logarithmic */
var bar = {
    series: [{}],
        yAxis: {
            type: 'logarithmic'
        },
        xAxis: {
            categories: []
        },
        
        getData: function() {
        //$.getJSON('/api/g_extra_totals', function (data) {
        var arrIDs = [],
                arrValues = [];

        data.forEach(function (item) {
            var id = item._id,
                    val = item.value;

            arrIDs.push("$" + id);
            arrValues.push(val);
        });

        bar.series[0].name = 'Number of occurrences';
        bar.series[0].data = arrValues;
        //options.series[1].name = 'Number of People';
        bar.xAxis.categories = arrIDs;

        var chart = new Highcharts.Chart(options);
        }
    //});
};


/* Histogram with Scatter */
var histogram_scatter = {
    arrArray: [[],[]],
    series: [{
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
                }]
};


/* Scatter Plot with Regression Line */
var scatter_regression = {
    arrArray: [[],[]],
    series: [{
                    type: 'line',
                    name: 'Regression Line',
                    data: histogram(arrArray, 10),
                    marker: {
                        enabled: false
                    },
                    states: {
                        hover: {
                            lineWidth: 0
                        }
                    },
                    enableMouseTracking: false
                }, {
                    type: 'scatter',
                    name: 'Observations',
                    data: arrArray,
                    marker: {
                        radius: 4
                    }
                }]
};



