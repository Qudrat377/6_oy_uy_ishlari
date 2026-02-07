import Joi from "joi";

// add category uchun
export const addCategoryValidator = (data: any) => {
    return Joi.object({
        category_name: Joi.string().trim().pattern(new RegExp('^[a-zA-Z0-9]{2,30}$')).required(),
    }).validate(data, { abortEarly: false });
};

// update category uchun 
export const updateCategoryValidator = (data: any) => {
    return Joi.object({
        category_name: Joi.string().trim().pattern(new RegExp('^[a-zA-Z0-9]{2,30}$')).required(),
    }).validate(data, { abortEarly: false });
};