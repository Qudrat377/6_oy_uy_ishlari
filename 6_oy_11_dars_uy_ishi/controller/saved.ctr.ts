import type { NextFunction, Response } from "express";
import { Saved } from "../model/seved.model.js";
import logger from "../Utils/logger.js";
import type { CustomRequest } from "../middleware/authorization.js";
import { Auth } from "../model/auth.model.js";
import { CustomErrorHandler } from "../Utils/custom-error-hendler.js";
import { Product } from "../model/product.model.js";

// Saved.sync({force: false})

// --------------------------------------------------------------get all saved

export const getAllSaveds = async (
  req: CustomRequest,
  res: Response,
  next: NextFunction,
) => {
  try {
    const access_id = req.user.id;

    // 1. Foydalanuvchi borligini tekshiramiz
    const user = await Auth.findByPk(access_id);
    if (!user) {
      throw CustomErrorHandler.NotFound("User not found");
    }

    // 2. Saved jadvalidan owner_id bo'yicha qidiramiz 
    // VA Product jadvalini "ulab" (Join qilib) olamiz
    const savedItems = await Saved.findAll({
      where: { owner_id: access_id },
      include: [
        {
          model: Product,
          as: "product", // Modelda bergan as nomingiz bilan bir xil bo'lishi kerak
        }
      ]
    });

    // 3. To'g'ridan-to'g'ri tayyor massivni qaytaramiz
    res.status(200).json({
      success: true,
      data: savedItems
    });
  } catch (error: unknown) {
    const isErr = error instanceof Error;
    logger.error(
      `Sevedni olishda xatolik: ${isErr ? error.message : "nomalum"}`,
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

// --------------------------------------------------------------add saved

export const addSaved = async (
  req: CustomRequest,
  res: Response,
  next: NextFunction) => {
  try {
    const { id } = req.body;

    const access_id = Number(req.user.id);
    const user = await Auth.findByPk(access_id);

    if (!user?.dataValues.id) {
      throw CustomErrorHandler.NotFound("user not found");
    }

    const product = await Product.findByPk(Number(id));

    if (!product) {
      throw CustomErrorHandler.NotFound("Bu product topilmadi");
    }
    console.log({
      owner_id: user.dataValues.id,
      product_id: product.dataValues.id,
      xatolik: "bular logdan keldi"
    });
    

    await Saved.create({
      owner_id: user.dataValues.id,
      product_id: product.dataValues.id,
    });

    logger.info(`Seved qo'shildi: ID - ${id}`, {
      metadata: { ip: req.ip, url: req.originalUrl, id: req.user.id },
    });

    res.status(201).json({
      message: "Seved new Madel",
    });
  } catch (error: unknown) {
    const isErr = error instanceof Error;
    logger.error(
      `Sevedga qo'shishda xatolik: ${isErr ? error.message : "nomalum"}`,
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

// --------------------------------------------------------------get all saved

export const deleteSaved = async (
  req: CustomRequest,
  res: Response,
  next: NextFunction ) => {
  try {
    const { id } = req.body;

    const user = await Auth.findByPk(Number(req.user.id));

    // logger.info(`seved so'raldi: ID - ${id}`, {
    //   metadata: { ip: req.ip, url: req.originalUrl, id: req.user.id },
    // });

    // // o'zi qo'shganlarni o'chira olishligi uchun bu kodlar faqat ifni ichi

    if (!user) {
      throw CustomErrorHandler.NotFound("User not found in the database");
    }

    const Seved = await Saved.findAll({where: {owner_id: user.dataValues.id} });

    if (!Seved) {
      throw CustomErrorHandler.NotFound("Seved not found");
    }

    const seved_baza = await Saved.findByPk(id);

    if (!seved_baza) {
      throw CustomErrorHandler.NotFound("Seved not found in the database");
    }

    for (let j = 0; j < Seved.length; j++) {
      if (`${Seved[j]?.dataValues.id}` === `${id}`) {
        await Saved.destroy({where: {id}});
        
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