const express = require('express');
const router = express.Router();

router.get('/', function (req, res) {
    res.render('register', { title: 'Register'});
});

router.post('/', function (req, res) {
    res.send('post test');
});

module.exports = router;