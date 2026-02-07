import {Router, type RequestHandler} from "express"
import { SuperAdmin } from "../controller/superadmin.ctr.js"
import { superadminTekshiruvchi } from "../middleware/superadmin-verify.js"
import { validate } from "../middleware/auth-validation.middleware.js"
import { SuperAdminValidator } from "../validator/superadmin.validator.js"

const superadminRouter = Router()

superadminRouter.put("/super_admin/:id", validate(SuperAdminValidator), superadminTekshiruvchi, SuperAdmin )

export default superadminRouter