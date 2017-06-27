const express = require('express');
const qs = require('qs');

exports.form = function (req, res) {
    res.render('login', {title: 'Login'});
};

exports.submit = function (req, res) {

    console.log('Test');

    const temp = qs.parse(req.body);

    console.log('Final test');
};

exports.logout = function (req, res) {

};