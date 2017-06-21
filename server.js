const connect = require('connect');
const serveStatic = require('serve-static');

connect()
    .use(serveStatic('./public/'))
    .listen(3000);