import { Router } from "express";
import { authorization } from "../middleware/authorization.js";
import { changePassword, getAllUsers, getOneUser, Me } from "../controller/user.ctr.js";
const userRouter = Router();
userRouter.get("/me", authorization, Me);
userRouter.get("/get_all_users", authorization, getAllUsers);
userRouter.get("/get_one_user/:id", authorization, getOneUser);
userRouter.put("/change_password", authorization, changePassword);
export default userRouter;
//# sourceMappingURL=user.routes.js.map