const express = require('express');
const router = express.Router();
const Photo = require('../models/Photo');
const path = require('path');
const fs = require('fs');
const formidable = require('formidable');

// let photos = [];
//
// photos.push({
//     name: 'Node.js Logo',
//     path: 'https://nodejs.org/images/logos/nodejs-green.png'
// });
//
// photos.push({
//     name: 'Ryan Speaking',
//     path: 'https://nodejs.org/images/ryan-speaker.jpg'
// });

function home(res) {
    Photo.find({}, function (err, photos) {
        if (err) {
            throw err;
        }
        res.render('photos', {
            title: 'Photos',
            photos: photos
        });
    });
}

function save(req, res) {
    const form = new formidable.IncomingForm();

    // can't use combined form values - not `formidable` not `multiparty`
    form.parse(req, function (err, fields, files) {
        const photoName = fields.photoName;
        const image = files.photoImage;
        const name = photoName || image.name;

        const photosDir = req.app.get('photos');
        const newImagePath = path.join(photosDir, name);

        fs.rename(image.path, newImagePath, function (err) {
            if (err) {
                throw err;
            }

            Photo.create({
                name: name,
                path: newImagePath
            }, function (err) {
                if (err) {
                    throw err;
                }

                res.redirect('/');
            });
        });
    });
}

// routes

router.get('/', function (req, res) {
    home(res);
});

router.get('/upload', function (req, res) {
    res.render('upload', {title: 'Photo upload'});
});

router.post('/upload', function (req, res) {
    save(req, res);
});

module.exports = router;