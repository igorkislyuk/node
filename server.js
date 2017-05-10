const http = require('http');
const mime = require('mime');
const fs = require('fs');
const path = require('path');

function sendError(err, response) {
    console.log(err);
    response.writeHead(err, {"Content-Type": 'text/plain'});
    response.write(err.toString() + '. Resource not found!');
    response.end();
}

const server = http.createServer(function (request, response) {
    getTitles(response);
});

function getTitles(response) {
    const filename = './resources/titles.json';
    fs.readFile(filename, function (err, data) {
        if (err) return sendError(404, response);

        getTemplate(JSON.parse(data.toString()), response);
    });
}

function getTemplate(titles, response) {
    const filename = './public/template.html';
    fs.readFile(filename, function (err, data) {
        if (err) return sendError(404, response);

        formatHtml(titles, data.toString(), response);
    });
}

function formatHtml(titles, template, response) {
    const html = template.replace('%', titles.join('</li><li>'));
    response.writeHead(200, {'Content-Type': 'text/html'});
    response.end(html);
}

const port = 3000;
server.listen(port, function () {
    console.log('Server running at ' + port + '.');
});
