import Joi from "joi";
export const RegisterValidator = (data) => {
    return Joi.object({
        username: Joi.string().trim().pattern(new RegExp('^[a-zA-Z0-9]{3,50}$')).required(),
        email: Joi.string().trim().email().required(),
        password: Joi.string().trim().min(8).required(),
    }).validate(data, { abortEarly: false });
};
export const LoginValidator = (data) => {
    return Joi.object({
        email: Joi.string().trim().email().required(),
        password: Joi.string().trim().required(),
    }).validate(data, { abortEarly: false });
};
export const VerifyValidator = (data) => {
    return Joi.object({
        email: Joi.string().trim().email().required(),
        otp: Joi.string().length(6).required(),
    }).validate(data, { abortEarly: false });
};
export const ResendOtpValidator = (data) => {
    return Joi.object({
        email: Joi.string().trim().email().required(),
    }).validate(data, { abortEarly: false });
};
export const ForgotPasswordValidator = (data) => {
    return Joi.object({
        email: Joi.string().trim().email().required(),
        otp: Joi.string().length(6).required(),
        new_password: Joi.string().trim().min(8).required()
    }).validate(data, { abortEarly: false });
};
//# sourceMappingURL=auth.validator.js.map