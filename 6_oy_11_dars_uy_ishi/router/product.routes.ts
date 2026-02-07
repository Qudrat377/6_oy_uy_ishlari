import { Router, type RequestHandler} from "express"
import { addProduct, deleteProduct,  deleteProductVariant, getAllProducts, getOneProduct, updateProduct } from "../controller/product.ctr.js"
import { authorization } from "../middleware/authorization.js"
import { upload } from "../Utils/multer.js"
import { roleChekt } from "../middleware/role-check.js"
import { validate } from "../middleware/auth-validation.middleware.js"
import { addProductValidator, updateProductValidator } from "../validator/product.validator.js"

const prouctRouter = Router()

const productUploads = upload.fields([
    {name: 'main_image', maxCount: 1},
    {name: 'variant_images', maxCount: 10}
])

prouctRouter.get("/get_all_proucts", authorization, getAllProducts as RequestHandler)
prouctRouter.get("/get_one_prouct/:id", authorization, getOneProduct as RequestHandler)
prouctRouter.post("/add_prouct", roleChekt, productUploads, validate(addProductValidator), addProduct as RequestHandler)
prouctRouter.put("/update_product/:id", roleChekt, productUploads, validate(updateProductValidator), updateProduct as RequestHandler);
prouctRouter.delete("/delete_prouct/:id", roleChekt, deleteProduct as RequestHandler)
prouctRouter.delete("/delete_prouct_variant/:id", roleChekt, deleteProductVariant as RequestHandler)

export default prouctRouter