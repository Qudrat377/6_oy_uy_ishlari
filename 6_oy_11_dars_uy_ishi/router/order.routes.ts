import {Router, type RequestHandler} from "express"
import { authorization } from "../middleware/authorization.js"
import { cancelOrder, confirmOrder, createOrder, getAllOrders, getOneOrder } from "../controller/order.ctr.js"

const orderRouter = Router()

orderRouter.get("/get_all_orders",  authorization, getAllOrders as RequestHandler)
orderRouter.get("/get_one_order/:id", authorization, getOneOrder as RequestHandler)
orderRouter.post("/add_order", authorization, createOrder as RequestHandler)
orderRouter.get("/cancel_order/:id", authorization, cancelOrder as RequestHandler)
orderRouter.get("/confirm_order/:id", authorization, confirmOrder as RequestHandler)

export default orderRouter