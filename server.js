const http = require('http');
const parse = require('url').parse;
const join = require('path').join;
const fs = require('fs');

const server = http.createServer(function (req, res) {
    const url = parse(req.url);
    const path = join(root, url.pathname);

    fs.stat(path, function (err, stat) {
        if (err) {
            if ('ENOENT' == err.code) {
                res.statusCode = 404;
                res.end('Not Found!');
            } else {
                internalError(res);
            }
        } else {
            res.setHeader('Content-Length', stat.size);
            const stream = fs.createReadStream(path);
            stream.pipe(res);

            stream.on('error', function (err) {
                internalError(res);
            })
        }
    });
});

function internalError(res) {
    res.statusCode = 500;
    res.end('Internal server error!');
}

server.listen(3000);

