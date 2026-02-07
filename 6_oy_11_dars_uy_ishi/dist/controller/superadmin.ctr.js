import { Auth } from "../model/auth.model.js";
import { CustomErrorHandler } from "../Utils/custom-error-hendler.js";
import logger from "../Utils/logger.js";
export const SuperAdmin = async (req, res, next) => {
    try {
        const { id } = req.params;
        const userId = Number(id);
        let userdata = null;
        if (id) {
            userdata = await Auth.findByPk(userId);
        }
        if (!userdata) {
            logger.warn(`User topilmadi: So'ralgan ID - ${id}`, {
                metadata: { url: req.originalUrl, id: req.user.id },
            });
            throw CustomErrorHandler.NotFound("ID bo'yicha malumot topilmadi");
        }
        const { role } = req.body;
        if (!role) {
            logger.warn(`Role topilmadi: So'ralgan ID - ${id}`, {
                metadata: { url: req.originalUrl, id: req.user.id },
            });
            throw CustomErrorHandler.NotFound("Malumot topilmadi");
        }
        if (!["user", "admin", "superadmin"].includes(role)) {
            logger.warn(`Role xato: bunday rolga tayinlab bo'lmaydi: ${role} So'ralgan ID - ${id}`, {
                metadata: { url: req.originalUrl, id: req.user.id },
            });
            throw CustomErrorHandler.Forbidden("Bunday rolega tayinlab bo'lmaydi asosiy rolelar: user, admin");
        }
        if (role === "superadmin") {
            logger.warn(`Superadminga tayinlash mumkin emas: So'ralgan ID - ${id}`, {
                metadata: { url: req.originalUrl, id: req.user.id },
            });
            throw CustomErrorHandler.BadRequest("Superadminga tayinlash mumkin emas");
        }
        await Auth.update({ role: role }, { where: { id: userId } });
        logger.info(`Foydalanuvchi role qayta yangilandi: Role: ${role} ID - ${id}`, {
            metadata: { ip: req.ip, url: req.originalUrl, id: req.user.id },
        });
        res.status(201).json({
            message: "Foydalanuvchining role qayta tayinlandi"
        });
    }
    catch (error) {
        const isErr = error instanceof Error;
        logger.error(`Foudalanuvchi rolini almashtirishda xatolik: ${isErr ? error.message : "nomalum"}`, {
            metadata: {
                userId: req.user?.id,
                stack: isErr ? error.stack : undefined,
                params: req.params,
            },
        });
        next(error);
    }
};
//# sourceMappingURL=superadmin.ctr.js.map