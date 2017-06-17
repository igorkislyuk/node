const connect = require('connect');

function errorHandler() {
    const env = process.env.NODE_ENV || 'development';

    return function (err, req, res, _) {

        res.statusCode = 500;
        switch (env) {
            case 'development':

                res.setHeader('Content-Type', 'text/plain');
                res.end(err.toString());
                break;

            default:
                res.end('Server error');
        }
    }
}

connect()
    .use(function hello(req, res) {
        foo();
        res.setHeader('Content-Type', 'text/plain');
        res.end('Hello, world!');
    })
    .use(errorHandler())
    .listen(3000);