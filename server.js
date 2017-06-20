const connect = require('connect');
const getRawBody = require('raw-body');
const contentType = require('content-type');
const qs = require('qs');
const url = require('url');

const port = 3000;

const express = require('express');

// express()
//     .use(function (req, res) {
//         res.setHeader('Content-Type', 'application/json');
//         console.log(req.query);
//         res.end('done');
//     })

const app = express();

app.get('/', function(req, res){
    // res.send('id: ' + req.query.id);
    console.log(req.query);
    res.end();
});

app.listen(port);