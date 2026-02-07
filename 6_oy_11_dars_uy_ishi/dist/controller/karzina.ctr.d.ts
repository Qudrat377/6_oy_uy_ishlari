import type { NextFunction, Response } from "express";
import type { CustomRequest } from "../middleware/authorization.js";
export declare const getAllKarzina: (req: CustomRequest, res: Response, next: NextFunction) => Promise<Response<any, Record<string, any>> | undefined>;
export declare const addToKarzina: (req: CustomRequest, res: Response, next: NextFunction) => Promise<void>;
export declare const updateKarzinaQuantity: (req: CustomRequest, res: Response, next: NextFunction) => Promise<void>;
export declare const deleteKarzinaProduct: (req: CustomRequest, res: Response, next: NextFunction) => Promise<void>;
//# sourceMappingURL=karzina.ctr.d.ts.map