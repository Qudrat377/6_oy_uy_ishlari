import type { NextFunction, Request, Response } from "express"
import { Student } from "../model/student.model.js"
import type { CreateStudentDto, UpdateStudentDto } from "../dto/student.dto.js"

export const getAllStudents = async (req: Request, res: Response, next: NextFunction)/*:Promise<Response | void>*/ => {
    try {
        const students = await Student.findAll()
        res.status(200).json(students)
    } catch (error: any) {
        res.status(500).json({
            message: error.message
        })
    }
}

export const addStudents = async (req: Request, res: Response, next: NextFunction)/*:Promise<Response | void>*/ => {
    try {
        const {full_name, phone_nomber, profession, parent_name, parent_nomber, image_url} = req.body as CreateStudentDto

        await Student.create({full_name, phone_nomber, profession, parent_name, parent_nomber, image_url})

        res.status(201).json({
            message: "Added student"
        })
    } catch (error: any) {
        res.status(500).json({
            message: error.message
        })
    }
}

export const UpdateStudents = async (req: Request, res: Response, next: NextFunction)/*:Promise<Response | void>*/ => {
    try {
        const {id} = req.params 
        const {full_name, phone_nomber, profession, parent_name, parent_nomber, image_url} = req.body as UpdateStudentDto

        const newId = Number(id as string)
        const foundedStudent = await Student.findByPk(newId)

        if (!foundedStudent) {
            return res.status(404).json({
                message: "Student not found"
            })
        }

        await Student.update({full_name, phone_nomber, profession, parent_name, parent_nomber, image_url}, {
            where: {id: newId}
        })

        res.status(200).json({
            message: "Updated student"
        })
    } catch (error: any) {
        res.status(500).json({
            message: error.message
        })
    }
}

export const deleteStudents = async (req: Request, res: Response, next: NextFunction)/*:Promise<Response | void>*/ => {
    try {
        const {id} = req.params 

        const newId = Number(id as string)
        const foundedStudent = await Student.findByPk(newId)

        if (!foundedStudent) {
            return res.status(404).json({
                message: "Student not found"
            })
        }

        await Student.destroy({where: {id: newId}})

        res.status(200).json({
            message: "Deleted student"
        })
    } catch (error: any) {
        res.status(500).json({
            message: error.message
        })
    }
}
