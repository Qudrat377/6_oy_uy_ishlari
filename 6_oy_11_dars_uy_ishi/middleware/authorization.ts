import jwt from "jsonwebtoken"
import { CustomErrorHandler } from "../Utils/custom-error-hendler.js";
import type { NextFunction, Request, Response } from "express";

export interface CustomRequest extends Request {
    user?: any; // 'any' o'rniga foydalanuvchi tipini yozish yaxshiroq
    image?: string | undefined
}

export const authorization = (req: CustomRequest, res: Response, 
    next: NextFunction) => {
    try {
       const access_token = req.cookies.access_token 

       if (!access_token) {
        throw CustomErrorHandler.UnAuthorized("Access token not found")
       }
       
       const decode = jwt.verify(access_token, String(process.env.SECRET))       
       req.user = decode

       next()
    } catch (error) {
        next(error)
    }
}