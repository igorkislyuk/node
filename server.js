const http = require('http');
const parse = require('url').parse;
const join = require('path').join;
const fs = require('fs');
const qs = require('querystring');
const formidable = require('formidable');

var items = [];

function show(req, res) {
    const html = '<html>' +
        '<head><title>Todo List</title></head>' +
        '<body>' +
        '<form method="post" action="/" enctype="multipart/form-data">' +
        '<p><input type="text" name="name"/></p>' +
        '<p><input type="file" name="file"/></p>' +
        '<p><input type="submit" value="Upload" /></p>' +
        '</form>' +
        '</body>' +
        '</html>';
    res.setHeader('Content-Length', Buffer.byteLength(html));
    res.setHeader('Content-Type', 'text/html');
    res.end(html);
}

function upload(req, res) {
    if (!isFormData(req)) {
        res.statusCode = 400;
        res.end('Bad request: expecting multipart/form-data');
        return;
    }

    const form = new formidable.IncomingForm();

    form.on('field', function (field, name) {
        console.log(field);
        console.log(name);
    });

    form.on('file', function (name, file) {
        console.log(name);
        console.log(file);
    });

    form.on('end', function () {
        res.end('upload complete');
    });

    form.parse(req);
}

function isFormData(req) {
    const type = req.headers['content-type'] || '';
    return 0 == type.indexOf('multipart/form-data');
}

function notFound(res) {
    res.statusCode = 404;
    res.setHeader('Content-Type', 'text/plain');
    res.end('Not Found');
}

function badRequest(res) {
    res.statusCode = 400;
    res.setHeader('Content-Type', 'text/plain');
    res.end('Bad Request');
}

const server = http.createServer(function (req, res) {
    if ('/' == req.url) {
        switch (req.method) {
            case'GET':
                show(req, res);
                break;
            case'POST':
                upload(req, res);
                break;
            default:
                badRequest(res);
        }
    } else {
        notFound(res);
    }
});

server.listen(3000);
