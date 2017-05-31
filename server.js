const http = require('http');

const server = http.createServer(function (req, res) {
    // const body = 'Hello, World!';
    //
    // res.setHeader('Content-Length', body.length);
    // res.setHeader('Content-Type', 'text/plain');
    // res.end(body);

    const url = 'http://google.com';
    const body = '<p>Redirecting to <a href="' + url + '">'
        + url + '</a></p>';

    res.setHeader('Location', url);
    res.setHeader('Content-Length', body.length);
    res.setHeader('Content-Type', 'text/html');
    res.statusCode = 302;
    res.end(body);
});

server.listen(3000);