import type { NextFunction, Request, Response } from "express";
export interface CustomRequest extends Request {
    user?: any;
    image?: string | undefined;
}
export declare const authorization: (req: CustomRequest, res: Response, next: NextFunction) => void;
//# sourceMappingURL=authorization.d.ts.map