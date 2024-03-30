const {createLogger, format, transports} = require('winston');

const logger = createLogger({
  level: 'info',
  format: format.combine(format.timestamp({
    format: "YYYY-MM-DD HH:mm:ss"
  }), format.json()),
  defaultMeta: { service: 'user-service' },
  transports: [
    new transports.File({
      filename: "src/logs/info.log",
      level: "info",
      // maxsize: 524288,
      // maxFiles: 5,
    }),
    new transports.File({
      filename: "src/logs/error.log",
      level: "error"
    })
    // new transports.Console({
    //   format: format.combine(format.colorize(), format.simple())
    // })
  ],
});

module.exports = logger;