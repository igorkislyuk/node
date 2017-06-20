const http = require('http');
const connect = require('connect');
const url = require('url');
const cookieSession = require('cookie-session');

const port = 3000;

connect()
    .use(cookieSession({
        name: 'session',
        keys: ['secret'],
        maxAge: 24 * 60 * 60 * 1000 // 24 hours
    }))
    .use(function (req, res) {
        console.log(req.session);
        if (req.session.cart) {
            if (req.session.cart.items.length >= 5) {
                req.session = null;
            } else {
                req.session.cart.items.push(req.session.cart.items.length + 1);
            }
        } else {
            req.session.cart = {items: [1, 2, 3]};
        }
        res.end();
    })
    .listen(port);


