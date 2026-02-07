import type { NextFunction, Response } from "express";
import type { CustomRequest } from "../middleware/authorization.js";
export declare const getAllCategorys: (req: CustomRequest, res: Response, next: NextFunction) => Promise<void>;
export declare const getOneCategory: (req: CustomRequest, res: Response, next: NextFunction) => Promise<void>;
export declare const addCategory: (req: CustomRequest, res: Response, next: NextFunction) => Promise<void>;
export declare const updateCategory: (req: CustomRequest, res: Response, next: NextFunction) => Promise<void>;
export declare const deleteCategory: (req: CustomRequest, res: Response, next: NextFunction) => Promise<void>;
//# sourceMappingURL=category.ctr.d.ts.map