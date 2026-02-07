import { CustomErrorHandler } from "../Utils/custom-error-hendler.js";
export const errorMiddleware = (err, req, res, next) => {
    try {
        if (err instanceof CustomErrorHandler) {
            return res.status(err.status).json({
                message: err.message,
                errors: err.errors
            });
        }
        if (err.name === "ValidationError") {
            const errorMessage = err.message.split(",");
            return res.status(400).json({ message: errorMessage });
        }
        res.status(500).json({
            message: err.message
        });
    }
    catch (error) {
        res.status(500).json({
            message: error.message
        });
    }
};
//# sourceMappingURL=error.middleware.js.map