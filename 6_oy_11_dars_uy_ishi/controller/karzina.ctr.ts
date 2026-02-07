import type { NextFunction, Response } from "express";
import type { CustomRequest } from "../middleware/authorization.js";
import { Product } from "../model/product.model.js";
import { Karzina } from "../model/karzina.model.js";
import logger from "../Utils/logger.js";
import { CustomErrorHandler } from "../Utils/custom-error-hendler.js";
import { Auth } from "../model/auth.model.js";
import type { CreateKarzinaDto, UpdateKarzinaDto } from "../dto/karzina.dto.js";

// Karzina.sync({force: true})

// -----------------------------------------------------------------get karzina

export const getAllKarzina = async (
  req: CustomRequest,
  res: Response,
  next: NextFunction,
) => {
  try {
    const user_id = req.user.id; // Authorization middleware-dan kelgan ID

    // 1. Savatdagi barcha mahsulotlarni mahsulot ma'lumotlari bilan birga olamiz
    const cartItems = await Karzina.findAll({
      where: { user_id },
      include: [
        {
          model: Product,
          as: "product", // Modelda belgilangan bog'lanish nomi
          attributes: ["id", "title", "main_image"], // Faqat kerakli maydonlarni olamiz
        },
      ],
    });

    if (!cartItems || cartItems.length === 0) {
      return res.status(200).json({
        success: true,
        message: "Savat hozircha bo'sh",
        data: [],
        grandTotal: 0,
      });
    }

    // 2. Savatdagi barcha total_price'larni qo'shib chiqamiz (Grand Total)
    // DECIMAL turida bo'lgani uchun Number() bilan o'girib olamiz
    const grandTotal = cartItems.reduce((sum, item) => {
      return sum + Number(item.total_price);
    }, 0);

    // 3. Javobni qaytaramiz
    res.status(200).json({
      success: true,
      data: cartItems,
      grandTotal: grandTotal, // Savatdagi hamma narsaning umumiy narxi
      totalItems: cartItems.length, // Necha xil mahsulot borligi
    });
  } catch (error: any) {
    next(error);
  }
};

// -----------------------------------------------------------------add karzina

export const addToKarzina = async (
  req: CustomRequest,
  res: Response,
  next: NextFunction,
) => {
  try {
    const { product_id, variant_id, quantity } = req.body as CreateKarzinaDto;
    const user_id = req.user.id;

    // 1. Mahsulotni tekshirish
    const product = await Product.findByPk(product_id);
    if (!product) {
      logger.warn(`Product topilmadi: ID - ${product_id}`, {
        metadata: { url: req.originalUrl, id: req.user.id },
      });
      throw CustomErrorHandler.NotFound("Product not found");
    }

    // 2. Variantni tekshirish
    const variant = product.variants.find((v: any) => v.id == variant_id);
    if (!variant) {
      logger.warn(`Variant topilmadi: VariantID - ${variant_id}`, {
        metadata: { url: req.originalUrl, id: req.user.id },
      });
      throw CustomErrorHandler.NotFound("Variant not found");
    }

    const unitPrice = variant.price;
    const requestedQty = Number(quantity);

    // --- OMBORNI TEKSHIRISH (STOCK CHECK) ---
    if (requestedQty > variant.stock) {
      throw CustomErrorHandler.BadRequest(
        `Omborda yetarli mahsulot yo'q. Hozirda qoldiq: ${variant.stock} ta`,
      );
    }

    // 3. Savatda bor-yo'qligini tekshirish
    let cartItem = await Karzina.findOne({
      where: { user_id, product_id, variant_id },
    });

    if (cartItem) {
      // Savatdagi eski miqdor + yangi so'ralayotgan miqdor
      const totalQty = cartItem.quantity + requestedQty;

      // Savatdagi jami miqdor ombordagidan oshib ketmasligi kerak
      if (totalQty > variant.stock) {
        throw CustomErrorHandler.BadRequest(
          `Sizda allaqachon ${cartItem.quantity} ta bor. Yana ${requestedQty} ta qo'shib bo'lmaydi. Jami qoldiq: ${variant.stock} ta`,
        );
      }

      cartItem.quantity = totalQty;
      cartItem.total_price = cartItem.quantity * unitPrice;
      await cartItem.save();
    } else {
      // Yangi qo'shish
      cartItem = await Karzina.create({
        user_id,
        product_id,
        variant_id,
        quantity: requestedQty,
        price_per_unit: unitPrice,
        total_price: requestedQty * unitPrice,
      });
    }

    logger.info(
      `Karzinkaga qo'shildi: UserID - ${user_id}, ProductID - ${product_id}`,
      {
        metadata: { ip: req.ip, url: req.originalUrl },
      },
    );

    res.status(200).json({
      success: true,
      message: "Karzinkaga saqlandi",
    });
  } catch (error: unknown) {
    const isErr = error instanceof Error;
    logger.error(
      `Karzinkaga qo'shishda xatolik: ${isErr ? error.message : "nomalum"}`,
      {
        metadata: {
          userId: req.user?.id,
          stack: isErr ? error.stack : undefined,
        },
      },
    );
    next(error);
  }
};

// --------------------------------------------------------------update saved

export const updateKarzinaQuantity = async (req: CustomRequest, res: Response, next: NextFunction) => {
    try {
        const { cart_id, new_quantity } = req.body as UpdateKarzinaDto;
        const user_id = req.user.id;

        // 1. Savatdagi elementni topamiz (faqat shu foydalanuvchiga tegishlisini)
        const cartItem = await Karzina.findOne({
            where: { id: cart_id, user_id },
            include: [{ model: Product, as: "product" }]
        });

        if (!cartItem) {
            throw CustomErrorHandler.NotFound("Savatda bunday mahsulot topilmadi");
        }

        // 2. Yangi miqdorni songa o'tkazamiz
        const requestedQty = Number(new_quantity);
        if (requestedQty <= 0) {
            throw CustomErrorHandler.BadRequest("Miqdor 1 dan kam bo'lishi mumkin emas. O'chirish funksiyasidan foydalaning.");
        }

        // 3. Ombor qoldig'ini (Stock) qaytadan tekshiramiz
        const product = cartItem.dataValues.product;
        const variant = product.variants.find((v: any) => v.id == cartItem.variant_id);

        if (!variant) {
            throw CustomErrorHandler.NotFound("Mahsulot varianti topilmadi");
        }

        if (requestedQty > variant.stock) {
            throw CustomErrorHandler.BadRequest(`Omborda yetarli mahsulot yo'q. Maksimal qoldiq: ${variant.stock} ta`);
        }

        // 4. Ma'lumotlarni yangilaymiz
        cartItem.quantity = requestedQty;
        cartItem.total_price = requestedQty * Number(cartItem.price_per_unit);

        await cartItem.save();

        logger.info(`Savat yangilandi: CartID - ${cart_id}, NewQty - ${requestedQty}`);

        res.status(200).json({
            success: true,
            message: "Savat yangilandi",
        });

    } catch (error) {
        next(error);
    }
};

// --------------------------------------------------------------delete saved

export const deleteKarzinaProduct = async (
  req: CustomRequest,
  res: Response,
  next: NextFunction ) => {
  try {
    const { id } = req.body;

    const user = await Auth.findByPk(Number(req.user.id));

    logger.info(`seved so'raldi: ID - ${id}`, {
      metadata: { ip: req.ip, url: req.originalUrl, id: req.user.id },
    });

    // // o'zi qo'shganlarni o'chira olishligi uchun bu kodlar faqat ifni ichi

    if (!user) {
      throw CustomErrorHandler.NotFound("User not found in the database");
    }

    const Seved = await Karzina.findAll({where: {user_id: user.dataValues.id} });

    if (!Seved) {
      throw CustomErrorHandler.NotFound("Seved not found");
    }

    const seved_baza = await Karzina.findByPk(id);

    if (!seved_baza) {
      throw CustomErrorHandler.NotFound("Seved not found in the database");
    }

    for (let j = 0; j < Seved.length; j++) {
      if (`${Seved[j]?.dataValues.id}` === `${id}`) {
        await Karzina.destroy({where: {id}});
        
        logger.info(`Seved o'chirildi: ID - ${req.user.id}`, {
          metadata: { ip: req.ip },
        });

        res.status(200).json({
          message: "Seved deleted",
        });
      }
    }

    res.status(200).json({
      message: "This seved is not yours",
    });
  } catch (error: unknown) {
    const isErr = error instanceof Error;
    logger.error(
      `Sevedni o'chirishda xatolik: ${isErr ? error.message : "nomalum"}`,
      {
        metadata: {
          userId: req.user?.id,
          stack: isErr ? error.stack : undefined,
          params: req.params,
        },
      },
    );
    next(error);
  }
};