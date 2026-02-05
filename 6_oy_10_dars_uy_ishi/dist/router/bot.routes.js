import { Router } from "express";
import { getMessageFromToday, getMessageLastTenDay, updateMessageDate } from "../controller/bot.ctr.js";
const botRouter = Router();
botRouter.get("/get_message_from_today", getMessageFromToday);
botRouter.get("/get_message_last_ten_day", getMessageLastTenDay);
botRouter.put("/update_data/:id", updateMessageDate);
export default botRouter;
//# sourceMappingURL=bot.routes.js.map