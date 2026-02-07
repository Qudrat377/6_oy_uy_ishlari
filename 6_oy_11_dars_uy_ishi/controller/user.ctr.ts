import type { NextFunction, Response } from "express";
import type { CustomRequest } from "../middleware/authorization.js";
import logger from "../Utils/logger.js";
import jwt from "jsonwebtoken"
import { Auth } from "../model/auth.model.js";
import { CustomErrorHandler } from "../Utils/custom-error-hendler.js";
import bcrypt from "bcrypt"

interface MyToken {
    id: number;
    username: string;
    role: string;
    email: string;
}

// --------------------------------------------------------------me

export const Me = async (req: CustomRequest, res: Response, next: NextFunction) => {
    const token = req.cookies.access_token

  if (!token) {
    return res.status(401).json({
      message: "Login qilinmagan"
    })
  }
  try {
        const decode = jwt.verify(token, String(process.env.SECRET)) as MyToken

    res.json({
      id: decode.id,
      username: decode.username,
      role: decode.role,
      email: decode.email
    })
  } catch (error: unknown) {
    const isErr = error instanceof Error
    logger.error(`Tokenni yechib olishda xatolik: ${isErr ? error.message : "nomalum"}`, {
          metadata: {
            userId: req.user?.id,
            stack: isErr ? error.stack : undefined,
            params: req.params,
          },
        })
    next(error); 
  }
};

// --------------------------------------------------------------getUser

export const getAllUsers = async (req: CustomRequest, res: Response, next: NextFunction) => {
    try {
        const user = await Auth.findAll()

        logger.info(`Userlar so'radi: ID - ${req.user.id}`, {
          metadata: { ip: req.ip, url: req.originalUrl, id: req.user.id },
        });

    res.status(200).json(user);  
  } catch (error: unknown) {
    const isErr = error instanceof Error
    logger.error(`Tokenni yechib olishda xatolik: ${isErr ? error.message : "nomalum"}`, {
          metadata: {
            userId: req.user?.id,
            stack: isErr ? error.stack : undefined,
            params: req.params,
          },
        })
    next(error); 
  }
};

// --------------------------------------------------------------get one user

export const getOneUser = async (req: CustomRequest, res: Response, next: NextFunction) => {
    try {
       const { id } = req.params;
    const user = await Auth.findByPk(Number(id))

        logger.info(`User so'radi: ID - ${id}`, {
          metadata: { ip: req.ip, url: req.originalUrl, id: req.user.id },
        });

    if (!user) {
            logger.warn(`User topilmadi: So'ralgan ID - ${id}`, {
              metadata: { url: req.originalUrl, id: req.user.id },
            });
      throw CustomErrorHandler.NotFound("User not found");
    }

    // const foundedBook = await BookSchema.find({ book_id: id });

        logger.info(`So'ralgan user: ID - ${id}`, {
          metadata: { ip: req.ip, url: req.originalUrl, id: req.user.id },
        });

    res.status(200).json(user); 
  } catch (error: unknown) {
    const isErr = error instanceof Error
    logger.error(`Tokenni yechib olishda xatolik: ${isErr ? error.message : "nomalum"}`, {
          metadata: {
            userId: req.user?.id,
            stack: isErr ? error.stack : undefined,
            params: req.params,
          },
        })
    next(error); 
  }
};

// --------------------------------------------------------------changePassword

export const changePassword = async (req: CustomRequest, res: Response, next: NextFunction) => {
    try {
       const { email, current_password, new_password, confirm_password } = req.body;

    if (new_password !== confirm_password) {
      throw CustomErrorHandler.BadRequest("new_password and confirm_password must be same")
    }

        if (new_password === current_password) {
      throw CustomErrorHandler.BadRequest("new_password and current_password must be different")
    }

    const foundedUser = await Auth.findOne({ where: { email } });  

        logger.info(`Kalit o'zgartirish so'raldi: Email - ${email}`, {
          metadata: { ip: req.ip, url: req.originalUrl, id: req.user.id },
        });

    if (!foundedUser) {
      logger.warn(`Email topilmadi: So'ralgan Email - ${email}`, {
        metadata: { url: req.originalUrl, id: req.user.id },
      });
      throw CustomErrorHandler.UnAuthorized("User not found");
    }

    const compare = await bcrypt.compare(current_password, foundedUser.password)

    if (compare) {
      if (req.user.email !== foundedUser.email) {
              logger.warn(`Bu sizning email emas: So'ralgan ID - ${email}`, {
                metadata: { url: req.originalUrl, id: req.user.id },
              });
        throw CustomErrorHandler.Forbidden("you have not access for this action")
      }      
      const hashPassword = await bcrypt.hash(new_password, 12)

      await Auth.update({
        password: hashPassword
      }, {where: {id: foundedUser.dataValues.id}})

    logger.info(`Kalit qayta yangilandi: ID - ${email}`, {
      metadata: { ip: req.ip, url: req.originalUrl, id: req.user.id },
    });

      return res.status(200).json({
        message: "Success"
      })
    } else {
      throw CustomErrorHandler.UnAuthorized("Wrong password")
    } 
  } catch (error: unknown) {
    const isErr = error instanceof Error
    logger.error(`Tokenni yechib olishda xatolik: ${isErr ? error.message : "nomalum"}`, {
          metadata: {
            userId: req.user?.id,
            stack: isErr ? error.stack : undefined,
            params: req.params,
          },
        })
    next(error); 
  }
};