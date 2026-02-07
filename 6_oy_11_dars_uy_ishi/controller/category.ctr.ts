import type { NextFunction, Response } from "express";
import type { CustomRequest } from "../middleware/authorization.js";
import { Category } from "../model/cotegory.model.js";
import logger from "../Utils/logger.js";
import type { CreateCategoryDto, UpdateCategoryDto } from "../dto/category.js";
import { CustomErrorHandler } from "../Utils/custom-error-hendler.js";
import { Auth } from "../model/auth.model.js";
import sequelize from "../config/config.js";
import { fileURLToPath } from "url";
import path from "path";
import fs from "fs"

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// sequelize.sync({ alter: true })

// --------------------------------------------------------------getallcotegory

export const getAllCategorys = async (req: CustomRequest, res: Response, 
  next: NextFunction) => {

  try {
        const category = await Category.findAll();

        logger.info(`Kategoriya so'radi: ID - ${req.user.id}`, {
            metadata: { ip: req.ip, url: req.originalUrl, id: req.user.id },
        });

        res.status(200).json(category);
  } catch (error: unknown) {
    const isErr = error instanceof Error
    logger.error(`Kategoriya olishda xatolik: ${isErr ? error.message : "nomalum"}`, {
          metadata: {
            userId: req.user?.id,
            stack: isErr ? error.stack : undefined,
            params: req.params,
          },
        })
    next(error); 
  }
};

// --------------------------------------------------------------delete category

export const getOneCategory = async (req: CustomRequest, res: Response, 
  next: NextFunction) => {

  try {
    const {id} = req.params
    const categoryId = Number(id)
    const category = await Category.findByPk(categoryId);

    logger.info(`Kategoriyani so'radi: ID - ${req.user.id}`, {
        metadata: { ip: req.ip, url: req.originalUrl, id: req.user.id },
    });

    if (!category) {
      logger.warn(`Kategoriya topilmadi: So'ralgan ID - ${id}`, {
        metadata: { url: req.originalUrl, id: req.user.id },
      });
      throw CustomErrorHandler.NotFound("Cotegory not found");
    }

    logger.info(`Kategoriya o'chirildi: ID - ${req.user.id}`, {
      metadata: { ip: req.ip },
    });

    res.status(200).json(category);
  } catch (error: unknown) {
    const isErr = error instanceof Error
    logger.error(`Kategoriyani o'chirishda xatolik: ${isErr ? error.message : "nomalum"}`, {
          metadata: {
            userId: req.user?.id,
            stack: isErr ? error.stack : undefined,
            params: req.params,
          },
        })
    next(error); 
  }
};

// --------------------------------------------------------------add category

export const addCategory = async (req: CustomRequest, res: Response, 
  next: NextFunction) => {

try {
    const {category_name} = req.body as CreateCategoryDto

    const imageName = req.file?.filename;
    
    if (!imageName) {
      logger.warn(`Rasm topilmadi bu categoryga qo'shish uchun - ${category_name}`, {
        metadata: {
          ip: req.ip,
          host: req.host,
          url: req.originalUrl,
        },
      })
      throw CustomErrorHandler.UnAuthorized("Image not found");
    }

    await Category.create({
      category_name, 
      img_url: imageName,
      created_by: req.user?.id,
      updated_by: req.user?.id,
    })
    
    logger.info(
      `Yangi kategoriya qo'shildi: Name - ${category_name}, Oner ID - ${req.user.id}`
    );

    res.status(201).json({
      message: "Added new Cotegory",
    });
} catch (error: unknown) {
    const isErr = error instanceof Error
    logger.error(`Kategoriya qo'shishda xatplik: ${isErr ? error.message : "nomalum"}`, {
          metadata: {
            userId: req.user?.id,
            stack: isErr ? error.stack : undefined,
            params: req.params,
          },
        })
    next(error); 
  }
};

// --------------------------------------------------------------update category

export const updateCategory = async (req: CustomRequest, res: Response, 
  next: NextFunction) => {

  try {
    const {id} = req.params
    const {category_name} = req.body as UpdateCategoryDto
    const categoryId = Number(id)
    const category = await Category.findByPk(categoryId);
    const imageName = req.file?.filename;

    logger.info(`Kategoriyani so'radi: ID - ${req.user.id}`, {
        metadata: { ip: req.ip, url: req.originalUrl, id: req.user.id },
    });

    if (!category) {
      logger.warn(`Kategoriya topilmadi: So'ralgan ID - ${id}`, {
        metadata: { url: req.originalUrl, id: req.user.id },
      });
      throw CustomErrorHandler.NotFound("Cotegory not found");
    }

    if (imageName) {
    const oldImagePath = path.join(process.cwd(), "upload/images", category?.dataValues.img_url);

      // Fayl haqiqatdan ham mavjudligini tekshirib, keyin o'chiramiz
      if (fs.existsSync(oldImagePath)) {
          fs.unlinkSync(oldImagePath); // Eski faylni o'chirish

          logger.info(`Eski rasm o'chirildi: ${category?.dataValues.img_url}`);
      }
    }

    const access_id = req.user.id;
    const user = await Auth.findByPk(access_id)

    if (!user?.dataValues.id) {
      logger.warn(`Foydalanuvchi topilmadi: So'ralgan ID - ${id}`, {
        metadata: { url: req.originalUrl, id: req.user.id },
      });
      throw CustomErrorHandler.NotFound("user not found");
    }

    await Category.update({
      category_name,
      img_url: imageName ? imageName : category.dataValues.img_url,
      updated_by: req.user?.id,
    },{where: {id: categoryId}})

    logger.info(`Kategoriya qayta yangilandi: ID - ${id}`, {
      metadata: { ip: req.ip, url: req.originalUrl, id: req.user.id },
    });

    res.status(201).json({
      message: "Cotegory updated",
    });
  } catch (error: unknown) {
    const isErr = error instanceof Error
    logger.error(`Kategoriyani tahlillashda xatolik: ${isErr ? error.message : "nomalum"}`, {
          metadata: {
            userId: req.user?.id,
            stack: isErr ? error.stack : undefined,
            params: req.params,
          },
        })
    next(error); 
  }
};

// --------------------------------------------------------------delete category

export const deleteCategory = async (req: CustomRequest, res: Response, 
  next: NextFunction) => {

  try {
    const {id} = req.params
    const categoryId = Number(id)
    const category = await Category.findByPk(categoryId);

    logger.info(`Kategoriyani so'radi: ID - ${req.user.id}`, {
        metadata: { ip: req.ip, url: req.originalUrl, id: req.user.id },
    });

    if (!category) {
      logger.warn(`Kategoriya topilmadi: So'ralgan ID - ${id}`, {
        metadata: { url: req.originalUrl, id: req.user.id },
      });
      throw CustomErrorHandler.NotFound("Cotegory not found");
    }

    const access_id = req.user.id;
    const user = await Auth.findByPk(access_id)

    if (!user?.dataValues.id) {
      logger.warn(`Foydalanuvchi topilmadi: So'ralgan ID - ${id}`, {
        metadata: { url: req.originalUrl, id: req.user.id },
      });
      throw CustomErrorHandler.NotFound("user not found");
    }

    const oldImagePath = path.join(process.cwd(), "upload/images", category?.dataValues.img_url);

      // Fayl haqiqatdan ham mavjudligini tekshirib, keyin o'chiramiz
    if (fs.existsSync(oldImagePath)) {
      fs.unlinkSync(oldImagePath); // Eski faylni o'chirish

      logger.info(`Eski rasm o'chirildi: ${category?.dataValues.img_url}`);
    }

    await Category.destroy({where: {id: categoryId}})

    logger.info(`Kategoriya o'chirildi: ID - ${req.user.id}`, {
      metadata: { ip: req.ip },
    });

    res.status(200).json({
      message: "Cotegory deleted",
    });
  } catch (error: unknown) {
    const isErr = error instanceof Error
    logger.error(`Kategoriyani o'chirishda xatolik: ${isErr ? error.message : "nomalum"}`, {
          metadata: {
            userId: req.user?.id,
            stack: isErr ? error.stack : undefined,
            params: req.params,
          },
        })
    next(error); 
  }
};