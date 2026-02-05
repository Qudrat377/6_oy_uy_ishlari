import type { NextFunction, Request, Response } from "express";
import { Student } from "../model/student.model.js";
import type { CreateStudentDto, UpdateStudentDto } from "../dto/student.dto.js";
import { Op } from "sequelize";
import sequelize from "../config/config.js";

Student.sync({force: false})

export const getAllStudents = async (
  req: Request,
  res: Response,
  next: NextFunction,
) /*:Promise<Response | void>*/ => {
  try {
    const page = parseInt(req.query.page as string) || 1
    const limit = parseInt(req.query.limit as string) || 10

    const offset = (page -1) * limit

    const search = (req.query.search as string)?.trim() || ""

    let whereClause = {}

    if (search) {
        whereClause = {
            [Op.or]: [
                {full_name: {[Op.iLike]: `%${search}%`}},
                {phone_nomber: {[Op.iLike]: `%${search}%`}},
                {profession: {[Op.iLike]: `%${search}%`}},
                {parent_name: {[Op.iLike]: `%${search}%`}}
            ]
        }
    }

    const {count, rows: students} = await Student.findAndCountAll({
        where: whereClause,
        offset,
        limit,
        raw: true
    })

    const totalPage = Math.ceil(count / limit)

    res.status(200).json({
        totalPage,
        prev: page > 1 ? {page: page - 1, limit} : undefined,
        next: totalPage > page ? {page: page + 1, limit} : undefined,
        students
    });
  } catch (error: any) {
    res.status(500).json({
      message: error.message,
    });
  }
};

export const statistics = async (
  req: Request,
  res: Response,
  next: NextFunction) => {
  try {
    const stat = await Student.findAll({
        attributes: [
            [sequelize.literal(`DATE_TRUNC('month', "joinedAt")`), "month"],
            [sequelize.fn("COUNT", sequelize.col("id")), "totalJoined",],
            [sequelize.literal(`SUM(case when "leftAt" is not null then 1 else 0 end)`), "totalLeft"],
        ],
        group: [
            sequelize.literal(`DATE_TRUNC('month', "joinedAt")`)
        ] as any,
        order: [
        [sequelize.literal(`DATE_TRUNC('month', "joinedAt")`), "ASC"] as any,
    ],
        raw: true
    })
    res.status(200).json(stat)
  } catch (error: any) {
    res.status(500).json({
      message: error.message,
    });
  }
};


export const addStudent = async (
  req: Request,
  res: Response,
  next: NextFunction,
) /*:Promise<Response | void>*/ => {
  try {
    const {
      full_name,
      phone_nomber,
      profession,
      parent_name,
      parent_nomber,
      image_url,
    } = req.body as CreateStudentDto;

    await Student.create({
      full_name,
      phone_nomber,
      profession,
      parent_name,
      parent_nomber,
      image_url,
      joinedAt: new Date()
    });

    res.status(201).json({
      message: "Added student",
    });
  } catch (error: any) {
    res.status(500).json({
      message: error.message,
    });
  }
};

export const leftStudent = async (
  req: Request,
  res: Response,
  next: NextFunction,
) /*:Promise<Response | void>*/ => {
  try {
    const { id } = req.params;
  
    const newId = Number(id as string);
    const foundedStudent = await Student.findByPk(newId);

    if (!foundedStudent) {
      return res.status(404).json({
        message: "Student not found",
      });
    }

    await Student.update(
      {
        leftAt: new Date()
      },
      { where: { id: newId } },
    );

    res.status(200).json({
      message: "Left student",
    });
  } catch (error: any) {
    res.status(500).json({
      message: error.message,
    });
  }
};

export const UpdateStudent = async (
  req: Request,
  res: Response,
  next: NextFunction,
) /*:Promise<Response | void>*/ => {
  try {
    const { id } = req.params;
    const {
      full_name,
      phone_nomber,
      profession,
      parent_name,
      parent_nomber,
      image_url,
      leftAt,
      joinedAt
    } = req.body as UpdateStudentDto;

    const newId = Number(id as string);
    const foundedStudent = await Student.findByPk(newId);

    if (!foundedStudent) {
      return res.status(404).json({
        message: "Student not found",
      });
    }

    await Student.update(
      {
        full_name,
        phone_nomber,
        profession,
        parent_name,
        parent_nomber,
        image_url,
        leftAt,
        joinedAt
      },
      {
        where: { id: newId },
      },
    );

    res.status(200).json({
      message: "Updated student",
    });
  } catch (error: any) {
    res.status(500).json({
      message: error.message,
    });
  }
};

export const deleteStudent = async (
  req: Request,
  res: Response,
  next: NextFunction,
) /*:Promise<Response | void>*/ => {
  try {
    const { id } = req.params;

    const newId = Number(id as string);
    const foundedStudent = await Student.findByPk(newId);

    if (!foundedStudent) {
      return res.status(404).json({
        message: "Student not found",
      });
    }

    await Student.destroy({ where: { id: newId } });

    res.status(200).json({
      message: "Deleted student",
    });
  } catch (error: any) {
    res.status(500).json({
      message: error.message,
    });
  }
};
