function setup(format) {
    const regexp = /:(\w+)/g;

    return function (req, res, next) {

        const str = format.replace(regexp, function (match, property) {
            return req[property] + ' ';
        });

        console.log(str);

        next();
    }
}

module.exports = setup;

