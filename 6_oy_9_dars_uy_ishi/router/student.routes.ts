import {Router, type RequestHandler} from "express"
import { addStudents, deleteStudents, getAllStudents, UpdateStudents } from "../controller/student.ctr.js"

const StudentRouter: Router = Router()

StudentRouter.get("/get_all_students", getAllStudents as RequestHandler)
StudentRouter.post("/add_student", addStudents as RequestHandler)
StudentRouter.put("/update_student/:id", UpdateStudents as RequestHandler)
StudentRouter.delete("/delete_student/:id", deleteStudents as RequestHandler)

export default StudentRouter