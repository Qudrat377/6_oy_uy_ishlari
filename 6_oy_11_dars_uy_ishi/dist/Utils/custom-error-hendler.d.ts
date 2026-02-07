export declare class CustomErrorHandler extends Error {
    status: number;
    errors: any[];
    constructor(status: number, message: string, errors?: any[]);
    static UnAuthorized(message: string, errors?: never[]): CustomErrorHandler;
    static BadRequest(message: string, errors?: never[]): CustomErrorHandler;
    static NotFound(message: string, errors?: never[]): CustomErrorHandler;
    static Forbidden(message: string, errors?: never[]): CustomErrorHandler;
}
//# sourceMappingURL=custom-error-hendler.d.ts.map