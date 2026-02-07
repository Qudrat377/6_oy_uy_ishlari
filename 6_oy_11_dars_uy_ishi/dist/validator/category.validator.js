import Joi from "joi";
export const addCategoryValidator = (data) => {
    return Joi.object({
        category_name: Joi.string().trim().pattern(new RegExp('^[a-zA-Z0-9]{2,30}$')).required(),
    }).validate(data, { abortEarly: false });
};
export const updateCategoryValidator = (data) => {
    return Joi.object({
        category_name: Joi.string().trim().pattern(new RegExp('^[a-zA-Z0-9]{2,30}$')).required(),
    }).validate(data, { abortEarly: false });
};
//# sourceMappingURL=category.validator.js.map