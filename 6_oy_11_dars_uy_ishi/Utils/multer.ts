// import multer from "multer";
// import {extname} from "path"
// import type { CustomRequest } from "../middleware/authorization.js";


// // multer 

// const storage = multer.diskStorage({
//     destination: "./upload/images",
//     filename: (req: CustomRequest, file, cb) => {
//         const uiquiName = file.fieldname + "_" + Date.now()

//         const ext = extname(file.originalname)
//         const name_Image = `${uiquiName}${ext}`
//         req.image = name_Image
//         return cb(null, name_Image)
//     }
// })

// export const upload = multer({storage})

// -------------------------------------------gemenai ishlab bergan uploaderi

import multer from "multer";
import { extname } from "path";
import type { Request } from "express";

const storage = multer.diskStorage({
    destination: "./upload/images",
    filename: (req, file, cb) => {
        // Fayl nomini xavfsizroq qilish (bo'shliqlarni olib tashlash)
        const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1E9);
        const ext = extname(file.originalname);
        cb(null, file.fieldname + "-" + uniqueSuffix + ext);
    }
});

export const upload = multer({
    storage,
    limits: { fileSize: 5 * 1024 * 1024 }, // 5MB limit
    fileFilter: (req, file, cb) => {
        const allowedTypes = /jpeg|jpg|png|webp/;
        const isExtMatch = allowedTypes.test(extname(file.originalname).toLowerCase());
        const isMimeMatch = allowedTypes.test(file.mimetype);

        if (isExtMatch && isMimeMatch) {
            return cb(null, true);
        }
        cb(new Error("Faqat rasm formatidagi fayllarni yuklash mumkin!"));
    }
});