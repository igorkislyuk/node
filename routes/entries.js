const express = require('express');
const router = express.Router();
const Entry = require('../lib/entry');
const qs = require('qs');

module.exports = router;

router.get('/', function (req, res, next) {
    Entry.getRange(0, -1, function (err, entries) {
        if (err) {
            return next(err);
        }

        res.render('entries', {
            title: 'Entries',
            entries: entries
        });
    });
});

router.get('/post', function (req, res) {
    res.render('post', {title: 'Post'});
});

router.post('/post', function (req, res, next) {
    const data = qs.parse(req.body).entry;

    const entry = new Entry({
        "username": res.locals.user.name,
        "title": data.title,
        "body": data.body
    });

    entry.save(function (err) {
        if (err) {
            return next(err);
        }

        res.redirect('/');
    });
});