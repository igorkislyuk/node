const connect = require('connect');
const cookieSession = require('cookie-session');
const errorHandler = require('errorhandler');

connect()
    .use(cookieSession({
        name: 'session',
        keys: ['secret'],
        maxAge: 24 * 60 * 60 * 1000
    }))
    .use(function (req, res) {
        console.log(req.session);

        asd();
        res.end();
    })
    .use(errorHandler())
    .listen(3000);