import winston from "winston";
const { debug, error, http, https, info, level, warn } = winston;

const customLevels = {
    levels: {
        fatal: 0,
        error: 1,
        warn: 2,
        info: 3,
        http: 4,
        https: 5,
        debug: 6
    },
    colors: {
        fatal: 'magenta',
        error: 'red',
        warn: 'yellow',
        info: 'blue',
        http: 'pink',
        https: 'green',
        debug: 'blue'
    }
};

//Agrego los colores a winston:
winston.addColors(customLevels.colors);

const logger = winston.createLogger({
    levels: customLevels.levels,
    level: 'debug',
    format: winston.format.combine(
        winston.format.colorize({ all: true }),
        winston.format.timestamp(),
        winston.format.printf(({ level, message, timestamp }) => {
            const date = new Date(timestamp);
            const formattedDate = date.toLocaleString('es-AR', {
                day: '2-digit',
                month: '2-digit',
                year: 'numeric',
                hour: '2-digit',
                minute: '2-digit',
                second: '2-digit'
            });
            return `${level}: MESSAGE: ${message}, DATE: [${formattedDate}]`;
        }),
    ),
    transports: [
        new winston.transports.Console(),
        new winston.transports.File({ filename: 'logs/fatal.log', level: 'fatal' }),
        new winston.transports.File({ filename: 'logs/error.log', leve: 'error' }),
        new winston.transports.File({ filename: 'logs/warn.log', level: 'warn' }),
        new winston.transports.File({ filename: 'logs/info.log', level: 'info' }),
        new winston.transports.File({ filename: 'logs/http.log', level: 'http' }),
        new winston.transports.File({ filename: 'logs/https.log', level: 'https' }),
        new winston.transports.File({ filename: 'logs/debug.log', level: 'debug' }),
        new winston.transports.File({ filename: 'logs/allLogs.log' })
    ],
});

export default logger;