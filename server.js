const connect = require('connect');

const port = 3000;

function logger(req, res, next) {
    console.log('%s %s', req.method, req.url);
    next();
}

function hello(req, res) {
    if (!res.headersSent) {
        res.setHeader('Content-Type', 'text/plain');
    } else {
        console.log('Already sent!');
    }

    res.end('Hello world!\n');
}

function adminHello(req, res, next) {
    res.setHeader('Content-Type', 'text/plain');
    res.write('Hello, Admin!\n');
    next();
}

connect()
    .use('/admin', adminHello)
    .use(logger)
    .use(hello)
    .listen(port);
