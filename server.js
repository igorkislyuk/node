const http = require('http');
const work = require('./lib/timetrack');

const server = http.createServer(function (req, res) {
    switch (req.method) {
        case 'POST':
            switch (req.url) {
                case '/':
                    work.add(db, req, res);
                    break;

                case '/archive':
                    work.archive(db, req, res);
                    break;

                case '/delete':
                    work.delete(db, req, res);
                    break;
            }
            break;

        case 'GET':
            switch (req.url) {
                case '/':
                    work.show(res);
                    break;

                case '/archived':
                    work.showArchived(db, res);
            }
            break;
    }
});

work.database
    .authenticate()
    .then(() => {
        console.log('Connection has been established successfully.');
        work.createModel();
        server.listen(3000);
    })
    .catch(err => {
        console.error('Unable to connect to the database:', err);
    });