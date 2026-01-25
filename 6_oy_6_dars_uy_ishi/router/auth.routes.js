const {Router} = require("express")
const { register, getAllUser, getOneuser } = require("../controller/auth.controller")

const AuthRouter = Router()

AuthRouter.post("/register", register)
AuthRouter.get("/get_all_users", getAllUser)
AuthRouter.get("/get_one_user/:id", getOneuser)
// AuthRouter.put("/update_Auth/:id", UpdateAuth)
// AuthRouter.delete("/delete_Auth/:id", deleteAuth)

module.exports = AuthRouter