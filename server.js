const basicAuth = require('connect-basic-auth');
const express = require('express');

const app = express();
app.use(basicAuth(function(credentials, req, res, next) {
    next();


}, 'Please enter your credentials.'));

//Lets require authentication for the rest of our routes.
app.all('*', function(req, res, next) {
    req.requireAuthorization(req, res, next);
});

app.listen(3000);