const connect = require('connect');
const bodyParser = require('body-parser');
const rawBody = require('raw-body');
const contentType = require('content-type');

const port = 3000;

connect()
    // .use(bodyParser.json())
    // .use(bodyParser.urlencoded())
    .use(function (req, res, next) {
        rawBody(req, {
            length: req.headers['content-length'],
            limit: '32kb',
            encoding: contentType.parse(req).parameters.charset
        }, function (err, string) {
            if (err) {
                next(err);
            }

            req.text = string;
            next();
        })
    })
    .use(function (err, req, res, next) {
        if (err) {
            res.statusCode = 303;
            res.end('error');
        } else {
            res.statusCode = 200;
            res.end('All is fine. You can pass!');
        }
    })
    .use(function (req, res) {
        res.statusCode = 200;
        res.end('done');
    })
    .listen(port);
