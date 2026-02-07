import {Router, type RequestHandler} from "express"
import { forgotPassword, getUser, login, logout, register, resendOtp, verify } from "../controller/auth.ctr.js"
import { authorization } from "../middleware/authorization.js"
import { refresh } from "../middleware/refresh-token.js"
import { validate } from "../middleware/auth-validation.middleware.js"
import { ForgotPasswordValidator, LoginValidator, RegisterValidator, ResendOtpValidator, VerifyValidator } from "../validator/auth.validator.js"

const authRouter = Router()

authRouter.get("/get_all_users", authorization, getUser as RequestHandler)
authRouter.post("/register", validate(RegisterValidator), register as RequestHandler)
authRouter.put("/verify", validate(VerifyValidator), verify as RequestHandler)
authRouter.post("/login", validate(LoginValidator), login as RequestHandler)
authRouter.get("/refresh", refresh as RequestHandler)
authRouter.get("/logout", authorization, logout as RequestHandler)
authRouter.post("/resend_otp", validate(ResendOtpValidator), resendOtp as RequestHandler)
authRouter.post("/forgot_password", validate(ForgotPasswordValidator), forgotPassword as RequestHandler)

export default authRouter