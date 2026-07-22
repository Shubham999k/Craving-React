import OTP from "../models/otp.model.js";

export const generateAndSaveOTP = async (email) => {
    // Delete any existing OTP for this email
    await OTP.deleteMany({ email });

    // Generate 6-digit OTP
    const otpCode = Math.floor(100000 + Math.random() * 900000).toString();

    // Save OTP
    await OTP.create({
        email,
        otp: otpCode
    });

    return otpCode;
};

export const verifyOTP = async (email, otpCode) => {
    const validOtp = await OTP.findOne({ email, otp: otpCode });
    return validOtp;
};

export const deleteOTP = async (otpId) => {
     await OTP.deleteOne({ _id: otpId });
};
