import type { NextFunction, Request, Response } from "express";
import type { CustomRequest } from "../middleware/authorization.js";
export declare const register: (req: Request, res: Response, next: NextFunction) => Promise<void>;
export declare const verify: (req: Request, res: Response, next: NextFunction) => Promise<void>;
export declare const login: (req: Request, res: Response, next: NextFunction) => Promise<void>;
export declare const resendOtp: (req: Request, res: Response, next: NextFunction) => Promise<void>;
export declare const logout: (req: CustomRequest, res: Response, next: NextFunction) => Promise<void>;
export declare const forgotPassword: (req: Request, res: Response, next: NextFunction) => Promise<void>;
export declare const getUser: (req: CustomRequest, res: Response, next: NextFunction) => Promise<void>;
//# sourceMappingURL=auth.ctr.d.ts.map