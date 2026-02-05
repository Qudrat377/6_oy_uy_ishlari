import {Router, type RequestHandler} from "express"
import { addStudent, deleteStudent, getAllStudents, leftStudent, statistics, UpdateStudent } from "../controller/student.ctr.js"

const StudentRouter: Router = Router()

StudentRouter.get("/get_all_students", getAllStudents as RequestHandler)
StudentRouter.post("/add_student", addStudent as RequestHandler)
StudentRouter.put("/update_student/:id", UpdateStudent as RequestHandler)
StudentRouter.put("/left_student/:id", leftStudent as RequestHandler)
StudentRouter.get("/statistics", statistics as RequestHandler)
StudentRouter.delete("/delete_student/:id", deleteStudent as RequestHandler)

export default StudentRouter