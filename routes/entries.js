const express = require('express');
const router = express.Router();
const qs = require('qs');
const validate = require('../lib/middleware/validate');
const page = require('../lib/middleware/page');

const Entry = require('../lib/entry');

module.exports = router;

router.get('/:page?', page(Entry.count, 5), function (req, res, next) {
    const page = req.page;
    if (isNaN(page.from) || isNaN(page.to)) {
        next();
        return;
    }

    Entry.getRange(page.from, page.to, function (err, entries) {
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

const validators = [
    validate.required('entry[title]'),
    validate.lengthAbove('entry[body]', 4)
];

router.post('/post', validators, function (req, res, next) {
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
