const connect = require('connect');
const fs = require('fs');

const port = 3000;

const api = connect()
    .use(users)
    .use(pets)
    .use(errorHandler);

connect()
    .use(hello)
    .use('/api', api)
    .use(errorPage)
    .listen(port);

// hello

function hello(req, res, next) {
    // throw new Error('test error');

    if (req.url.match(/^\/hello/)) {
        res.end('Hello, world!');
    } else {
        next();
    }
}

// users

const db = {
    users: [
        {name: 'tobi'},
        {name: 'loki'},
        {name: 'john'}
    ]
};


function users(req, res, next) {
    const match = req.url.match(/^\/user\/(.+)/);

    if (match) {
        const user = db.users[match[1]];

        if (user) {
            res.setHeader('Content-Type', 'application/json');
            res.end(JSON.stringify(user));
        } else {
            const err = new Error('User not found');
            err.notFound = true;
            next(err);
        }
    } else {
        next();
    }
}

// pets

function pets(req, _, next) {
    if (req.url.match(/^\/pet\/(.+)/)) {
        foo();
    } else {
        next();
    }
}

// error handler

function errorHandler(err, _, res, _) {
    console.error(err.stack.toString());

    res.setHeader('Content-Type', 'application/json');
    if (err.notFound) {
        res.statusCode = 404;
        res.end(JSON.stringify({error: err.message}));
    } else {
        res.statusCode = 500;
        res.end(JSON.stringify({error: 'Internal server error'}));
    }
}

// error page

function errorPage(_, _, res, _) {

    const filepath = './internal/error-404.html';

    const stat = fs.statSync(filepath);

    res.writeHead(200, {
        'Content-Type': 'text/html',
        'Content-Length': stat.size
    });

    const readStream = fs.createReadStream(filepath);
    readStream.pipe(res);
}








