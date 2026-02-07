import sequelize from "../config/config.js";
import { Karzina } from "../model/karzina.model.js";
import { Product } from "../model/product.model.js";
import { CustomErrorHandler } from "../Utils/custom-error-hendler.js";
import { Order } from "../model/order.model.js";
import { OrderItem } from "../model/orderItems.js";
import { Op } from "sequelize";
import { associateModels } from "../model/assatsation/assatsation.js";
associateModels();
export const getAllOrders = async (req, res, next) => {
    try {
        const user_id = req.user.id;
        const orders = await Order.findAll({
            where: { user_id },
            order: [['createdAt', 'DESC']],
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
    }
    catch (error) {
        next(error);
    }
};
export const getOneOrder = async (req, res, next) => {
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
        if (!order)
            throw CustomErrorHandler.NotFound("Buyurtma topilmadi");
        res.status(200).json({ success: true, data: order });
    }
    catch (error) {
        next(error);
    }
};
export const createOrder = async (req, res, next) => {
    const t = await sequelize.transaction();
    try {
        const { first_name, street_address, phone_number } = req.body;
        const user_id = req.user.id;
        const myCart = await Karzina.findAll({
            where: { user_id },
            include: [{ model: Product, as: 'product' }]
        });
        if (myCart.length === 0)
            throw CustomErrorHandler.BadRequest("Savat bo'sh!");
        let total_amount = 0;
        const newOrder = await Order.create({
            user_id, total_amount: 0, first_name, street_address, phone_number, status: 'pending'
        }, { transaction: t });
        for (const item of myCart) {
            const product = item.dataValues.product;
            const variants = [...product.variants];
            const vIndex = variants.findIndex((v) => v.id == item.variant_id);
            if (vIndex === -1)
                throw CustomErrorHandler.BadRequest(`${product.title} varianti topilmadi.`);
            const variant = variants[vIndex];
            if (variant.stock < item.quantity) {
                throw CustomErrorHandler.BadRequest(`${product.title}dan faqat ${variant.stock} ta qolgan. Savatni tahrirlang.`);
            }
            variant.stock -= item.quantity;
            product.variants = variants;
            product.changed('variants', true);
            await product.save({ transaction: t });
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
    }
    catch (error) {
        await t.rollback();
        next(error);
    }
};
export const cancelOrder = async (req, res, next) => {
    const t = await sequelize.transaction();
    try {
        const { id } = req.params;
        const user_id = req.user.id;
        const order = await Order.findOne({
            where: { id, user_id, status: 'pending' },
            include: [{ model: OrderItem, as: 'items' }]
        });
        if (!order)
            throw CustomErrorHandler.BadRequest("Buyurtmani bekor qilib bo'lmaydi yoki u allaqachon yopilgan");
        for (const item of order.dataValues.items) {
            const product = await Product.findByPk(item.product_id);
            if (product) {
                const variants = [...product.variants];
                const vIndex = variants.findIndex(v => v.id == item.variant_id);
                if (vIndex !== -1) {
                    const targetVariant = variants[vIndex];
                    if (targetVariant) {
                        targetVariant.stock += item.quantity;
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
    }
    catch (error) {
        await t.rollback();
        next(error);
    }
};
export const confirmOrder = async (req, res, next) => {
    try {
        const { id } = req.params;
        const user_id = req.user.id;
        const order = await Order.findOne({
            where: {
                id: id,
                user_id: user_id,
                status: 'pending'
            }
        });
        if (!order) {
            throw CustomErrorHandler.BadRequest("Buyurtma topilmadi yoki u allaqachon yakunlangan.");
        }
        order.status = 'completed';
        await order.save();
        res.status(200).json({
            success: true,
            message: "Mahsulotni qabul qilganingizni tasdiqladingiz. Xaridingiz uchun rahmat!"
        });
    }
    catch (error) {
        next(error);
    }
};
//# sourceMappingURL=order.ctr.js.map