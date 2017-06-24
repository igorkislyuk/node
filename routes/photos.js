let photos = [];

photos.push({
    name: 'Node.js Logo',
    path: 'https://nodejs.org/images/logos/nodejs-green.png'
});

photos.push({
    name: 'Ryan Speaking',
    path: 'https://nodejs.org/images/ryan-speaker.jpg'
});

exports.list = function (req, res) {
    res.render('photos', {
        title: 'Photos',
        photos: photos
    });
};