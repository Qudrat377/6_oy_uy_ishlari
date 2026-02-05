import { Router } from "express";
import { addStudent, deleteStudent, getAllStudents, leftStudent, statistics, UpdateStudent } from "../controller/student.ctr.js";
const StudentRouter = Router();
StudentRouter.get("/get_all_students", getAllStudents);
StudentRouter.post("/add_student", addStudent);
StudentRouter.put("/update_student/:id", UpdateStudent);
StudentRouter.put("/left_student/:id", leftStudent);
StudentRouter.get("/statistics", statistics);
StudentRouter.delete("/delete_student/:id", deleteStudent);
export default StudentRouter;
//# sourceMappingURL=student.routes.js.map