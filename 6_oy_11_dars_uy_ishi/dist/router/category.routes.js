import { Router } from "express";
import { addCategory, deleteCategory, getAllCategorys, getOneCategory, updateCategory } from "../controller/category.ctr.js";
import { authorization } from "../middleware/authorization.js";
import { upload } from "../Utils/multer.js";
import { roleChekt } from "../middleware/role-check.js";
import { validate } from "../middleware/auth-validation.middleware.js";
import { addCategoryValidator, updateCategoryValidator } from "../validator/category.validator.js";
const categoryRouter = Router();
categoryRouter.get("/get_all_categorys", authorization, getAllCategorys);
categoryRouter.get("/get_one_category/:id", authorization, getOneCategory);
categoryRouter.post("/add_category", validate(addCategoryValidator), roleChekt, upload.single("file"), addCategory);
categoryRouter.put("/update_category/:id", validate(updateCategoryValidator), roleChekt, upload.single("file"), updateCategory);
categoryRouter.delete("/delete_category/:id", roleChekt, deleteCategory);
export default categoryRouter;
//# sourceMappingURL=category.routes.js.map