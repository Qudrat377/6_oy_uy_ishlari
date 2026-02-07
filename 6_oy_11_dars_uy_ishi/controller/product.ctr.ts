import type { NextFunction, Response } from "express";
import type { CustomRequest } from "../middleware/authorization.js";
import logger from "../Utils/logger.js";
import { Product } from "../model/product.model.js";
import fs from "fs";
import path from "path";
import sequelize from "../config/config.js";
import type { CreateProductDto } from "../dto/product.dto.js";
import { CustomErrorHandler } from "../Utils/custom-error-hendler.js";
import { Auth } from "../model/auth.model.js";
import { addProductValidator } from "../validator/product.validator.js";

// sequelize.sync({ alter: true })
// Product.sync({force: true})

// --------------------------------------------------------------getallproduct

export const getAllProducts = async (
    req: CustomRequest,
  res: Response,
  next: NextFunction,
) => {
  try {
    const product = await Product.findAll();

    logger.info(`Productni so'radi: ID - ${req.user.id}`, {
      metadata: { ip: req.ip, url: req.originalUrl, id: req.user.id },
    });

    res.status(200).json(product);
  } catch (error: unknown) {
    const isErr = error instanceof Error;
    logger.error(
      `Productni olishda xatolik: ${isErr ? error.message : "nomalum"}`,
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

// --------------------------------------------------------------getallproduct

export const getOneProduct = async (
    req: CustomRequest,
  res: Response,
  next: NextFunction,
) => {
  try {
    const {id} = req.params
    const productId = Number(id)
    const product = await Product.findByPk(productId);

    logger.info(`Productni so'radi: ID - ${req.user.id}`, {
      metadata: { ip: req.ip, url: req.originalUrl, id: req.user.id },
    });

    if (!product) {
      logger.warn(`Product topilmadi: So'ralgan ID - ${id}`, {
        metadata: { url: req.originalUrl, id: req.user.id },
      });
      throw CustomErrorHandler.NotFound("Product not found");
    }

    res.status(200).json(product);
  } catch (error: unknown) {
    const isErr = error instanceof Error;
    logger.error(
      `Productni olishda xatolik: ${isErr ? error.message : "nomalum"}`,
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

// --------------------------------------------------------------add product

export const addProduct = async (
  req: CustomRequest,
  res: Response,
  next: NextFunction,
) => {
  try {
    const { title, description, category_id, variants } = req.body as CreateProductDto;
    const files = req.files as { [Fieldname: string]: Express.Multer.File[] };

    logger.info(`Product qo'shmoqda: ID - ${req.user.id}`, {
        metadata: { ip: req.ip, url: req.originalUrl, id: req.user.id },
    });

    const main_image = files["main_image"]?.[0]?.filename;

    let parsedVariants = typeof variants === "string" ? JSON.parse(variants) : variants;

    const allVariantImages = files["variant_images"] || [];

    let imageCounter = 0;
    
    // --- MANA SHU YERDA O'ZGARISH QILAMIZ ---
    const finalVariants = parsedVariants.map((variant: any, index: number) => {
      const count = variant.imageCount || 0;

      const variantPics = allVariantImages
        .slice(imageCounter, imageCounter + count)
        .map((file) => file.filename);

      imageCounter += count;

      return {
        ...variant,
        id: Date.now() + index, // <--- HAR BIR VARIANTGA NOYOB ID BERILDI
        image: variantPics,
      };
    });
    // --- O'ZGARISH TUGADI ---

    const newProduct = await Product.create({
      title,
      description,
      category_id,
      main_image,
      variants: finalVariants,
      created_by: req.user.id,
      updated_by: req.user.id,
    });

    logger.info(`Product qo'shildi: ID - ${req.user.id}`, {
        metadata: { ip: req.ip, url: req.originalUrl, id: req.user.id },
    });

    res.status(200).json({
        message: "Added product",
        // data: newProduct // Ma'lumotni ko'rish uchun datani ham qaytardim
    });
  } catch (error: unknown) {
    const isErr = error instanceof Error;
    logger.error(
      `Productni qo'shishda xatolik: ${isErr ? error.message : "nomalum"}`,
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

// --------------------------------------------------------------update product

export const updateProduct = async (req: any, res: Response) => {
    try {
        const { id } = req.params;
        const { variantId, actionType, variants, imageIndex, title, description, category_id } = req.body;
        const files = req.files as { [fieldname: string]: Express.Multer.File[] };

        const product = await Product.findByPk(id);

        if (!product) {

            logger.warn(`Product topilmadi: So'ralgan ID - ${id}`, {
                metadata: { url: req.originalUrl, id: req.user.id },
            });
            throw CustomErrorHandler.NotFound("Mahsulot topilmadi");
        }

        // 1. ASOSIY MA'LUMOTLARNI YANGILASH (Title, Description, etc.)
        if (title) product.title = title;
        if (description) product.description = description;
        if (category_id) product.category_id = category_id;

        let currentVariants = [...product.variants] as any[];
        const newFiles = files['variant_images'] || [];

        // --- MANTIQ 1: YANGI VARIANT QO'SHISH (APPEND) ---
        if (actionType === "APPEND" && variants) {

            const incoming = typeof variants === 'string' ? JSON.parse(variants) : variants;
            const processed = incoming.map((v: any, index: number) => {
                const count = v.imageCount || 0;
                const pics = newFiles.slice(0, count).map(f => f.filename);
                return { ...v, id: Date.now() + index, image: pics };
            });
            currentVariants = [...currentVariants, ...processed];

            logger.info(`Productga yangi variant qo'shildi: ID - ${req.user.id}`, {
                metadata: { ip: req.ip, url: req.originalUrl, id: req.user.id },
            });
        }

        // --- MANTIQ 2: VARIANTNI O'ZINI TAHRIRLASH (Narxi, Rangi, Stoki) ---
        else if (actionType === "UPDATE_VARIANT" && variantId) {
            const vIndex = currentVariants.findIndex(v => v.id == variantId);
            if (vIndex !== -1) {
                const incoming = typeof variants === 'string' ? JSON.parse(variants)[0] : variants[0];
                // Rasmlarni tegmasdan, faqat kelgan text ma'lumotlarni eski variant ustiga yozamiz
                currentVariants[vIndex] = { ...currentVariants[vIndex], ...incoming };

                logger.info(`Productni variant yangilandi: ID - ${req.user.id}`, {
                    metadata: { ip: req.ip, url: req.originalUrl, id: req.user.id },
                });
            }
        }

        // --- MANTIQ 3: RASMNI ALMASHTIRISH (REPLACE_IMAGE) ---
        else if (actionType === "REPLACE_IMAGE" && variantId) {
            const vIndex = currentVariants.findIndex(v => v.id == variantId);
            if (vIndex !== -1 && currentVariants[vIndex]) {
                const targetVariant = currentVariants[vIndex];
                const idx = parseInt(imageIndex);

                if (targetVariant.image && targetVariant.image[idx] !== undefined) {
                    const oldImageName = targetVariant.image[idx];
                    const oldPath = path.join(process.cwd(), "upload/images", oldImageName);
                    if (fs.existsSync(oldPath)) fs.unlinkSync(oldPath);

                    logger.info(`Productni variantini rasmi yangilandi: ID - ${req.user.id}`, {
                        metadata: { ip: req.ip, url: req.originalUrl, id: req.user.id },
                    });

                    if (newFiles.length > 0 && newFiles[0]) {
                        targetVariant.image[idx] = newFiles[0].filename;
                    }
                }
            }
        }

        logger.info(`Product tahrirlandi: ID - ${req.user.id}`, {
           metadata: { ip: req.ip, url: req.originalUrl, id: req.user.id },
        });

        product.variants = currentVariants;
        product.changed('variants', true); 
        await product.save();

        res.status(200).json({ message: "Muvaffaqiyatli yangilandi", data: product });
    } catch (error: any) {
        res.status(500).json({ error: error.message });
    }
};

// --------------------------------------------------------------delete product

export const deleteProduct = async (req: CustomRequest, res: Response, next: NextFunction) => {
    try {
        const { id } = req.params;
        const productId = Number(id)

        const product = await Product.findByPk(productId);
        if (!product) return res.status(404).json({ message: "Mahsulot topilmadi" });

        // 1. Asosiy rasmni (main_image) o'chirish
        if (product.main_image) {
            const mainPath = path.join(process.cwd(), "upload/images", product.main_image);
            if (fs.existsSync(mainPath)) fs.unlinkSync(mainPath);
        }

        // 2. Barcha variantlardagi rasmlarni o'chirish
        if (product.variants && Array.isArray(product.variants)) {
            product.variants.forEach((variant: any) => {
                if (variant.image && Array.isArray(variant.image)) {
                    variant.image.forEach((imgName: string) => {
                        const imgPath = path.join(process.cwd(), "upload/images", imgName);
                        if (fs.existsSync(imgPath)) fs.unlinkSync(imgPath);
                    });
                }
            });
        }

        logger.info(`Productni o'chirdi: ID - ${req.user.id} product name: ${product?.dataValues.title}`, {
           metadata: { ip: req.ip, url: req.originalUrl, id: req.user.id },
        });

        await product.destroy();

        res.status(200).json({ message: "Mahsulot va unga tegishli barcha rasmlar o'chirildi" });
    } catch (error) {
        next(error);
    }
};

// --------------------------------------------------------------delete product

export const deleteProductVariant = async (req: CustomRequest, res: Response, next: NextFunction) => {
    try {
        const { id } = req.params; // Product ID
        const { variantId } = req.body; // Variant ID

        // 1. Kirish ma'lumotlarini tekshirish
        if (!id || !variantId) {
            return res.status(400).json({ message: "Mahsulot ID yoki Variant ID yuborilmadi" });
        }

        const productId = Number(id)

        // 2. Mahsulotni bazadan qidirish
        const product = await Product.findByPk(productId);
        if (!product) {
            return res.status(404).json({ message: "Mahsulot topilmadi" });
        }

        // 3. Variantlar massivini olish
        let currentVariants = product.variants ? [...product.variants] : [];

        // 4. Oxirgi variantni o'chirib yubormaslik (Biznes qoidasi)
        if (currentVariants.length <= 1) {
            return res.status(400).json({ 
                message: "Mahsulotda kamida bitta variant qolishi shart. Oxirgi variantni o'chira olmaysiz!" 
            });
        }

        // 5. Variantni index bo'yicha topish
        const vIndex = currentVariants.findIndex((v: any) => v.id == variantId);
        const praductVariantName = currentVariants.filter((v) => v.id === variantId)
        if (vIndex === -1) {
            return res.status(404).json({ message: "Bunday variant topilmadi" });
        }

        const targetVariant = currentVariants[vIndex];

        // 6. Rasmlarni serverdan xavfsiz o'chirish
        if (targetVariant?.image && Array.isArray(targetVariant.image)) {
            targetVariant.image.forEach((imgName: string) => {
                const imgPath = path.join(process.cwd(), "upload/images", imgName);
                
                // Rasm o'chirishda xato bo'lsa, log qilamiz lekin funksiyani to'xtatmaymiz
                try {
                    if (fs.existsSync(imgPath)) {
                        fs.unlinkSync(imgPath);
                    }
                } catch (err) {
                    console.error(`Rasmni o'chirishda xatolik (${imgName}):`, err);
                }
            });
        }

        // 7. Variantni massivdan olib tashlash
        currentVariants.splice(vIndex, 1);
        
        logger.info(`Productni variantini o'chirdi: ID - ${req.user.id}`, {
           metadata: { ip: req.ip, url: req.originalUrl, id: req.user.id },
        });
        // 8. Bazaga yangilangan massivni saqlash
        product.variants = currentVariants;
        product.changed('variants', true); // Sequelize-ga JSONB o'zgarganini qat'iy bildirish
        await product.save();

        // 9. Muvaffaqiyatli natija
        return res.status(200).json({ 
            message: "Variant va uning rasmlari muvaffaqiyatli o'chirildi",
            deletedVariantId: variantId
        });

    } catch (error) {
        // Kutilmagan server xatolari uchun
        next(error);
    }
};