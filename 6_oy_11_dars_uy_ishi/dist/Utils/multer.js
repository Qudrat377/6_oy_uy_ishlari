import multer from "multer";
import { extname } from "path";
const storage = multer.diskStorage({
    destination: "./upload/images",
    filename: (req, file, cb) => {
        const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1E9);
        const ext = extname(file.originalname);
        cb(null, file.fieldname + "-" + uniqueSuffix + ext);
    }
});
export const upload = multer({
    storage,
    limits: { fileSize: 5 * 1024 * 1024 },
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
//# sourceMappingURL=multer.js.map