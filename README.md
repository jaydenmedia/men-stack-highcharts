#Simple RESTful Data Visualisation Web App with Node.js, Express, MongoDB, JQuery, and Highcharts.js
A complete project for large data visualisation using AJAX.  
Charting data structures can be reconfigured to suit other projects.

## Quickstart
[Download a data set](http://www.nyc.gov/html/tlc/html/about/trip_record_data.shtml), edit the app.js file by renaming the MongoDB collection to suit your setup.

**Note: You will need to do an NPM Install and have MongoDB running.**


## Author
Josh Smith, 2016


## Notes
* App is viewable @ localhost:3000 with Node server running.
* Extra charts are available in this repo, including GIS, but are not currently configured.
* Bootstrap is optional for responsive layout.

## Issues
* Map / Reduce API not working with the current setup.
* Express body-parser does not appear to have any bearing on pages served.

## Improvements
* Add error handling for DB collections (if !exists, then...).
