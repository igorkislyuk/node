const http = require('http');
const mime = require('mime');
const fs = require('fs');
const path = require('path');

function sendError(err, response) {
    response.writeHead(err, {"Content-Type": 'text/plain'});
    response.write(err.toString() + '. Resource not found!');
    response.end();
}

const server = http.createServer(function (request, response) {
    const filename = './public/index.html';

    fs.exists(filename, function (exist) {
        if (exist) {
            fs.readFile(filename, function (err, data) {
                if (err) {
                    sendError(err.code, response);
                }

                response.writeHead(200, {"Content-Type": mime.lookup(path.basename(filename))});
                response.end(data);
            })
        } else {
            sendError(404, response);
        }
    });
});

const port = 3000;
server.listen(port, function () {
    console.log('Server running at ' + port + '.');
});
