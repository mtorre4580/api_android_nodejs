var winston = require('winston');
winston.emitErrs = true;

var logger = new winston.Logger({
    transports: [
    new (winston.transports.File)({
        name: 'info-file',
        filename: './logs/info.log',
        level: 'info',
        json:true
    }),
    new (winston.transports.File)({
        name: 'error-file',
        filename: './logs/error.log',
        level: 'error',
        json: true
    }),
    new (winston.transports.Console)({
        level: 'info',
        handleExceptions: true,
        json: false,
        colorize: true
    }),
  ],
    exitOnError: false
});

module.exports = logger;

module.exports.stream = {
    write: function(message, encoding){
    }
};