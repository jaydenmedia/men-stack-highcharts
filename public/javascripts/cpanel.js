// DOM Ready =============================================================
$(document).ready(function () {

    $("#circlechart-button").click(function () {
        $("#circlechart").toggle();
        ($.trim($(this).text()) === 'Show Payment Method') ?
                $(this).text('Hide Payment Method') : $(this).text('Show Payment Method');
    });

    $("#barlogarithmicchart-button").click(function () {
        $("#barlogarithmicchart").toggle();
        ($.trim($(this).text()) === 'Show Passenger Spend') ?
                $(this).text('Hide Passenger Spend') : $(this).text('Show Passenger Spend');
    });
    $("#scatterchart-button").click(function () {
        $("#scatterchart").toggle();
        ($.trim($(this).text()) === 'Show Scatter') ?
                $(this).text('Hide Scatter') : $(this).text('Show Scatter');
    });

    $("#histogramscatterchart-button").click(function () {
        $("#histogramscatterchart").toggle();
        ($.trim($(this).text()) === 'Show Histogram Scatter') ?
                $(this).text('Hide Histogram Scatter') : $(this).text('Show Histogram Scatter');
    });

    $("#bubblechart-button").click(function () {
        $("#bubblechart").toggle();
        ($.trim($(this).text()) === 'Show Bubble') ?
                $(this).text('Hide Bubble') : $(this).text('Show Bubble');
    });

    $("#timeserieschart-button").click(function () {
        $("#timeserieschart").toggle();
        ($.trim($(this).text()) === 'Show Amount Total') ?
                $(this).text('Hide Amount Total') : $(this).text('Show Amount Total');
    });
});
