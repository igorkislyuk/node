const http = require('http');

console.log('starting...');
const req = http.request({
    method: 'POST',
    port: 3000,
    headers: {
        'Content-Type': 'application/json'
    }
}, function (res) {
    console.log(res.statusCode);
});

req.on('error', function (err) {
   console.log('error happened!');
});

req.write('[');

let n = 300000;
while (n--) {
    req.write('"foo",');
}

req.write('"bar"]');
req.end();