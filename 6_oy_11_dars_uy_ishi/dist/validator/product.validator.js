import Joi from "joi";
export const addProductValidator = (data) => {
    return Joi.object({
        title: Joi.string().trim().pattern(new RegExp('^[a-zA-Z0-9 ]{2,30}$')).required(),
        description: Joi.string(),
        category_id: Joi.string().trim().required(),
        variants: Joi.string().required(),
    }).validate(data, { abortEarly: false });
};
export const updateProductValidator = (data) => {
    return Joi.object({
        title: Joi.string().trim().pattern(new RegExp('^[a-zA-Z0-9 ]{2,30}$')),
        description: Joi.string(),
        category_id: Joi.string().trim(),
        variants: Joi.string(),
        variantId: Joi.string().trim().pattern(new RegExp('^[0-9]{1,20}$')),
        actionType: Joi.string().trim().pattern(new RegExp('^[_A-Z]{2,20}$'))
    }).validate(data, { abortEarly: false });
};
//# sourceMappingURL=product.validator.js.map