const express = require('express');
const qs = require('qs');

const User = require('../lib/User');

// exports

exports.form = function (req, res) {
    res.render('login', {title: 'Login'});
};

exports.submit = function (req, res, next) {
    const data = qs.parse(req.body);

    User.authenticate(data.name, data.pass, function (err, user) {
        if (err) {
            return next(err);
        }

        if (user) {
            req.session.uid = user.id;

            res.redirect('/');
        } else {
            res.error('Sorry! Invalid credentials');

            res.redirect('back');
        }
    })
};

exports.logout = function (req, res) {
    req.session.destroy(function (err) {
        if (err) {
            throw err;
        }

        res.redirect('/');
    });
};