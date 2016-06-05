var app = require('express')();

app.use(require('./profesores-services'));

module.exports = app;