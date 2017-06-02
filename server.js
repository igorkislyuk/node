const http = require('http');
const parse = require('url').parse;
const join = require('path').join;
const fs = require('fs');

var root = __dirname;
console.log(root);

const server = http.createServer(function (req, res) {
    const url = parse(req.url);
    const path = join(root, url.pathname);

    console.log(path);

    const stream = fs.createReadStream(path);

    stream.on('data', function (chunk) {
        res.write(chunk);
    });

    stream.on('end', function () {
        res.end();
    });
    
    stream.on('error', function (error) {
        console.log(error);
    })
});

server.listen(3000);

