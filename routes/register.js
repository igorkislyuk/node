const express = require('express');
const router = express.Router();
const User = require('../lib/User');

router.get('/', function (req, res) {
    res.render('register', { title: 'Register'});
});

router.post('/', function (req, res, next) {
    const data = {
        name: req.body.userName,
        password: req.body.userPass
    };

    User.getByName(data.name, function (err, user) {
        if (err) {
            return next(err);
        }

        if (user.id) {
            res.error('Username already taken!');
            res.redirect('back');
        } else {
            user = new User({
                name: data.name,
                pass: data.password
            });

            user.save(function (err) {
                if (err) {
                    return next(err);
                }

                req.session.id = user.id;
                res.redirect('/login');
            });
        }
    });
});

module.exports = router;

