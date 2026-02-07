import Joi from "joi";
export const SuperAdminValidator = (data) => {
    return Joi.object({
        role: Joi.string().trim().pattern(new RegExp('^[a-zA-Z]{4,10}$')).required(),
    }).validate(data, { abortEarly: false });
};
//# sourceMappingURL=superadmin.validator.js.map