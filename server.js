const http = require('http');
const parse = require('url').parse;
const join = require('path').join;
const fs = require('fs');

const server = http.createServer(function (req, res) {
    req.setEncoding('utf-8');

    const writeStream = fs.createWriteStream('./req.txt');
    req.pipe(writeStream);
    res.end();
});

server.listen(3000);

