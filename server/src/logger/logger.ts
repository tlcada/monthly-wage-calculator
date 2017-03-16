'use strict';

const winston = require('winston');
import config from '../../config/config';

/**
 * Use this class to save log files
 */
class Logger {
    private disableConsoleLog: boolean;

    constructor(disableConsoleLog?: boolean) {
        this.disableConsoleLog = disableConsoleLog;
    }

    /* Save an error messages to the error.log file. */
    public error(description: string, details: any): void {
        this.logger.error(description, details);
    }

    private get logger (): Logger {
        const errorFile = new (winston.transports.File) ({
            name: 'error-file',
            filename: config.logs.rootFolder + '/' + config.logs.files.error,
            level: 'error'
        });

        const console = new winston.transports.Console ({
            handleExceptions: true,
            json: true
        });

        return new winston.Logger ({
            transports: (this.disableConsoleLog) ? [errorFile] : [errorFile, console],
            exitOnError: false
        });
    }
}

export default Logger;