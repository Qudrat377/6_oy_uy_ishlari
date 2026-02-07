import jwt from "jsonwebtoken"
import { CustomErrorHandler } from "./custom-error-hendler.js"
import dotenv from "dotenv"
dotenv.config()

export const accessToken = (payload: object) => {
    try {
        return jwt.sign(payload, String(process.env.SECRET), {expiresIn: "25m"})
         
    } catch (error: any) {
        throw CustomErrorHandler.BadRequest(error.message)
    }
}

export const refreshToken = (payload: object) => {
    try {
        return jwt.sign(payload, String(process.env.REFRESH_SECRET), {expiresIn: "15d"})
         
    } catch (error: any) {
        throw CustomErrorHandler.BadRequest(error.message)
    }
} 
