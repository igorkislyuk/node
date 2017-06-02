const http = require('http');
const https = require('https');
const fs = require('fs');

var counter = 0;

const server = http.createServer(function (req, res) {
    counter++;
    res.end('I have been accessed '+ counter + ' times.');
});

server.listen(3000);