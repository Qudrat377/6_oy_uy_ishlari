import type { NextFunction, Request, Response } from "express";
export declare const getAllStudents: (req: Request, res: Response, next: NextFunction) => Promise<void>;
export declare const addStudents: (req: Request, res: Response, next: NextFunction) => Promise<void>;
export declare const UpdateStudents: (req: Request, res: Response, next: NextFunction) => Promise<Response<any, Record<string, any>> | undefined>;
export declare const deleteStudents: (req: Request, res: Response, next: NextFunction) => Promise<Response<any, Record<string, any>> | undefined>;
//# sourceMappingURL=student.ctr.d.ts.map