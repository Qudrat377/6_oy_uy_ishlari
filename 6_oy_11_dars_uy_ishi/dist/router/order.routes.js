import { Router } from "express";
import { authorization } from "../middleware/authorization.js";
import { cancelOrder, confirmOrder, createOrder, getAllOrders, getOneOrder } from "../controller/order.ctr.js";
const orderRouter = Router();
orderRouter.get("/get_all_orders", authorization, getAllOrders);
orderRouter.get("/get_one_order/:id", authorization, getOneOrder);
orderRouter.post("/add_order", authorization, createOrder);
orderRouter.get("/cancel_order/:id", authorization, cancelOrder);
orderRouter.get("/confirm_order/:id", authorization, confirmOrder);
export default orderRouter;
//# sourceMappingURL=order.routes.js.map