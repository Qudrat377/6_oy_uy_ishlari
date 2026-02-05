import {Router, type RequestHandler} from "express"
import { getMessageFromToday, getMessageLastTenDay, updateMessageDate } from "../controller/bot.ctr.js"

const botRouter: Router = Router()

botRouter.get("/get_message_from_today", getMessageFromToday as RequestHandler)
botRouter.get("/get_message_last_ten_day", getMessageLastTenDay as RequestHandler)
botRouter.put("/update_data/:id", updateMessageDate as RequestHandler)

export default botRouter