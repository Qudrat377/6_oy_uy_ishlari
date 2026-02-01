import { Router } from "express";
import { addStudents, deleteStudents, getAllStudents, UpdateStudents } from "../controller/student.ctr.js";
const StudentRouter = Router();
StudentRouter.get("/get_all_students", getAllStudents);
StudentRouter.post("/add_student", addStudents);
StudentRouter.put("/update_student/:id", UpdateStudents);
StudentRouter.delete("/delete_student/:id", deleteStudents);
export default StudentRouter;
//# sourceMappingURL=student.routes.js.map