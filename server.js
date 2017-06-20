const connect = require('connect');
const morgan = require('morgan');
const bodyParser = require('body-parser');
const methodOverride = require('method-override');

const port = 3000;

function edit(req, res, next) {
    if ('GET' !== req.method) {
        return next();
    }

    res.setHeader('Content-Type', 'text/html');
    res.write('<form method="POST" action="/resource?_method=DELETE">' +
        '<button type="submit">Delete resource</button>' +
        '</form>');
    res.end();
}

function deleteResource(req, res, next) {
    if ('DELETE' !== req.method) {
        return next();
    }

    res.end('Resource deleted.');
}

connect()
    .use(bodyParser.urlencoded())
    .use(methodOverride('_method'))
    .use(edit)
    .use(deleteResource)
    .listen(port);