const connect = require('connect');
const qs = require('qs');
const url = require('url');

const port = 3000;

connect()
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