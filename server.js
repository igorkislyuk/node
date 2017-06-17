const connect = require('connect');
const bodyParser = require('body-parser');
const formidable = require('formidable');

const port = 3000;

const app = connect()
    .use(bodyParser.json())
    .use(bodyParser.urlencoded())
    .use(function (req, res) {

        const form = formidable.IncomingForm();

        form.parse(req, function (err, fields, files) {
            console.log(files);
            console.log(fields);

            res.end('Thanks!');
        });

    });

app.listen(port);


