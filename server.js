const connect = require('connect');
const serveStatic = require('serve-static');
const compression = require('compression');

connect()
    .use(compression())
    .use(serveStatic('./public/'))
    .listen(3000);

// curl http://localhost:3000/test.js -i -H "Accept-Encoding: gzip"