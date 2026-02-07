import { Router } from "express";
import { authorization } from "../middleware/authorization.js";
import { addToKarzina, deleteKarzinaProduct, getAllKarzina, updateKarzinaQuantity } from "../controller/karzina.ctr.js";
import { validate } from "../middleware/auth-validation.middleware.js";
import { addKarzinaValidator, updateKarzinaValidator } from "../validator/karzina.validator.js";
const karzinaRouter = Router();
karzinaRouter.get("/get_all_karzina", authorization, getAllKarzina);
karzinaRouter.post("/add_karzina", validate(addKarzinaValidator), authorization, addToKarzina);
karzinaRouter.put("/update_karzinka_quantity", validate(updateKarzinaValidator), authorization, updateKarzinaQuantity);
karzinaRouter.delete("/delete_karzina", authorization, deleteKarzinaProduct);
export default karzinaRouter;
//# sourceMappingURL=karzina.routes.js.map