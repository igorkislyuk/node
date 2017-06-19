const connect = require('connect');
const bodyParser = require('body-parser');
const getRawBody = require('raw-body');
const contentType = require('content-type');

const port = 3000;

function limit(limitConditions, req, next) {

    for (let limitCondition of limitConditions) {
        if (limitCondition.type !== req.headers['content-type']) {
            continue;
        }

        getRawBody(req, {
            length: req.headers['content-length'],
            limit: limitCondition.limit,
            encoding: contentType.parse(req).parameters.charset
        }, function (err, string) {
            if (err) {
                next(err);
            }

            req.text = string;
            next();
        });
    }
}

connect()
    .use(function (req, res, next) {
        const limitations = [
            {type: 'application/json', limit: '32kb'},
            {type: 'application/x-www-form-urlencoded', limit: '2kb'}
        ];

        limit(limitations, req, next);
    })
    .use(function (err, req, res, _) {
        if (err) {
            res.statusCode = 303;
            res.end('error');
        }
        // if no error simply drop to next handler...
    })
    .use(function (req, res) {
        res.statusCode = 200;
        res.end('Simple handler working fine.');
    })
    .listen(port);