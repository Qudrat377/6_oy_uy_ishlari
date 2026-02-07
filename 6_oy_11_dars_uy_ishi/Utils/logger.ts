// import { createLogger, format, transports } from 'winston';
// import Transport from 'winston-transport';
// import TransportStreamOptions from 'winston-transport';
// import { Pool } from 'pg';
// import dotenv from 'dotenv';

// dotenv.config();

// // PostgreSQL ulanish pulini yaratamiz
// const pool = new Pool({
//     connectionString: process.env.DB_DATABASE,
// });

// // 1. Custom PostgreSQL Transport Klassi
// class PostgresTransport extends Transport {
//     constructor(opts?: TransportStreamOptions) {
//         super(opts);
//     }

//     log(info: any, callback: () => void) {
//         // Log yozish jarayonini async bajarish
//         setImmediate(() => this.emit('logged', info));

//         const { level, message, timestamp, ...meta } = info;
        
//         // SQL so'rovi: meta ma'lumotlarni JSONB formatida saqlaymiz
//         const query = `
//             INSERT INTO logs (level, message, meta, timestamp) 
//             VALUES ($1, $2, $3, $4)
//         `;
        
//         pool.query(query, [level, message, JSON.stringify(meta), timestamp])
//             .catch(err => {
//                 console.error("Winston PostgreSQL-ga yozishda xato:", err);
//             });

//         callback();
//     }
// }

// // 2. Faqat INFO va DEBUG uchun filtr (xato va ogohlantirishlarni chetlab o'tish)
// const lowLevelFilter = format((info) => {
//     return (info.level !== 'error' && info.level !== 'warn') ? info : false;
// });

// // 3. Logger konfiguratsiyasi
// const logger = createLogger({
//     level: "debug",
//     format: format.combine(
//         format.timestamp({ format: 'YYYY-MM-DD HH:mm:ss' }),
//         format.json()
//     ),
//     transports: [
//         // Konsolga chiqarish (Dasturchi uchun rangli)
//         new transports.Console({
//             format: format.combine(
//                 format.colorize(),
//                 format.simple()
//             )
//         }),

//         // Barcha loglarni bazaga yozuvchi transport
//         new PostgresTransport()
//     ]
// });

// export default logger;

// ----------------------------------------------------------------------bu ishlab turgan logger lekin hamma loglarni bitta qilib yozadi

// import { createLogger, format, transports } from 'winston';
// import Transport from 'winston-transport';
// import { Log } from "../model/log.mdel.js"; // Log modelini o'zingiz yaratgan papkadan import qiling

// // 1. Sequelize asosidagi Custom Transport
// class SequelizeTransport extends Transport {
//     constructor(opts?: any) {
//         super(opts);
//     }

//     // Log metodini async qilamiz, chunki Sequelize DB bilan ishlaydi
//     async log(info: any, callback: () => void) {
//         // Event loopni bloklamaslik uchun setImmediate ishlatiladi
//         setImmediate(() => this.emit('logged', info));

//         const { level, message, timestamp, ...meta } = info;

//         try {
//             // Sequelize orqali bazaga saqlash
//             await Log.create({
//                 level: level,
//                 message: message,
//                 meta: meta, // Meta ma'lumotlar (JSONB)
//                 timestamp: timestamp || new Date()
//             });
//         } catch (err) {
//             // Agar bazaga yozishda xato bo'lsa, konsolga chiqaradi
//             console.error("Logger bazaga yozishda xatolik berdi:", err);
//         }

//         // Winston log yozib bo'linganini bilishi uchun callback chaqiriladi
//         callback();
//     }
// }

// // 2. Logger konfiguratsiyasi
// const logger = createLogger({
//     level: "debug",
//     format: format.combine(
//         format.timestamp({ format: 'YYYY-MM-DD HH:mm:ss' }),
//         format.json()
//     ),
//     transports: [
//         // Rivojlantirish vaqtida konsolda ko'rish uchun
//         new transports.Console({
//             format: format.combine(
//                 format.colorize(),
//                 format.simple()
//             )
//         }),

//         // Bazaga yozish uchun biz yaratgan transport
//         new SequelizeTransport()
//     ]
// });

// export default logger;

// -------------------------------------------------bu yangi barcha loglarni alohida yozadi

import { createLogger, format, transports } from 'winston';
import Transport from 'winston-transport';
import { ErrorLog } from '../model/error.model.js';
import { WarnLog } from '../model/warn.model.js';
import { Log } from '../model/log.mdel.js';

// 1. Dinamik transport klassi
// Bu klass qaysi model (jadval) berilsa, o'shanga yozib beradi
class SequelizeTransport extends Transport {
    private model: any;

    constructor(opts: any) {
        super(opts);
        this.model = opts.model;
    }

    async log(info: any, callback: () => void) {
        setImmediate(() => this.emit('logged', info));

        const { level, message, timestamp, ...meta } = info;

        try {
            await this.model.create({
                level,
                message,
                meta,
                timestamp: timestamp || new Date()
            });
        } catch (err) {
            console.error("Logger bazaga yozishda xatolik:", err);
        }

        callback();
    }
}

// 2. Darajalar uchun maxsus filtrlar
// Winston bir transportga kelsa, o'sha leveldan pastlarini ham olishi mumkin, 
// shuning uchun bizga FAQAT o'sha darajani tutuvchi filtr kerak.
const errorOnly = format((info) => info.level === 'error' ? info : false);
const warnOnly = format((info) => info.level === 'warn' ? info : false);
const infoOnly = format((info) => (info.level !== 'error' && info.level !== 'warn') ? info : false);

// 3. Asosiy Logger konfiguratsiyasi
const logger = createLogger({
    level: "debug", // Eng pastki daraja (hammasini o'tkazadi)
    format: format.combine(
        format.timestamp({ format: 'YYYY-MM-DD HH:mm:ss' }),
        format.json()
    ),
    transports: [
        // A. Konsolga rangli chiqarish (Dasturchi uchun)
        new transports.Console({
            format: format.combine(
                format.colorize(),
                format.simple()
            )
        }),

        // B. Errorlar uchun -> error_logs jadvali
        new SequelizeTransport({
            model: ErrorLog,
            level: 'error',
            format: format.combine(errorOnly())
        }),

        // C. Warninglar uchun -> warning_logs jadvali
        new SequelizeTransport({
            model: WarnLog,
            level: 'warn',
            format: format.combine(warnOnly())
        }),

        // D. Info va Debug uchun -> info_logs jadvali
        new SequelizeTransport({
            model: Log,
            level: 'info',
            format: format.combine(infoOnly())
        })
    ]
});

export default logger;