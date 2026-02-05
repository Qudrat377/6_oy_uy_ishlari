import type { NextFunction, Request, Response } from "express";
export declare const getAllStudents: (req: Request, res: Response, next: NextFunction) => Promise<void>;
export declare const statistics: (req: Request, res: Response, next: NextFunction) => Promise<void>;
export declare const addStudent: (req: Request, res: Response, next: NextFunction) => Promise<void>;
export declare const leftStudent: (req: Request, res: Response, next: NextFunction) => Promise<Response<any, Record<string, any>> | undefined>;
export declare const UpdateStudent: (req: Request, res: Response, next: NextFunction) => Promise<Response<any, Record<string, any>> | undefined>;
export declare const deleteStudent: (req: Request, res: Response, next: NextFunction) => Promise<Response<any, Record<string, any>> | undefined>;
//# sourceMappingURL=student.ctr.d.ts.map