import { CustomErrorHandler } from "./custom-error-hendler.js"
import nodemailer from "nodemailer"

export const emailSender = async (code: string, email: string) => {
    try {
        const transporter = nodemailer.createTransport({
            service: "gmail",
            auth: {
                user: "Assomad377@gmail.com",
                pass: process.env.APP_KEY
            }
        })

        await transporter.sendMail({
            from: "Qudrat",
            to: email,
            subject: "Uzum verification",
            text: "ushbu xabarda tasdiqlash kod keltirilgan",
            html: `<b style="color: blue; font-size: 54px">${code}</b>`
        })
    } catch (error: any) {
        throw CustomErrorHandler.BadRequest(error.message)
    }
}