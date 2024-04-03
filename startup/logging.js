const {transports, format, createLogger} = require('winston');

const logger = new createLogger({
    level: 'info',
    format : format.combine(
        format.timestamp(), // Include timestamp
        format.printf(info => 
            `{"timestamp" :${info.timestamp} "level":${info.level} "message":${info.message}}`)
        ),
    transports: [
      new transports.File({ filename: 'error.log', level: 'error' }),
      new transports.File({ filename: 'logfile.log' }),
    ],
    exceptionHandlers: [
        new transports.File({ filename: 'exceptions.log'}),
        new transports.Console()
      ]
  });

const exceptionHandlers = function(){
    logger.exceptions.handle();
}
//Logging in console if exception error happends

exports.logger = logger;
exports.exceptionHandlers = exceptionHandlers;
