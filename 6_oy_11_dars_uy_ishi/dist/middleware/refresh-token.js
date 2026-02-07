import { accessToken } from "../Utils/token-generator.js";
import jwt, {} from "jsonwebtoken";
import { CustomErrorHandler } from "../Utils/custom-error-hendler.js";
export const refresh = (req, res, next) => {
    try {
        const refresh_token = req.cookies.refresh_token;
        if (!refresh_token) {
            throw CustomErrorHandler.UnAuthorized("Refresh token not found");
        }
        const decode = jwt.verify(refresh_token, String(process.env.REFRESH_SECRET));
        const payload = {
            username: decode.username,
            email: decode.email,
            role: decode.role,
            id: decode.id,
        };
        const access_Token = accessToken(payload);
        res.cookie("access_token", access_Token, {
            httpOnly: true,
            secure: false,
            sameSite: 'lax',
            maxAge: 3600 * 1000 * 24 * 15,
        });
        return res.status(200).json({
            message: "Success",
            access_Token,
        });
    }
    catch (error) {
        next(error);
    }
};
//# sourceMappingURL=refresh-token.js.map