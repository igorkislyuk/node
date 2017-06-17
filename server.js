const connect = require('connect');
const connectError = require('connect-error');
const cookieParser = require('cookie-parser');

const port = 3000;
const secret = 'tobi is a cool ferret';

connect()
    .use(cookieParser(secret))
    .use(function (req, res) {
        res.setHeader('Set-Cookie', 'foo=bar');
        res.setHeader('Set-Cookie', 'tobi=ferret; Expires=Tue, 08 Jun 2021 10:18:14 GMT');
        res.end();


        // console.log(req.cookies);
        // console.log(req.signedCookies);
        // res.end('hello\n');
    })
    .listen(port);


