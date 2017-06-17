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

const logger = require('./logger.js');

const router = require('./middleware/router');

const routes = {
    GET: {
        '/users': function (req, res) {
            res.end('tobi, loki, ferret');
        },
        '/users/:id': function (req, res, id) {
            res.end('user ' + id);
        }
    },
    DELETE: {
        '/user/:id': function (req, res, id) {
            res.end('deleted user ' + id);
        }
    }
};

connect()
    .use(logger(':method:url'))
    .use(router(routes))
    .listen(3000);