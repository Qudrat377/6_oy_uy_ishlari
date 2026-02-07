import type { NextFunction, Response } from "express";
import type { CustomRequest } from "../middleware/authorization.js";
import { Auth } from "../model/auth.model.js";

export const updateProfile = async (req: CustomRequest, res: Response, 
    next: NextFunction) => {
    try {
        // Multer yuklagan fayl nomini req.file dan olamiz
        const imageName = req.file?.filename;

        if (!imageName) {
            return res.status(400).json({ message: "Rasm yuklanmadi" });
        }

        // Endi bazaga saqlaymiz
        await Auth.update({ avatar: imageName }, { where: { id: req.user.id } });

        res.json({ message: "Profil yangilandi", image: imageName });
    } catch (error) {
        next(error);
    }
};