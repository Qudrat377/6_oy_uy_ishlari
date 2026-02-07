import type { NextFunction, Response } from "express"
import type { CustomRequest } from "./authorization.js"
import { accessToken } from "../Utils/token-generator.js"
import jwt, { type JwtPayload } from "jsonwebtoken"
import { CustomErrorHandler } from "../Utils/custom-error-hendler.js"

interface UserPayload extends JwtPayload {
    username: string;
    email: string;
    role: string;
    id: number;
}

export const refresh = (req: CustomRequest, res: Response, 
    next: NextFunction) => {
    try {
        const refresh_token = req.cookies.refresh_token
        
        if (!refresh_token) {
            throw CustomErrorHandler.UnAuthorized("Refresh token not found")
        }

        const decode = jwt.verify(refresh_token, String(process.env.REFRESH_SECRET)) as UserPayload

    const payload = {
        username: decode.username,
        email: decode.email,
        role: decode.role,
        id: decode.id,
      };

      const access_Token = accessToken(payload);

      res.cookie("access_token", access_Token, {
        httpOnly: true,
        secure: false, // Localhostda false bo'lishi kerak (HTTPS bo'lsa true)
        sameSite: 'lax', // Brauzer qabul qilishi uchun
        // maxAge: 1000 * 60 * 15,
          maxAge: 3600 * 1000 * 24 * 15, // o'chirish kerak
      });

      // res.cookie("access_token", access_Token, {
      //   httpOnly: true,
      //   maxAge: 1000 * 60 * 15,
      // });

      return res.status(200).json({
        message: "Success",
        access_Token,
      });
    } catch (error) {
        next(error)
    }
}