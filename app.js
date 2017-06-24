"use strict";

// modules
const https = require('https');
const fs = require('fs');

const express = require('express');
const path = require('path');
const favicon = require('serve-favicon');
const logger = require('morgan');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');
const errorHandler = require('errorhandler');

// params
const key = fs.readFileSync('./support/key.pem');
const certificate = fs.readFileSync('./support/cert.pem');

const credentials = {
    key: key,
    cert: certificate,
    passphrase: 'test'
};

// routes
const photos = require('./routes/photos');

const app = express();
const env = process.env.NODE_ENV || 'development';

app.set('photos', __dirname + '/public/photos');

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(logger('dev'));
app.use(bodyParser.json());
// app.use(bodyParser.urlencoded({extended: false}));

app.use(express.static(path.join(__dirname, 'public')));

app.use('/', photos);

// catch 404 and forward to error handler
app.use(function (req, res, next) {
    const err = new Error('Not Found');
    err.status = 404;
    next(err);
});

// error handler
app.use(function (err, req, res) {
    // set locals, only providing error in development
    res.locals.message = err.message;
    res.locals.error = req.app.get('env') === 'development' ? err : {};

    // render the error page
    res.status(err.status || 500);
    res.render('error');
});

app.use(errorHandler);

https.createServer(credentials, app).listen(3000);