var express = require('express');
var path = require('path');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
const requestIp = require('request-ip');
var app = express();
dal = require('./mongo.js');

app.use(requestIp.mw())
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.get('/', function (req, res) {
    res.send('<h1>Csatlakozz!</h1>');
});


app.post('/', function (req, res) {
    new dal.Answer({
        programme: req.body.programme,
        startYear: req.body.startYear,
        searchTerms: req.body.searchTerms,
        sessionID: req.body.sessionID,
        ip: req.clientIp,
        timestamp: new Date()
    }).save(function (err, doc) {
        console.log(req.clientIp);
        if (err) {
            res.json({
                status: "error"
            });
        } else {
            res.json({
                status: "ok"
            });
        }
    })
});


app.use(function (err, req, res, next) {
    res.locals.message = err.message;
    res.locals.error = req.app.get('env') === 'development' ? err : {};

    res.status(err.status || 500);
    res.render('error');
});
module.exports = app;
