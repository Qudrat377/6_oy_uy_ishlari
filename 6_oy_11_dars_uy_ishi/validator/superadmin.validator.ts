import Joi from "joi";

// Register uchun
export const SuperAdminValidator = (data: any) => {
    return Joi.object({
        role: Joi.string().trim().pattern(new RegExp('^[a-zA-Z]{4,10}$')).required(),
    }).validate(data, { abortEarly: false });
};
