const express = require('express');
const authentication = require('express-authentication');
const Router = express.Router();

// mine
const User = require('../lib/User');

module.exports = Router;

Router.get('/', function (req, res, next) {
    req.challenge = req.get('Authorization');

    req.authenticated = req.authentication === 'p';

    // provide the result of the authentication; generally some kind of user
    // object on success and some kind of error as to why authentication failed
    // otherwise.
    if (req.authenticated) {
        req.authentication = {user: 'bob'};
    } else {
        req.authentication = {error: 'INVALID_API_KEY'};
    }

    // That's it! You're done!
    next();
});

Router.get('/user/:id', authentication.required(), function (req, res, next) {
    User.get(req.params.id, function (err, user) {
        if (err) {
            return next(err);
        }

        if (!user.id) {
            return res.send(404);
        }

        res.json(user);
    });
});


