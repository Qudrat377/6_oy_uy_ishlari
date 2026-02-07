import {Router, type RequestHandler} from "express"
import { authorization } from "../middleware/authorization.js"
import { changePassword, getAllUsers, getOneUser, Me } from "../controller/user.ctr.js"

const userRouter = Router()

userRouter.get("/me", authorization, Me as RequestHandler)
userRouter.get("/get_all_users", authorization, getAllUsers as RequestHandler)
userRouter.get("/get_one_user/:id", authorization, getOneUser as RequestHandler)
userRouter.put("/change_password", authorization, changePassword as RequestHandler)

export default userRouter