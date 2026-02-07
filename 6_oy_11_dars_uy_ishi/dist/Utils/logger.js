import { createLogger, format, transports } from 'winston';
import Transport from 'winston-transport';
import { ErrorLog } from '../model/error.model.js';
import { WarnLog } from '../model/warn.model.js';
import { Log } from '../model/log.mdel.js';
class SequelizeTransport extends Transport {
    constructor(opts) {
        super(opts);
        this.model = opts.model;
    }
    async log(info, callback) {
        setImmediate(() => this.emit('logged', info));
        const { level, message, timestamp, ...meta } = info;
        try {
            await this.model.create({
                level,
                message,
                meta,
                timestamp: timestamp || new Date()
            });
        }
        catch (err) {
            console.error("Logger bazaga yozishda xatolik:", err);
        }
        callback();
    }
}
const errorOnly = format((info) => info.level === 'error' ? info : false);
const warnOnly = format((info) => info.level === 'warn' ? info : false);
const infoOnly = format((info) => (info.level !== 'error' && info.level !== 'warn') ? info : false);
const logger = createLogger({
    level: "debug",
    format: format.combine(format.timestamp({ format: 'YYYY-MM-DD HH:mm:ss' }), format.json()),
    transports: [
        new transports.Console({
            format: format.combine(format.colorize(), format.simple())
        }),
        new SequelizeTransport({
            model: ErrorLog,
            level: 'error',
            format: format.combine(errorOnly())
        }),
        new SequelizeTransport({
            model: WarnLog,
            level: 'warn',
            format: format.combine(warnOnly())
        }),
        new SequelizeTransport({
            model: Log,
            level: 'info',
            format: format.combine(infoOnly())
        })
    ]
});
export default logger;
//# sourceMappingURL=logger.js.map