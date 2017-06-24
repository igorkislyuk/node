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
const router = express.Router();

// params
const key = fs.readFileSync('./support/key.pem');
const certificate = fs.readFileSync('./support/cert.pem');

const credentials = {
    key: key,
    cert: certificate,
    passphrase: 'test'
};

// routes
const index = require('./routes/index');
const photos = require('./routes/photos');

//
const app = express();
const env = process.env.NODE_ENV || 'development';

// configuration
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

if ('development' === env) {
    app.use(errorHandler);
    app.set('photos', __dirname + '/public/photos');
} else if ('production' === env) {
    app.set('photos', __dirname + '/public/production/photos');
}

app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

// main
app.use('/', index);
// app.use('/', photos);

const httpsServer = https.createServer(credentials, app);
httpsServer.listen(3000);
