import { Student } from "../model/student.model.js";
export const getAllStudents = async (req, res, next) => {
    try {
        const students = await Student.findAll();
        res.status(200).json(students);
    }
    catch (error) {
        res.status(500).json({
            message: error.message
        });
    }
};
export const addStudents = async (req, res, next) => {
    try {
        const { full_name, phone_nomber, profession, parent_name, parent_nomber, image_url } = req.body;
        await Student.create({ full_name, phone_nomber, profession, parent_name, parent_nomber, image_url });
        res.status(201).json({
            message: "Added student"
        });
    }
    catch (error) {
        res.status(500).json({
            message: error.message
        });
    }
};
export const UpdateStudents = async (req, res, next) => {
    try {
        const { id } = req.params;
        const { full_name, phone_nomber, profession, parent_name, parent_nomber, image_url } = req.body;
        const newId = Number(id);
        const foundedStudent = await Student.findByPk(newId);
        if (!foundedStudent) {
            return res.status(404).json({
                message: "Student not found"
            });
        }
        await Student.update({ full_name, phone_nomber, profession, parent_name, parent_nomber, image_url }, {
            where: { id: newId }
        });
        res.status(200).json({
            message: "Updated student"
        });
    }
    catch (error) {
        res.status(500).json({
            message: error.message
        });
    }
};
export const deleteStudents = async (req, res, next) => {
    try {
        const { id } = req.params;
        const newId = Number(id);
        const foundedStudent = await Student.findByPk(newId);
        if (!foundedStudent) {
            return res.status(404).json({
                message: "Student not found"
            });
        }
        await Student.destroy({ where: { id: newId } });
        res.status(200).json({
            message: "Deleted student"
        });
    }
    catch (error) {
        res.status(500).json({
            message: error.message
        });
    }
};
//# sourceMappingURL=student.ctr.js.map