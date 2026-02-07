import { CustomErrorHandler } from "../Utils/custom-error-hendler.js";
import path from "path";
import fs from "fs";
import logger from "../Utils/logger.js";
export const validate = (validator) => {
    return (req, res, next) => {
        const { error } = validator(req.body);
        if (error) {
            if (req.files) {
                const files = req.files;
                Object.values(files)
                    .flat()
                    .forEach((file) => {
                    const filePath = path.join(process.cwd(), "upload/images", file.filename);
                    if (fs.existsSync(filePath)) {
                        fs.unlinkSync(filePath);
                        logger.warn(`Foydalanuvchi kiritgan malumot validatordan qaytarildi rasmlar o'chirildi: Role: ID - ${req.user.id}`, {
                            metadata: {
                                ip: req.ip,
                                url: req.originalUrl,
                                id: req.user.id,
                            },
                        });
                    }
                });
            }
            const errorMessage = error.details.map((d) => d.message).join(", ");
            return next(CustomErrorHandler.BadRequest(errorMessage));
        }
        next();
    };
};
//# sourceMappingURL=auth-validation.middleware.js.map