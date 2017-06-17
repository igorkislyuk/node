const connect = require('connect');

const port = 3000;

function hello(req, res) {
    if (!res.headersSent) {
        res.setHeader('Content-Type', 'text/plain');
    } else {
        console.log('Already sent!');
    }

    res.end('Hello world!\n');
}

const logger = require('./middleware/logger');
const rewrite = require('./middleware/rewrite');

connect()
    .use(logger(':method:url'))
    .use(rewrite)
    .use(logger(':method:url'))
    .use(hello)
    .listen(port);