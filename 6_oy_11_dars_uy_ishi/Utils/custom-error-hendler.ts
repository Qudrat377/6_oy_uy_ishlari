export class CustomErrorHandler extends Error {
    public status: number;
    public errors: any[]

    constructor(status: number, message: string, errors: any[] = []) {
        super(message)
        this.status = status
        this.errors = errors

        Object.setPrototypeOf(this, CustomErrorHandler.prototype);
        Error.captureStackTrace(this, this.constructor)
    }

    static UnAuthorized(message: string, errors = []) {
        return new CustomErrorHandler(401, message, errors)
    }

    static BadRequest(message: string, errors = []) {
    return new CustomErrorHandler(400, message, errors)
   }

   static NotFound(message: string, errors = []) {
    return new CustomErrorHandler(404, message, errors)
   }
   static Forbidden(message: string, errors = []) {
    return new CustomErrorHandler(403, message, errors)
   }
}