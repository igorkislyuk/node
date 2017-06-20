const http = require('http');
const connect = require('connect');
const url = require('url');
const cookieSession = require('cookie-session');

const port = 3000;

connect()
    .use(cookieSession({
        name: 'session',
        keys: ['secret'],
        maxAge: 5000 // 24 hours
    }))
    .use(function (req, res) {
        req.session.views = (req.session.views || 0) + 1;

        // Write response
        res.end(req.session.views + ' views')
    })
    .listen(port);


