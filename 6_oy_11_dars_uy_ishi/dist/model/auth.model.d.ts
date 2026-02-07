import { Model } from "sequelize";
export declare class Auth extends Model {
    username: string;
    email: string;
    password: string;
    role: string;
    otp: string;
    isVerified: boolean;
    otptime: string;
}
//# sourceMappingURL=auth.model.d.ts.map