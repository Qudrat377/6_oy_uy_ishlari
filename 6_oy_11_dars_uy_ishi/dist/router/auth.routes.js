import { Router } from "express";
import { forgotPassword, getUser, login, logout, register, resendOtp, verify } from "../controller/auth.ctr.js";
import { authorization } from "../middleware/authorization.js";
import { refresh } from "../middleware/refresh-token.js";
import { validate } from "../middleware/auth-validation.middleware.js";
import { ForgotPasswordValidator, LoginValidator, RegisterValidator, ResendOtpValidator, VerifyValidator } from "../validator/auth.validator.js";
const authRouter = Router();
authRouter.get("/get_all_users", authorization, getUser);
authRouter.post("/register", validate(RegisterValidator), register);
authRouter.put("/verify", validate(VerifyValidator), verify);
authRouter.post("/login", validate(LoginValidator), login);
authRouter.get("/refresh", refresh);
authRouter.get("/logout", authorization, logout);
authRouter.post("/resend_otp", validate(ResendOtpValidator), resendOtp);
authRouter.post("/forgot_password", validate(ForgotPasswordValidator), forgotPassword);
export default authRouter;
//# sourceMappingURL=auth.routes.js.map