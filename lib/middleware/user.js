const User = require('../User');

module.exports = function (req, res, next) {
    const uid = req.session.uid;

    if (!uid) {
        return next();
    }

    User.get(uid, function (err, user) {
        if (err) {
            return next(err);
        }

        req.user = res.locals.user = user;
        next();
    });
};