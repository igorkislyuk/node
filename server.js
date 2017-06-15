const connect = require('connect');

const port = 3000;

function logger(req, res, next) {
    console.log('%s %s', req.method, req.url);
    next();
}

function hello(req, res) {
    res.setHeader('Content-Type', 'text/plain');
    res.end('Hello world!');
}

connect()
    .use(logger)
    .use(hello)
    .listen(port);
