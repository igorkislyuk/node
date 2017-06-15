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

function authenticateWithDatabase(user, pass, callback) {
    let err;
    if (user !== 'tobi' || pass !== 'ferret') {
        err = new Error('Unauthorized');
    }
    callback(err);
}

function restrict(req, res, next) {
    const authorization = req.headers.authorization;

    if (!authorization) {
        return next(new Error('Unauthorized'));
    }

    const parts = authorization.split(' ');
    const scheme = parts[0];
    const auth = new Buffer(parts[1], 'base64').toString().split(':');
    const user = auth[0];
    const pass = auth[1];

    authenticateWithDatabase(user, pass, function (err) {
        if (err) {
            return next(err);
        }

        next();
    });

}

function admin(req, res, next) {
    switch (req.url) {
        case '/':
            res.end('try /users');
            break;

        case '/users':
            res.setHeader('Content-Type', 'application/json');
            res.end(JSON.stringify(['tobi', 'loki', 'jane']));
            break;

    }
}

connect()
    .use(logger)
    .use('/admin', restrict)
    .use('/admin', admin)
    .use(hello)
    .listen(port);
