import type { NextFunction, Response } from "express";
import type { CustomRequest } from "../middleware/authorization.js";
export declare const getAllOrders: (req: CustomRequest, res: Response, next: NextFunction) => Promise<void>;
export declare const getOneOrder: (req: CustomRequest, res: Response, next: NextFunction) => Promise<void>;
export declare const createOrder: (req: CustomRequest, res: Response, next: NextFunction) => Promise<void>;
export declare const cancelOrder: (req: CustomRequest, res: Response, next: NextFunction) => Promise<void>;
export declare const confirmOrder: (req: CustomRequest, res: Response, next: NextFunction) => Promise<void>;
//# sourceMappingURL=order.ctr.d.ts.map