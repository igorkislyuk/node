const express = require('express');
const router = express.Router();
const Photo = require('../models/Photo');
const path = require('path');
const fs = require('fs');
const formidable = require('formidable');

function home(res) {
    // Photo.remove({}, function(err) {
    //     console.log('collection removed');
    // });

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
        const newImagePath = path.join(photosDir, image.name);

        fs.rename(image.path, newImagePath, function (err) {
            if (err) {
                throw err;
            }

            Photo.create({
                name: name,
                path: image.name
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

router.get('/photo/:id/download', function (req, res) {
    const id = req.params.id;

    Photo.findById(id, function (err, photo) {
        if (err) {
            throw err;
        }
        const filePath = path.join(req.app.get('photos'), photo.path);

        res.download(filePath, 'Your Photo.jpg');
    })
});

module.exports = router;