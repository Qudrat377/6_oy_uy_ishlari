import { Auth } from "../model/auth.model.js";
export const updateProfile = async (req, res, next) => {
    try {
        const imageName = req.file?.filename;
        if (!imageName) {
            return res.status(400).json({ message: "Rasm yuklanmadi" });
        }
        await Auth.update({ avatar: imageName }, { where: { id: req.user.id } });
        res.json({ message: "Profil yangilandi", image: imageName });
    }
    catch (error) {
        next(error);
    }
};
//# sourceMappingURL=upoad-img.js.map