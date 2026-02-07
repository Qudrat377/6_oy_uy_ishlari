import jwt from "jsonwebtoken";
import { CustomErrorHandler } from "../Utils/custom-error-hendler.js";
export const authorization = (req, res, next) => {
    try {
        const access_token = req.cookies.access_token;
        if (!access_token) {
            throw CustomErrorHandler.UnAuthorized("Access token not found");
        }
        const decode = jwt.verify(access_token, String(process.env.SECRET));
        req.user = decode;
        next();
    }
    catch (error) {
        next(error);
    }
};
//# sourceMappingURL=authorization.js.map