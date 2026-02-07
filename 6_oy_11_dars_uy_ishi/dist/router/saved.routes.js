import { Router } from "express";
import { authorization } from "../middleware/authorization.js";
import { addSaved, deleteSaved, getAllSaveds } from "../controller/saved.ctr.js";
const savedRouter = Router();
savedRouter.get("/get_all_saveds", authorization, getAllSaveds);
savedRouter.post("/add_saved", authorization, addSaved);
savedRouter.delete("/delete_saved", authorization, deleteSaved);
export default savedRouter;
//# sourceMappingURL=saved.routes.js.map