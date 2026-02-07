import { Auth } from "../model/auth.model.js";
import { CustomErrorHandler } from "../Utils/custom-error-hendler.js";
import logger from "../Utils/logger.js";
import bcrypt from "bcrypt";
import { emailSender } from "../Utils/email-sender.js";
import { accessToken, refreshToken } from "../Utils/token-generator.js";
export const register = async (req, res, next) => {
    try {
        const { username, email, password } = req.body;
        const foundedUser = await Auth.findOne({ where: { email } });
        logger.info(`Registerga murojat: Username - ${username}`, {
            metadata: { ip: req.ip, host: req.host, url: req.originalUrl, email },
        });
        if (foundedUser) {
            logger.warn(`User avvaldan bor - ${email}`, {
                metadata: {
                    ip: req.ip,
                    host: req.host,
                    url: req.originalUrl,
                    username,
                },
            });
            throw CustomErrorHandler.UnAuthorized("User already exists");
        }
        const hashPassword = await bcrypt.hash(password, 12);
        const rendomNumbers = Array.from({ length: 6 }, () => Math.floor(Math.random() * 10)).join("");
        const time = Date.now() + 120000;
        await Auth.create({ username,
            email,
            password: hashPassword,
            otp: rendomNumbers,
            otptime: time
        });
        await emailSender(rendomNumbers, email);
        logger.info(`Emailga kod yuborildi va register qilindi: Email - ${email}`, {
            metadata: { ip: req.ip, host: req.host, url: req.originalUrl, rendomNumbers },
        });
        console.log(rendomNumbers, email);
        res.status(201).json({
            message: "Registered",
        });
    }
    catch (error) {
        const isErr = error instanceof Error;
        logger.error(`Registratsiya qilishda xatolik: ${isErr ? error.message : "nomalum"}`, {
            metadata: {
                stack: isErr ? error.stack : undefined,
                params: req.params,
            },
        });
        next(error);
    }
};
export const verify = async (req, res, next) => {
    try {
        const { email, otp } = req.body;
        logger.info(`verifyga murojat: Email - ${email}`, {
            metadata: { ip: req.ip, host: req.host, url: req.originalUrl, email },
        });
        const foundedUser = await Auth.findOne({ where: { email } });
        if (!foundedUser) {
            logger.warn(`User topilmadi - ${email}`, {
                metadata: {
                    ip: req.ip,
                    host: req.host,
                    url: req.originalUrl,
                },
            });
            throw CustomErrorHandler.UnAuthorized("User not found");
        }
        const time = Date.now();
        if (foundedUser.dataValues.otptime < `${time}`) {
            logger.warn(`OTP time eskirgan - ${email}`, {
                metadata: {
                    ip: req.ip,
                    host: req.host,
                    url: req.originalUrl,
                },
            });
            throw CustomErrorHandler.BadRequest("Otp time expired");
        }
        if (foundedUser.dataValues.otp !== otp) {
            logger.warn(`OTP mos emas - ${email}`, {
                metadata: {
                    ip: req.ip,
                    host: req.host,
                    url: req.originalUrl,
                },
            });
            throw CustomErrorHandler.BadRequest("Wrong verification code");
        }
        await Auth.update({ isVerified: true }, { where: { id: foundedUser.dataValues.id } });
        const payload = {
            username: foundedUser.dataValues.username,
            email: foundedUser.dataValues.email,
            role: foundedUser.dataValues.role,
            id: foundedUser.dataValues.id
        };
        const access_Token = accessToken(payload);
        const refresh_Token = refreshToken(payload);
        res.cookie("access_token", access_Token, {
            httpOnly: true,
            maxAge: 1000 * 60 * 15,
        });
        res.cookie("refresh_token", refresh_Token, {
            httpOnly: true,
            maxAge: 3600 * 1000 * 24 * 15,
        });
        logger.info(`verifiqatsiyadan yaxshi o'tildi: Email - ${email}`, {
            metadata: { ip: req.ip, host: req.host, url: req.originalUrl, email },
        });
        res.status(200).json({
            message: "Success",
            access_Token,
        });
    }
    catch (error) {
        const isErr = error instanceof Error;
        logger.error(`Verifiqatsiya qilishda xatolik: ${isErr ? error.message : "nomalum"}`, {
            metadata: {
                stack: isErr ? error.stack : undefined,
                params: req.params,
            },
        });
        next(error);
    }
};
export const login = async (req, res, next) => {
    try {
        const { email, password } = req.body;
        const foundedUser = await Auth.findOne({ where: { email } });
        logger.info(`Loginga murojat: Email - ${email}`, {
            metadata: { ip: req.ip, host: req.host, url: req.originalUrl, email },
        });
        if (!foundedUser) {
            logger.warn(`User topilmadi - ${email}`, {
                metadata: {
                    ip: req.ip,
                    host: req.host,
                    url: req.originalUrl,
                },
            });
            throw CustomErrorHandler.UnAuthorized("User not found");
        }
        const compare = await bcrypt.compare(password, foundedUser.dataValues.password);
        if (compare && foundedUser.dataValues.isVerified) {
            logger.info(`Loginga murojat isVerified va compare to'g'ri: Email - ${email}`, {
                metadata: { ip: req.ip, host: req.host, url: req.originalUrl, email, isVerified: foundedUser.isVerified, compare },
            });
            const payload = {
                username: foundedUser?.dataValues.username,
                email: foundedUser?.dataValues.email,
                role: foundedUser?.dataValues.role,
                id: foundedUser?.dataValues.id,
            };
            const access_Token = accessToken(payload);
            const refresh_Token = refreshToken(payload);
            res.cookie("access_token", access_Token, {
                httpOnly: true,
                secure: false,
                sameSite: 'lax',
                maxAge: 3600 * 1000 * 24 * 15,
            });
            res.cookie("refresh_token", refresh_Token, {
                httpOnly: true,
                secure: false,
                sameSite: "lax",
                maxAge: 3600 * 1000 * 24 * 15,
            });
            logger.info(`Saytga login qilib kirildi: Email - ${email}`, {
                metadata: { ip: req.ip, host: req.host, url: req.originalUrl, email },
            });
            res.status(200).json({
                message: "Success",
                access_Token,
            });
        }
        else {
            logger.warn(`Xato kalit - ${email}`, {
                metadata: {
                    ip: req.ip,
                    host: req.host,
                    url: req.originalUrl,
                    password
                },
            });
            throw CustomErrorHandler.UnAuthorized("Invalid password");
        }
    }
    catch (error) {
        const isErr = error instanceof Error;
        logger.error(`Loginda qilishda xatolik: ${isErr ? error.message : "nomalum"}`, {
            metadata: {
                stack: isErr ? error.stack : undefined,
                params: req.params,
            },
        });
        next(error);
    }
};
export const resendOtp = async (req, res, next) => {
    try {
        const { email } = req.body;
        const user = await Auth.findOne({ where: { email } });
        logger.info(`Resend otpga murojat: Email - ${email}`, {
            metadata: { ip: req.ip, host: req.host, url: req.originalUrl, email },
        });
        if (!user) {
            logger.warn(`User topilmadi - ${email}`, {
                metadata: {
                    ip: req.ip,
                    host: req.host,
                    url: req.originalUrl,
                },
            });
            throw CustomErrorHandler.UnAuthorized("User not found");
        }
        const rendomNumber = Array.from({ length: 6 }, () => Math.floor(Math.random() * 10)).join("");
        const time = Date.now() + 120000;
        await Auth.update({
            otp: rendomNumber,
            otptime: time
        }, { where: { email } });
        await emailSender(rendomNumber, email);
        console.log(rendomNumber, email);
        logger.info(`Resend otpdan kod yuborildi: Email - ${email}`, {
            metadata: { ip: req.ip, host: req.host, url: req.originalUrl, email, rendomNumber },
        });
        res.status(200).json({
            message: "Success",
        });
    }
    catch (error) {
        const isErr = error instanceof Error;
        logger.error(`Emailga xabar yuborishda xatolik: ${isErr ? error.message : "nomalum"}`, {
            metadata: {
                stack: isErr ? error.stack : undefined,
                params: req.params,
            },
        });
        next(error);
    }
};
export const logout = async (req, res, next) => {
    try {
        logger.info(`Logout qilindi: Email - ${req.user.id}`, {
            metadata: { ip: req.ip, host: req.host, url: req.originalUrl, email: req.user.email },
        });
        res.clearCookie("access_token");
        res.clearCookie("refresh_token");
        res.status(200).json({
            message: "Logout"
        });
    }
    catch (error) {
        const isErr = error instanceof Error;
        logger.error(`Tizimdan chiqishda xatolik: ${isErr ? error.message : "nomalum"}`, {
            metadata: {
                stack: isErr ? error.stack : undefined,
                params: req.params,
            },
        });
        next(error);
    }
};
export const forgotPassword = async (req, res, next) => {
    try {
        const { email, otp, new_password } = req.body;
        const foundedUser = await Auth.findOne({ where: { email } });
        logger.info(`Unitilgan kodni qaytatiklashga murojat: Email - ${email}`, {
            metadata: { ip: req.ip, host: req.host, url: req.originalUrl, email, otp },
        });
        if (!foundedUser) {
            logger.warn(`User topilmadi - ${email}`, {
                metadata: {
                    ip: req.ip,
                    host: req.host,
                    url: req.originalUrl,
                },
            });
            throw CustomErrorHandler.UnAuthorized("User not found");
        }
        const time = Date.now();
        if (foundedUser.dataValues.otptime < time) {
            logger.warn(`OTP time eskirgan - ${email}`, {
                metadata: {
                    ip: req.ip,
                    host: req.host,
                    url: req.originalUrl,
                },
            });
            throw CustomErrorHandler.BadRequest("Otp time expired");
        }
        if (foundedUser.dataValues.otp !== otp) {
            logger.warn(`OTP mos emas - ${email}`, {
                metadata: {
                    ip: req.ip,
                    host: req.host,
                    url: req.originalUrl,
                },
            });
            throw CustomErrorHandler.BadRequest("Wrong verification code");
        }
        const hashPassword = await bcrypt.hash(new_password, 12);
        foundedUser.password = hashPassword;
        await Auth.update({ password: hashPassword }, { where: { id: foundedUser.dataValues.id }
        });
        logger.info(`Unitilgan kodni qaytatiklash bajarildi kod qaytatiklandi: Email - ${email}`, {
            metadata: { ip: req.ip, host: req.host, url: req.originalUrl, email, otp },
        });
        res.status(200).json({
            message: "Success",
        });
    }
    catch (error) {
        const isErr = error instanceof Error;
        logger.error(`Parol almashtirishda xatolik: ${isErr ? error.message : "nomalum"}`, {
            metadata: {
                stack: isErr ? error.stack : undefined,
                params: req.params,
            },
        });
        next(error);
    }
};
export const getUser = async (req, res, next) => {
    try {
        const users = await Auth.findAll();
        logger.info(`Userlar so'radi: ID - ${req.user?.id}`, {
            metadata: { ip: req.ip, url: req.originalUrl, id: req.user?.id },
        });
        res.status(200).json(users);
    }
    catch (error) {
        const isErr = error instanceof Error;
        logger.error(`Userlarni olishda xatolik: ${isErr ? error.message : "nomalum"}`, {
            metadata: {
                userId: req.user?.id,
                stack: isErr ? error.stack : undefined,
                params: req.params,
            },
        });
        next(error);
    }
};
//# sourceMappingURL=auth.ctr.js.map