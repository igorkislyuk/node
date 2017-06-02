const https = require('https');
const fs = require('fs');

const options = {
    key: fs.readFileSync('./key.pem'),
    cert: fs.readFileSync('./key-cert.pem')
};

https.createServer(options, function (req, res) {
    res.writeHead(200);
    res.end('Hello world!\n');
}).listen(3000);
