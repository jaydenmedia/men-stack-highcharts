/*
 * Type: Pie (semicircle)
 * Note: chart{type: 'columnrange'} uses highcharts-more.js
 * @returns {undefined}
 */
$(document).ready(function () {
    var creditCards = [],
            creditCardsTotal = 0,
            cash = [],
            cashTotal = 0,
            noCharge = [],
            noChargeTotal = 0,
            dispute = [],
            disputeTotal = 0,
            unknown = [],
            unknownTotal = 0,
            voidedTrip = [],
            voidedTripTotal = 0,
            dataResult = [];


    $.getJSON('/api/green', function (data) {
        for (var len = data.length, i = 0; i < len; i++) {
            switch (data[i]['Payment_type']) {
                case 1:
                    creditCards.push([data[i]['pickupTime'], data[i]['Total_amount']]);
                    creditCardsTotal += data[i]['Total_amount'];
                    break;
                case 2:
                    cash.push([data[i]['pickupTime'], data[i]['Total_amount']]);
                    cashTotal += data[i]['Total_amount'];
                    break;
                case 3:
                    noCharge.push([data[i]['pickupTime'], data[i]['Total_amount']]);
                    noChargeTotal += data[i]['Total_amount'];
                    break;
                case 4:
                    dispute.push([data[i]['pickupTime'], data[i]['Total_amount']]);
                    disputeTotal += data[i]['Total_amount'];
                    break;
                case 5:
                    unknown.push([data[i]['pickupTime'], data[i]['Total_amount']]);
                    unknownTotal += data[i]['Total_amount'];
                    break;
                case 6:
                    voidedTrip.push([data[i]['pickupTime'], data[i]['Total_amount']]);
                    voidedTripTotal += data[i]['Total_amount'];
                    break;
                default:
                    // console.log('no values exist');
            }

        }

    var allTotal = creditCardsTotal + cashTotal + noChargeTotal + disputeTotal + unknownTotal + voidedTripTotal;
        var creditCardsPrcnt = (creditCardsTotal / allTotal);
        var cashPrcnt = (cashTotal / allTotal);
        var noChargePrcnt = (noChargeTotal / allTotal);

    dataResult.push({
            type: 'pie',
            innerSize: '50%',
            data: [
                ['Credit Cards', creditCardsPrcnt],
                ['No Charge', noChargePrcnt],
                ['Cash', cashPrcnt]
            ]
        });


        var options = {
            chart: {
                renderTo: 'circlechart',
                plotBackgroundColor: null,
                plotBorderWidth: 0,
                plotShadow: false
            },
            title: {
                text: 'Payment<br>method',
                align: 'center',
                verticalAlign: 'middle',
                y: 50
            },
            tooltip: {
                pointFormat: '<b>{point.percentage:.1f}%</b>'
            },
            plotOptions: {
                pie: {
                    dataLabels: {
                        enabled: true,
                        distance: -50,
                        style: {
                            fontWeight: 'bold',
                            color: 'white',
                            textShadow: '0px 1px 2px black'
                        }
                    },
                    startAngle: -90,
                    endAngle: 90,
                    center: ['50%', '75%']
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