import Joi from "joi"

// add karzina uchun
export const addKarzinaValidator = (data: any) => {
    return Joi.object({        
        product_id: Joi.string().trim().pattern(new RegExp('^[0-9]{1,7}$')).required(),
        variant_id: Joi.string().trim().pattern(new RegExp('^[0-9]{1,20}$')).required(),
        quantity: Joi.string().trim().pattern(new RegExp('^[0-9]{1,7}$')).required(),
    }).validate(data, { abortEarly: false });
};

// update karzina uchun 
export const updateKarzinaValidator = (data: any) => {
    return Joi.object({
        cart_id: Joi.string().trim().pattern(new RegExp('^[0-9]{1,7}$')).required(),
        new_quantity: Joi.string().trim().pattern(new RegExp('^[0-9]{1,7}$')).required(),
    }).validate(data, { abortEarly: false });
};