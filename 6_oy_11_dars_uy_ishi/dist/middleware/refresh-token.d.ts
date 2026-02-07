import type { NextFunction, Response } from "express";
import type { CustomRequest } from "./authorization.js";
export declare const refresh: (req: CustomRequest, res: Response, next: NextFunction) => Response<any, Record<string, any>> | undefined;
//# sourceMappingURL=refresh-token.d.ts.map