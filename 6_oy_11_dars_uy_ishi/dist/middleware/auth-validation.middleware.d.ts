import type { NextFunction, Response } from "express";
import type { CustomRequest } from "./authorization.js";
export declare const validate: (validator: any) => (req: CustomRequest, res: Response, next: NextFunction) => void;
//# sourceMappingURL=auth-validation.middleware.d.ts.map