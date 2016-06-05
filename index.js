var express = require('express');
var app = express();
var morgan = require('morgan');
var port = process.env.PORT || 3000;
var logger = require('./app/logger/logger'); 

app.use(morgan('combined'));
app.use(require('./app/services'));
app.use(express.static('./public')); 

app.listen(port, function() {
  logger.info('Servidor Api Nodejs --> %d', port);
});



