// import type { NextFunction, Request, Response } from "express"
// import { CustomErrorHandler } from "../Utils/custom-error-hendler.js"
// import { AuthValidator } from "../validator/auth.validator.js"

// export const authMiddleware = function(req: Request, res: Response,
//     next: NextFunction) {
//     const {error} = AuthValidator(req.body)

//     if (error) {
//        throw CustomErrorHandler.BadRequest(error.message)
//     }

//     next()
// }

// ---------------------------------------------ikkinchi middlevare ishlayapdi lekin validatorda xato bo'lsa rasmlarni o'chirmaydi

// import type { NextFunction, Request, Response } from "express";
// import { CustomErrorHandler } from "../Utils/custom-error-hendler.js";

// // Bu funksiya validatorni qabul qiladi va middleware qaytaradi
// export const validate = (validator: any) => {
//     return (req: Request, res: Response, next: NextFunction) => {
//         const { error } = validator(req.body);

//         if (error) {
//             const errorMessage = error.details.map((d: any) => d.message).join(', ');
//             return next(CustomErrorHandler.BadRequest(errorMessage));
//         }

//         next();
//     };
// };

// ---------------------------------------------xatoda rasmlarni ham o'chirishga mo'ljallangan

import type { NextFunction, Request, Response } from "express";
import { CustomErrorHandler } from "../Utils/custom-error-hendler.js";
import path from "path";
import fs from "fs";
import logger from "../Utils/logger.js";
import type { CustomRequest } from "./authorization.js";

export const validate = (validator: any) => {
  return (req: CustomRequest, res: Response, next: NextFunction) => {
    const { error } = validator(req.body);

    if (error) {
      // --- AGAR XATO BO'LSA, YUKLANGAN RASMLARNI O'CHIRAMIZ ---
      if (req.files) {
        const files = req.files as {
          [fieldname: string]: Express.Multer.File[];
        };

        // Barcha maydonlardagi (main_image, variant_images) fayllarni yig'ib olamiz
        Object.values(files)
          .flat()
          .forEach((file) => {
            const filePath = path.join(
              process.cwd(),
              "upload/images",
              file.filename,
            );
            if (fs.existsSync(filePath)) {
              fs.unlinkSync(filePath); // Faylni serverdan o'chirish
              logger.warn(
                `Foydalanuvchi kiritgan malumot validatordan qaytarildi rasmlar o'chirildi: Role: ID - ${req.user.id}`,
                {
                  metadata: {
                    ip: req.ip,
                    url: req.originalUrl,
                    id: req.user.id,
                  },
                },
              );
            }
          });
      }

      const errorMessage = error.details.map((d: any) => d.message).join(", ");
      return next(CustomErrorHandler.BadRequest(errorMessage));
    }

    next();
  };
};
