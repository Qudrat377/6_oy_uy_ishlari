import jwt from "jsonwebtoken";
import { CustomErrorHandler } from "../Utils/custom-error-hendler.js";
export const superadminTekshiruvchi = async (req, res, next) => {
    try {
        const access_token = req.cookies.access_token;
        if (!access_token) {
            throw CustomErrorHandler.UnAuthorized("Access token not found");
        }
        const decode = jwt.verify(access_token, String(process.env.SECRET));
        req.user = decode;
        if (!["superadmin"].includes(req.user.role)) {
            throw CustomErrorHandler.Forbidden("You are not superadmin");
        }
        next();
    }
    catch (error) {
        next(error);
    }
};
//# sourceMappingURL=superadmin-verify.js.map