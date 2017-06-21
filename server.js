const connect = require('connect');
const serveStatic = require('serve-static');
const compression = require('compression');
const serveIndex = require('serve-index');

connect()
    .use('/files', serveIndex('public', {icons: true, hidden: true}))
    .use('/files', serveStatic('./public/', {hidden: true}))
    .listen(3000);

// curl http://localhost:3000/test.js -i -H "Accept-Encoding: gzip"