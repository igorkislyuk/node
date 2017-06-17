const url = require('url');

module.exports = function (req, res, next) {
    const match = url.parse(req.url).pathname.match(/^\/blog\/posts\/(.+)/);

    if (match) {
        findPostIdBySlug(match[1], function (err, id) {
            if (err) {
                throw err;
            }

            if (!id) {
                return next(new Error('User not found!'));
            }

            req.url = '/blog/posts/' + id;
            next();
        });
    } else {
        next();
    }
};

function findPostIdBySlug(stringIdentifier, callback) {
    callback(null, stringIdentifier.length);
}