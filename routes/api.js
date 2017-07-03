const express = require('express');
const basicAuth = require('express-authentication');

const User = require('../lib/User');

exports.auth = basicAuth(User.authenticate);

exports.user = function (req, res, next) {
    User.get(req.params.id, function (err, user) {
        if (err) {
            return next(err);
        }

        if (!user.id) {
            return res.send(404);
        }

        res.json(user);
    });
};
