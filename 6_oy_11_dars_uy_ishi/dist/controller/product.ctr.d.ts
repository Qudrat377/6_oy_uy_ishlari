import type { NextFunction, Response } from "express";
import type { CustomRequest } from "../middleware/authorization.js";
export declare const getAllProducts: (req: CustomRequest, res: Response, next: NextFunction) => Promise<void>;
export declare const getOneProduct: (req: CustomRequest, res: Response, next: NextFunction) => Promise<void>;
export declare const addProduct: (req: CustomRequest, res: Response, next: NextFunction) => Promise<void>;
export declare const updateProduct: (req: any, res: Response) => Promise<void>;
export declare const deleteProduct: (req: CustomRequest, res: Response, next: NextFunction) => Promise<Response<any, Record<string, any>> | undefined>;
export declare const deleteProductVariant: (req: CustomRequest, res: Response, next: NextFunction) => Promise<Response<any, Record<string, any>> | undefined>;
//# sourceMappingURL=product.ctr.d.ts.map