import type { NextFunction, Response } from "express";
import type { CustomRequest } from "../middleware/authorization.js";
export declare const getAllSaveds: (req: CustomRequest, res: Response, next: NextFunction) => Promise<void>;
export declare const addSaved: (req: CustomRequest, res: Response, next: NextFunction) => Promise<void>;
export declare const deleteSaved: (req: CustomRequest, res: Response, next: NextFunction) => Promise<void>;
//# sourceMappingURL=saved.ctr.d.ts.map