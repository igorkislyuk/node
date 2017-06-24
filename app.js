// "use strict";

const express = require('express');
const path = require('path');
const favicon = require('serve-favicon');
const logger = require('morgan');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');
const errorHandler = require('errorhandler');

const index = require('./routes/index');
const photos = require('./routes/photos');

const app = express();

// const router = express.Router();

// view engine setup
// app.set('views', path.join(__dirname, 'views'));
// app.set('view engine', 'ejs');

// const env = process.env.NODE_ENV || 'development';
//
// if ('development' === env) {
//     app.use(errorHandler);
//     app.set('photos', __dirname + '/public/photos');
// } else if ('production' === env) {
//     app.set('photos', __dirname + '/public/production/photos');
// }

// app.use(logger('dev'));
// app.use(bodyParser.json());
// app.use(bodyParser.urlencoded({extended: false}));
// app.use(cookieParser());
// app.use(express.static(path.join(__dirname, 'public')));

app.route('/test')
    .get(function (req, res) {
        res.send('Test page');
    });

// router.get('/', function (req, res) {
//     res.send('test');
// });

app.listen(3000);
