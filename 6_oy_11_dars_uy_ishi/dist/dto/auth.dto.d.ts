export interface CreateAuthDto {
    username: string;
    email: string;
    password: string;
    role: string;
    otp: string;
    isVerified: boolean;
    otptime: string;
}
export interface CreateAuthVerifyDto {
    email: string;
    otp: string;
}
export interface CreateAuthLoginDto {
    email: string;
    password: string;
}
export interface CreateAuthResendOtpyDto {
    email: string;
}
export interface CreateAuthForgotPasswordDto {
    email: string;
    otp: string;
    new_password: string;
}
//# sourceMappingURL=auth.dto.d.ts.map