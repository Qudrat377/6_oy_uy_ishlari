import {Router, type RequestHandler} from "express"
import { addCategory, deleteCategory, getAllCategorys, getOneCategory, updateCategory } from "../controller/category.ctr.js"
import { authorization } from "../middleware/authorization.js"
import { upload } from "../Utils/multer.js"
import { roleChekt } from "../middleware/role-check.js"
import { validate } from "../middleware/auth-validation.middleware.js"
import { addCategoryValidator, updateCategoryValidator } from "../validator/category.validator.js"

const categoryRouter = Router()

categoryRouter.get("/get_all_categorys",  authorization, getAllCategorys as RequestHandler)
categoryRouter.get("/get_one_category/:id", authorization, getOneCategory as RequestHandler)
categoryRouter.post("/add_category", validate(addCategoryValidator), roleChekt, upload.single("file"), addCategory as RequestHandler)
categoryRouter.put("/update_category/:id", validate(updateCategoryValidator), roleChekt, upload.single("file"), updateCategory as RequestHandler)
categoryRouter.delete("/delete_category/:id", roleChekt, deleteCategory as RequestHandler)

export default categoryRouter