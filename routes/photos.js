const express = require('express');
const router = express.Router();

let photos = [];

photos.push({
    name: 'Node.js Logo',
    path: 'https://nodejs.org/images/logos/nodejs-green.png'
});

photos.push({
    name: 'Ryan Speaking',
    path: 'https://nodejs.org/images/ryan-speaker.jpg'
});

router.get('/', function (req, res) {
    res.render('photos', {
        title: 'Photos',
        photos: photos
    });
});

module.exports = router;