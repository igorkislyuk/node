const connect = require('connect');
const qs = require('qs');
const url = require('url');
const morgan = require('morgan');
const fs = require('fs');

const port = 3000;

const logStream = fs.createWriteStream('test_log.log');

connect()
    .use(morgan(':method :url :status :res[content-length] - :response-time ms', {stream: logStream}))
    .use(function (req, res, next) {
        req.query = qs.parse(url.parse(req.url).query);
        console.log(req.query);

        next();
    })
    .use(function (req, res) {
        res.setHeader('Content-Type', 'application/json');
        res.end();
    })
    .listen(port);