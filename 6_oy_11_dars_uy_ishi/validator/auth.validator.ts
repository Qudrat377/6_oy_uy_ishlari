// import Joi from "joi";

// export const AuthValidator = (data: any) => {
//     const schema = Joi.object({
//         username: Joi.string()
//             .trim()
//             .pattern(new RegExp('^[a-zA-Z0-9]{3,50}$')) // Raqamlarni ham qo'shdik
//             .required()
//             .messages({
//                 'string.pattern.base': "Username 3 tadan 50 tagacha faqat harf va raqamlardan iborat bo'lishi kerak"
//             }),
//         email: Joi.string()
//             .trim()
//             .max(50)
//             .email()
//             .required(),
//         password: Joi.string()
//             .trim()
//             .min(8)
//             .max(200)
//             .required()
//     });

//     // abortEarly: false — barcha xatolarni birdaniga qaytarish uchun
//     return schema.validate(data, { abortEarly: false });
// };

import Joi from "joi";

// Register uchun
export const RegisterValidator = (data: any) => {
    return Joi.object({
        username: Joi.string().trim().pattern(new RegExp('^[a-zA-Z0-9]{3,50}$')).required(),
        email: Joi.string().trim().email().required(),
        password: Joi.string().trim().min(8).required(),
    }).validate(data, { abortEarly: false });
};

// Login uchun (username shart emas)
export const LoginValidator = (data: any) => {
    return Joi.object({
        email: Joi.string().trim().email().required(),
        password: Joi.string().trim().required(),
    }).validate(data, { abortEarly: false });
};

// Verify OTP uchun
export const VerifyValidator = (data: any) => {
    return Joi.object({
        email: Joi.string().trim().email().required(),
        otp: Joi.string().length(6).required(),
    }).validate(data, { abortEarly: false });
};

// resend otp uchun 
export const ResendOtpValidator = (data: any) => {
    return Joi.object({
        email: Joi.string().trim().email().required(),
    }).validate(data, { abortEarly: false });
};

// forgotPassword uchun 
export const ForgotPasswordValidator = (data: any) => {
    return Joi.object({
        email: Joi.string().trim().email().required(),
        otp: Joi.string().length(6).required(),
        new_password: Joi.string().trim().min(8).required()
    }).validate(data, {abortEarly: false})
}