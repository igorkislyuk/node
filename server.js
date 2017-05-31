const http = require('http');
const url = require('url');

var items = [];

const server = http.createServer(function (req, res) {
    switch (req.method) {
        case 'POST':
            var item = '';
            req.setEncoding('utf8');
            req.on('data', function (chunk) {
                item += chunk;
            });

            req.on('end', function () {
                items.push(item);
                res.end('Ok\n');
            });
            break;
        case 'GET':
            var body = items.map(function (item, i) {
                return i + ') ' + item;
            }).join('\n');
            res.setHeader('Content-Length', Buffer.byteLength(body));
            res.setHeader('Content-Type', 'text/plain; charset="utf-8"');
            res.end(body);
            break;
        case 'DELETE':
            const path = url.parse(req.url).pathname;
            const i = parseInt(path.slice(1), 10);

            if (isNaN(i)) {
                res.statusCode = 400;
                res.end('Invalid item id');
            } else if (!items[i]) {
                res.statusCode = 404;
                res.end('Item not found!');
            } else {
                items.splice(i, 1);
                res.end('Ok\n');
            }
            break;
        case 'PUT':
            const pathComponent = url.parse(req.url).pathname;
            const index = parseInt(pathComponent.slice(1));
            console.log(index);

            if (isNaN(index)) {
                res.statusCode = 400;
                res.end('Invalid item id');
            } else if (!items[index]) {
                res.statusCode = 404;
                res.end('Item not found!');
            } else {

                req.setEncoding('utf8');
                var localItem = '';

                req.on('data', function (chunk) {
                    localItem += chunk;
                });

                req.on('end', function () {
                    console.log('Complete parsing!');
                    console.log(localItem);
                    const old = items[index];
                    items[index] = localItem;
                    res.setHeader('Content-Type', 'text/plain; charset="utf-8"');
                    res.end('Done. Replaced `' + old + '` with `'
                        + items[index] + '`');
                });
            }

            break;
    }
});

server.listen(3000);