import winston, { Logger } from 'winston';

const logger: Logger = winston.createLogger({
    level: 'info', // Set the default logging level
    format: winston.format.combine(
        winston.format.timestamp(),
        winston.format.json() // You can also use winston.format.simple() for a simpler format
    ),
    transports: [
        new winston.transports.Console(), // Log to console
    ],
});

export default logger;
