const http = require('http');
const connect = require('connect');
const vhost = require('vhost');
const url = require('url');

const port = 3000;

// DO NOT forget to create entries in /etc/hosts/

// create main app
const app = connect();

app.use(vhost('mail.example.com', function (req, res) {
    // handle req + res belonging to mail.example.com
    res.setHeader('Content-Type', 'text/plain');
    res.end('hello from mail!');
}));

// an external api server in any framework
const httpServer = http.createServer(function (req, res) {
    res.setHeader('Content-Type', 'text/plain');
    res.end('hello from the api!');
});

app.use(vhost('api.example.com', function (req, res) {
    // handle req + res belonging to api.example.com
    // pass the request to a standard Node.js HTTP server
    httpServer.emit('request', req, res)
}));

app.listen(port);