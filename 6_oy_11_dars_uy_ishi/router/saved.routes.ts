import {Router, type RequestHandler} from "express"
import { authorization } from "../middleware/authorization.js"
import { addSaved, deleteSaved, getAllSaveds } from "../controller/saved.ctr.js"

const savedRouter = Router()

savedRouter.get("/get_all_saveds",  authorization, getAllSaveds as RequestHandler)
savedRouter.post("/add_saved", authorization, addSaved as RequestHandler)
savedRouter.delete("/delete_saved", authorization, deleteSaved as RequestHandler)

export default savedRouter