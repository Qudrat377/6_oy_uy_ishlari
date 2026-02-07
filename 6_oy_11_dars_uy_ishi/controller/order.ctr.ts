import type { NextFunction, Response } from "express";
import type { CustomRequest } from "../middleware/authorization.js";
import sequelize from "../config/config.js";
import { Karzina } from "../model/karzina.model.js";
import { Product } from "../model/product.model.js";
import { CustomErrorHandler } from "../Utils/custom-error-hendler.js";
import { Order } from "../model/order.model.js";
import { OrderItem } from "../model/orderItems.js";
import { Op } from "sequelize";
import { associateModels } from "../model/assatsation/assatsation.js";
associateModels();

// Order.sync({force: true})
// OrderItem.sync({force: true})

// ------------------------------------------------get all orders

export const getAllOrders = async (req: CustomRequest, res: Response, next: NextFunction) => {
    try {
        const user_id = req.user.id;

        const orders = await Order.findAll({
            where: { user_id },
            order: [['createdAt', 'DESC']], // Eng yangilari tepada chiqadi
            include: [{
                model: OrderItem,
                as: 'items',
                include: [{ model: Product, as: 'product', attributes: ['title', 'main_image'] }]
            }]
        });

        res.status(200).json({
            success: true,
            data: orders
        });
    } catch (error) {
        next(error);
    }
};

// ------------------------------------------------get one orders

export const getOneOrder = async (req: CustomRequest, res: Response, next: NextFunction) => {
    try {
        const { id } = req.params;
        const user_id = req.user.id;

        const order = await Order.findOne({
            where: { id, user_id },
            include: [{
                model: OrderItem,
                as: 'items',
                include: [{ model: Product, as: 'product' }]
            }]
        });

        if (!order) throw CustomErrorHandler.NotFound("Buyurtma topilmadi");

        res.status(200).json({ success: true, data: order });
    } catch (error) {
        next(error);
    }
};

// ---------------------------------------------------created order 

export const createOrder = async (req: CustomRequest, res: Response, next: NextFunction) => {
    const t = await sequelize.transaction();
    try {
        const { first_name, street_address, phone_number } = req.body;
        const user_id = req.user.id;

        const myCart = await Karzina.findAll({ 
            where: { user_id },
            include: [{ model: Product, as: 'product' }]
        });

        if (myCart.length === 0) throw CustomErrorHandler.BadRequest("Savat bo'sh!");

        let total_amount = 0;
        const newOrder = await Order.create({
            user_id, total_amount: 0, first_name, street_address, phone_number, status: 'pending'
        }, { transaction: t });

        for (const item of myCart) {
            const product = item.dataValues.product; 
            const variants = [...product.variants];
            const vIndex = variants.findIndex((v: any) => v.id == item.variant_id);

            if (vIndex === -1) throw CustomErrorHandler.BadRequest(`${product.title} varianti topilmadi.`);

            const variant = variants[vIndex];
            
            // Stock tekshiruvi
            if (variant.stock < item.quantity) {
                throw CustomErrorHandler.BadRequest(
                    `${product.title}dan faqat ${variant.stock} ta qolgan. Savatni tahrirlang.`
                );
            }

            // Ombordan ayirish
            variant.stock -= item.quantity;
            product.variants = variants;
            product.changed('variants', true);
            await product.save({ transaction: t });

            // OrderItem yaratish
            await OrderItem.create({
                order_id: newOrder.id,
                product_id: item.product_id,
                variant_id: item.variant_id,
                quantity: item.quantity,
                price_at_purchase: item.price_per_unit
            }, { transaction: t });

            total_amount += Number(item.total_price);
        }

        newOrder.total_amount = total_amount;
        await newOrder.save({ transaction: t });
        await Karzina.destroy({ where: { user_id }, transaction: t });

        await t.commit();
        res.status(201).json({ success: true, message: "Sotib olindi!", orderId: newOrder.id });
    } catch (error) {
        await t.rollback();
        next(error);
    }
};

// ------------------------------------------------create order 

// export const createOrder = async (req: CustomRequest, res: Response, next: NextFunction) => {
//     const t = await sequelize.transaction();
//     try {
//         const { first_name, street_address, phone_number } = req.body;
//         const user_id = req.user.id;

//         // 1. Mijozning savatini barcha mahsulot ma'lumotlari bilan olamiz
//         const myCart = await Karzina.findAll({ 
//             where: { user_id },
//             include: [{ model: Product, as: 'product' }]
//         });

//         if (myCart.length === 0) throw CustomErrorHandler.BadRequest("Savat bo'sh!");

//         let total_amount = 0;

//         // 2. Buyurtma yaratish (hali summasi 0)
//         const newOrder = await Order.create({
//             user_id, total_amount: 0, first_name, street_address, phone_number, status: 'pending'
//         }, { transaction: t });

//         // 3. Har bir mahsulotni bittama-bitta tekshiramiz
//         for (const item of myCart) {
//             const product = item.dataValues.product; // Sequelize include qilgani uchun to'g'ridan-to'g'ri olamiz
//             const variants = [...product.variants];
//             const vIndex = variants.findIndex((v: any) => v.id == item.variant_id);

//             // A) Variant mavjudligini tekshirish
//             if (vIndex === -1) {
//                 throw CustomErrorHandler.BadRequest(`${product.title}ning tanlangan varianti endi mavjud emas.`);
//             }

//             const variant = variants[vIndex];

//             // B) MUHIM: OMBOR QOLDIĞINI TEKSHIRISH
//             if (variant.stock <= 0) {
//                 throw CustomErrorHandler.BadRequest(`${product.title} mahsuloti tugab qoldi. Iltimos, uni savatdan o'chiring.`);
//             }

//             if (variant.stock < item.quantity) {
//                 throw CustomErrorHandler.BadRequest(
//                     `${product.title}dan omborda faqat ${variant.stock} ta qolgan. Siz esa ${item.quantity} ta buyurtma bermoqchisiz. Iltimos, miqdorni kamaytiring.`
//                 );
//             }

//             // C) OMBORDAN AYIRISH
//             variant.stock -= item.quantity;
//             product.variants = variants;
//             product.changed('variants', true);
//             await product.save({ transaction: t });

//             // D) OrderItem yaratish (tarixni muhrlash)
//             await OrderItem.create({
//                 order_id: newOrder.id,
//                 product_id: item.product_id,
//                 variant_id: item.variant_id,
//                 quantity: item.quantity,
//                 price_at_purchase: item.price_per_unit
//             }, { transaction: t });

//             total_amount += Number(item.total_price);
//         }

//         // 4. Orderning umumiy summasini yangilaymiz
//         newOrder.total_amount = total_amount;
//         await newOrder.save({ transaction: t });

//         // 5. Savatni tozalaymiz (faqat sotib olinganidan keyin)
//         await Karzina.destroy({ where: { user_id }, transaction: t });

//         // Hammasi joyida bo'lsa, bazaga muhrlaymiz
//         await t.commit();

//         res.status(201).json({ 
//             success: true, 
//             message: "Xaridingiz muvaffaqiyatli yakunlandi!", 
//             orderId: newOrder.id 
//         });

//     } catch (error: any) {
//         await t.rollback();
//         next(error);
//     }
// };

// ------------------------------------------------cancel order 

export const cancelOrder = async (req: CustomRequest, res: Response, next: NextFunction) => {
    const t = await sequelize.transaction();
    try {
        const { id } = req.params;
        const user_id = req.user.id;

        const order = await Order.findOne({
            where: { id, user_id, status: 'pending' },
            include: [{ model: OrderItem, as: 'items' }]
        });

        if (!order) throw CustomErrorHandler.BadRequest("Buyurtmani bekor qilib bo'lmaydi yoki u allaqachon yopilgan");

        // Omborga (Stock) qaytarish mantiqi
        for (const item of order.dataValues.items) {
            const product = await Product.findByPk(item.product_id);
            if (product) {
                const variants = [...product.variants];
                const vIndex = variants.findIndex(v => v.id == item.variant_id);
                if (vIndex !== -1) {
                    const targetVariant = variants[vIndex]
                    if (targetVariant) {
                        targetVariant.stock += item.quantity; // Miqdorni qaytaramiz
                        product.variants = variants;
                        product.changed('variants', true);
                        await product.save({ transaction: t });
                    }
                }
            }
        }

        order.status = 'cancelled';
        await order.save({ transaction: t });

        await t.commit();
        res.status(200).json({ success: true, message: "Buyurtma bekor qilindi va mahsulotlar omborga qaytarildi" });
    } catch (error) {
        await t.rollback();
        next(error);
    }
};

// ------------------------------------------------confirm order 

export const confirmOrder = async (req: CustomRequest, res: Response, next: NextFunction) => {
    try {
        const { id } = req.params; // Order ID
        const user_id = req.user.id; // Tokendan kelgan mijoz IDsi

        // 1. Buyurtmani qidiramiz (Faqat shu mijozga tegishli va hali yopilmaganini)
        const order = await Order.findOne({
            where: { 
                id: id, 
                user_id: user_id,
                status: 'pending' // Yoki 'shipping' (yo'lda) bo'lsa
            }
        });

        if (!order) {
            throw CustomErrorHandler.BadRequest("Buyurtma topilmadi yoki u allaqachon yakunlangan.");
        }

        // 2. Mijoz "Oldim" deb tasdiqladi
        order.status = 'completed';
        await order.save();

        res.status(200).json({ 
            success: true, 
            message: "Mahsulotni qabul qilganingizni tasdiqladingiz. Xaridingiz uchun rahmat!" 
        });

    } catch (error) {
        next(error);
    }
};