import Joi from "joi";
export const addKarzinaValidator = (data) => {
    return Joi.object({
        product_id: Joi.string().trim().pattern(new RegExp('^[0-9]{1,7}$')).required(),
        variant_id: Joi.string().trim().pattern(new RegExp('^[0-9]{1,20}$')).required(),
        quantity: Joi.string().trim().pattern(new RegExp('^[0-9]{1,7}$')).required(),
    }).validate(data, { abortEarly: false });
};
export const updateKarzinaValidator = (data) => {
    return Joi.object({
        cart_id: Joi.string().trim().pattern(new RegExp('^[0-9]{1,7}$')).required(),
        new_quantity: Joi.string().trim().pattern(new RegExp('^[0-9]{1,7}$')).required(),
    }).validate(data, { abortEarly: false });
};
//# sourceMappingURL=karzina.validator.js.map