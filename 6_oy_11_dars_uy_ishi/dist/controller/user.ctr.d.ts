import type { NextFunction, Response } from "express";
import type { CustomRequest } from "../middleware/authorization.js";
export declare const Me: (req: CustomRequest, res: Response, next: NextFunction) => Promise<Response<any, Record<string, any>> | undefined>;
export declare const getAllUsers: (req: CustomRequest, res: Response, next: NextFunction) => Promise<void>;
export declare const getOneUser: (req: CustomRequest, res: Response, next: NextFunction) => Promise<void>;
export declare const changePassword: (req: CustomRequest, res: Response, next: NextFunction) => Promise<Response<any, Record<string, any>> | undefined>;
//# sourceMappingURL=user.ctr.d.ts.map