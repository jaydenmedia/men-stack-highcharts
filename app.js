var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');

// Database
var monk = require('monk');
var db = monk('mongodb://localhost/dataviznytaxi-dev');

var routes = require('./routes/index');
var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

// uncomment after placing your favicon in /public
//app.use(favicon(__dirname + '/public/favicon.ico'));
app.use(logger('dev'));

// Set body-parser limits
app.use(bodyParser.json({limit: '500mb', type: 'application/json'}));
app.use(bodyParser.urlencoded({
    limit: '500mb',
    extended: true,
    parameterLimit: 500000,
    type: 'application/x-www-form-urlencoding'
}));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

// Make our db accessible to our router
app.use(function (req, res, next) {
    req.db = db;
    next();
});

// NEW IMPLEMENTATION ===================
app.param('collectionName', function (req, res, next, collectionName) {
    req.collection = db.collection(collectionName);
    return next();
});

app.get('/api', function (req, res, next) {
    res.send('please select a collection, e.g., /api/messages');
});

app.get('/api/:collectionName', function (req, res, next) {
//    req.collection.find({}, {stream: true})
//            .each(function (doc) {
//                if (doc) {
//                    console.log(JSON.stringify(doc));
//                    return next(doc);
//                }
//            })
//            .error(function (err) {
//                if (err) {
//                    console.log('ERROR: ');
//                    console.log(JSON.stringify(err));
//                    return next(err);
//                }
//            })
//            .success(function () {
//                //console.log(res);
//                //next().json(res);
//                //res.json(res);
//            });

    req.collection.find({}, {sort: [['_id', -1]]}, function (e, docs) {
        if (e) {
            return next(e);
        }
        res.json(docs);
    });

});

app.post('/api/:collectionName', function (req, res, next) {
    req.collection.insert(req.body, {}, function (e, results) {
        if (e) {
            return next(e);
        }
        res.send(results);
    });
});

app.get('/api/:collectionName/:id', function (req, res, next) {
    req.collection.findById(req.params.id, function (e, result) {
        if (e) {
            return next(e);
        }
        res.send(result);
    });
});

app.put('/api/:collectionName/:id', function (req, res, next) {
    req.collection.updateById(req.params.id, {$set: req.body}, {safe: true, multi: false}, function (e, result) {
        if (e) {
            return next(e);
        }
        res.send((result === 1) ? {msg: 'success'} : {msg: 'error'});
    });
});

app.delete('/api/:collectionName/:id', function (req, res, next) {
    req.collection.removeById(req.params.id, function (e, result) {
        if (e) {
            return next(e);
        }
        res.send((result === 1) ? {msg: 'success'} : {msg: 'error'});
    });
});


// PREVIOUS IMPLEMENTATION ==============
//app.use('/', routes);
//app.use('/mapreduce', mapreduce);


// catch 404 and forwarding to error handler
app.use(function (req, res, next) {
    var err = new Error('Not Found');
    err.status = 404;
    next(err);
});

// error handlers

// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
    app.use(function (err, req, res, next) {
        res.status(err.status || 500);
        res.render('error', {
            message: err.message,
            error: err
        });
    });
}

// production error handler
// no stacktraces leaked to user
app.use(function (err, req, res, next) {
    res.status(err.status || 500);
    res.render('error', {
        message: err.message,
        error: {}
    });
});



////////////////////////////////////////////
// Does not work in this implementation. May require something other than Monk
// 
// Should be placed in Router section?

// Run MapReduce Functions ================================
//router.get("/mapreduce", function (req, res) {
//    self._setResponseHeader(res);
////TODO: This needs to check if the date is greater than and then 
////          calculate the actual time and not difference between times.
////              add the distance value in for more interesting results.
//
////Parse Travel Time
//    var map = function () {
//        var pickup = String(this.lpep_pickup_datetime).split(' ');
//        var dropoff = String(this.Lpep_dropoff_datetime).split(' ');
//        var both = pickup.concat(dropoff);
//
//        function toSeconds(time_str) {
//            // Extract hours, minutes and seconds
//            var parts = time_str.split(':');
//            // compute  and return total seconds
//            return parts[0] * 3600 + // an hour has 3600 seconds
//                    parts[1] * 60 + // a minute has 60 seconds
//                    +
//                    parts[2]; // seconds
//        }
//
//
//        var a = String(pickup[1]);
//        var b = String(dropoff[1]);
//
//        var difference = Math.abs(toSeconds(a) - toSeconds(b));
//
//        if (String(pickup[0]) !== String(dropoff[0])) {
//            b += 43200;
//        }
//
//        // 43200 = seconds within 12 hours;
//
//
//// format time difference
//        var result = [
//            Math.floor(difference / 3600), // an hour has 3600 seconds
//            Math.floor((difference % 3600) / 60), // a minute has 60 seconds
//            difference % 60
//        ];
//// 0 padding and concatation
//        result = result.map(function (v) {
//            return v < 10 ? '0' + v : v;
//        }).join(':');
//
//        emit(this._id, result);
//    };
//
//    var reduce = function (key, values) {
//        return values;
//    };
//
//    var obj = {};
//    obj.out = {replace: 'g_pickup_dropoff2_totals'};
//
//    // Execute map reduce and return results inline
//    collection.mapReduce(map, reduce, obj);
//    res.end(JSON.stringify(obj.out));
//});


////Parse Pickup Day and Time
//        var map = function () {
//            var pickup = String(this.lpep_pickup_datetime).split(' ');
//            var dropoff = String(this.Lpep_dropoff_datetime).split(' ');
//            var both = pickup.concat(dropoff);
//            
//            emit(this._id, both);
//        
//        };
//
//        var reduce = function (key, values) {
//            var res = values[0];
//            for (var i = 1, len = values.length; i < len; i++) {
//                res = {pdate: values[i], ptime: values[i], ddate: values[i], dtime: values[i]};
//            }
//            ;
//            return res;
//        };
//
//        var obj = {};
//        obj.out = {replace: 'g_pickup_dropoff_totals'};
//
//        // Execute map reduce and return results inline
//        collection.mapReduce(map, reduce, obj);
//        res.end(JSON.stringify(obj.out));
//    });


////Parse Pickup time and count them
//        var map = function () {
//            var pickup = String(this.lpep_pickup_datetime).split(' ');
////            var dropoff = String(this.Lpep_dropoff_datetime).split(' ');
//
//            for (i in pickup) {
//                emit(pickup[i], 1);
//            }
//        };
//
//        var reduce = function (key, values) {
//            var count = 0;
//            for (index in values) {
//                count += values[index];
//            }
//
//            return count;
//        };
//
//        var obj = {};
//        obj.out = {replace: 'g_pickup_dropoff_totals'};
//
//        // Execute map reduce and return results inline
//        collection.mapReduce(map, reduce, obj);
//        res.end(JSON.stringify(obj.out));
//    });

//LatLong MapReduce
//app.get("/mapreduce/travel/gis", function (req, res) {
//    self._setResponseHeader(res);
//
//    var map = function () {
//        var key = this._id;
//        var value = {
//            VendorID: this.VendorID,
//            PassengerCount: this.Passenger_count,
//            PickupDatetime: this.lpep_pickup_datetime,
//            PickupLat: this.Pickup_latitude,
//            PickupLong: this.Pickup_longitude,
//            DropoffDatetime: this.Lpep_dropoff_datetime,
//            DropoffLat: this.Dropoff_latitude,
//            DropoffLong: this.Dropoff_longitude,
//            TripDistance: this.trip_distance,
//            TotalAmount: this.Total_amount
//        };
//        emit(key, value);
//    };
//    var reduce = function (key, values) {
//        var reducedObject = {
//            id: key,
//            VendorID: 0,
//            PassengerCount: 0,
//            PickupDatetime: 0,
//            PickupLat: 0,
//            PickupLong: 0,
//            DropoffDatetime: 0,
//            DropoffLat: 0,
//            DropoffLong: 0,
//            TripDistance: 0,
//            TotalAmount: 0
//        };
//        values.forEach(function (value) {
//            reducedObject.VendorID = value.VendorID;
//            reducedObject.PassengerCount = value.PassengerCount;
//            reducedObject.PickupDatetime = value.PickupDatetime;
//            reducedObject.PickupLat = value.PickupLat;
//            reducedObject.PickupLong = value.PickupLong;
//            reducedObject.DropoffDatetime = value.DropoffDatetime;
//            reducedObject.DropoffLat = value.DropoffLat;
//            reducedObject.DropoffLong = value.DropoffLong;
//            reducedObject.TripDistance = value.TripDistance;
//            reducedObject.TotalAmount = value.TotalAmount;
//        }
//        );
//        return reducedObject;
//    };
//    var t = function (val) {
//        return val + 1;
//    };
//    var obj = {};
//    obj.scope = {fn: t};
//    obj.out = {replace: 'g_travel_summary'};
//
//
//    // Execute map reduce and return results inline
//    req.collection.mapReduce(map, reduce, obj);
//    res.end(JSON.stringify(obj.out));
//});

//basic MapReduce
//    router.get("/mapreduce", function (req, res) {
//        self._setResponseHeader(res);
//
//        var map = function () {
//            emit(this.Trip_distance, 1);
//        };
//        var reduce = function (key, values) {
//            return Array.sum(values);
//        };
//        var t = function (val) {
//            return val + 1;
//        };
//        var obj = {};
//        obj.scope = {fn: t};
//        obj.out = {replace: 'g_trip_distance_totals'};
//
//        // Execute map reduce and return results inline
//        collection.mapReduce(map, reduce, obj);
//        res.end(JSON.stringify(obj.out));
//    });
// END Run MapReduce Functions ================================


module.exports = app;
