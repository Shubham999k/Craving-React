import User from "../models/user.model.js";
import bcrypt from "bcrypt";
import cloudinary from "../config/cloudinary.config.js";
import crypto from "crypto";
import OTP from "../models/otp.model.js";
import sendEmail from "../utils/sendEmail.js";

export const RegisterUser = async (req, res, next) => {
    try {

        const { fullName, email, password, dob, phone, gender } = req.body;
        const normalizedEmail = email?.toLowerCase().trim();

        if (!fullName || !normalizedEmail || !password || !phone) {
            const error = new Error("Full name, email, password, and phone are required");
            error.statusCode = 400;
            return next(error)
        }
        console.log(req.body);

        const existingUser = await User.findOne({ email: normalizedEmail });

        if (existingUser) {
            const error = new Error("User Already with same gmail");
            error.statusCode = 409;
            return next(error)
        }

        const photoUrl = `placehold.co/400x400?text=${fullName.charAt(0).toUpperCase()}`;

        const profilePic = {
            url: photoUrl,
            publicId: null,
        };
        const SALT = await bcrypt.genSalt(10);

        const hashedPassword = await bcrypt.hash(password, SALT);

        //Create new User in database
        const user = await User.create({
            fullName,
            email: normalizedEmail,
            password: hashedPassword,
            dob: dob || new Date(),
            phone,
            gender: gender || "Not specified",
            profilePic          
        });

        console.log(user);
        res.status(201).json({ message: "User created successfully" })
    } catch (error) {
        console.log(error.message);
        next(error);
    }
};

export const LoginUser = async (req, res, next) => {
    try {
        const { email, password } = req.body;
        const normalizedEmail = email?.toLowerCase().trim();

        if (!normalizedEmail || !password) {
            const err = new Error("All fields are required");
            err.statusCode = 400;
            return next(err);
        }


        const existingUser = await User.findOne({ email: normalizedEmail });
        if (!existingUser) {
            const err = new Error("User Not Found");
            err.statusCode = 404;
            return next(err);
        }


        const isVarified = await bcrypt.compare(password, existingUser.password);
        if (!isVarified) {
            const error = new Error("Invalid Password");
            error.statusCode = 401;
            return next(error);
        }

        res.status(200).json({
            message: "Welcome Back!",
            data: existingUser
        });

    } catch (error) {
        console.log(error.message);
        next(error);
    }
};

export const LogoutUser = (req, res) => {
    res.json({ message: "Logout Successful from Controller" })
};

export const UpdateProfile = async (req, res, next) => {
    try {
        const { userId, fullName, phone, profilePicture } = req.body;

        if (!userId) {
            const error = new Error("User ID is required");
            error.statusCode = 400;
            return next(error);
        }

        const user = await User.findById(userId);
        if (!user) {
            const error = new Error("User not found");
            error.statusCode = 404;
            return next(error);
        }

        let updatedProfilePic = user.profilePic;

        if (profilePicture) {
            // Check if profilePicture is a Base64 string (meaning a new custom image was uploaded)
            if (profilePicture.startsWith("data:image")) {
                // If user already had a custom picture in Cloudinary, we could delete it here
                // if (user.profilePic?.publicId) {
                //     await cloudinary.uploader.destroy(user.profilePic.publicId);
                // }
                
                const uploadResponse = await cloudinary.uploader.upload(profilePicture, {
                    folder: "cravings_avatars"
                });
                updatedProfilePic = {
                    url: uploadResponse.secure_url,
                    publicId: uploadResponse.public_id
                };
            } else {
                // It's a standard preset avatar URL
                updatedProfilePic = {
                    url: profilePicture,
                    publicId: null
                };
            }
        }

        user.fullName = fullName || user.fullName;
        user.phone = phone || user.phone;
        user.profilePic = updatedProfilePic;

        await user.save();

        res.status(200).json({
            message: "Profile updated successfully",
            data: user
        });

    } catch (error) {
        console.log(error.message);
        next(error);
    }
};

export const ForgotPassword = async (req, res, next) => {
    try {
        const { email } = req.body;
        const normalizedEmail = email?.toLowerCase().trim();

        if (!normalizedEmail) {
            const error = new Error("Email is required");
            error.statusCode = 400;
            return next(error);
        }

        const user = await User.findOne({ email: normalizedEmail });
        if (!user) {
            const error = new Error("No user found with that email address");
            error.statusCode = 404;
            return next(error);
        }

        // Delete any existing OTP for this email
        await OTP.deleteMany({ email: normalizedEmail });

        // Generate 6-digit OTP
        const otpCode = Math.floor(100000 + Math.random() * 900000).toString();

        // Save OTP
        await OTP.create({
            email: normalizedEmail,
            otp: otpCode
        });

        // Send email
        const messageHTML = `
            <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; border: 1px solid #e2e8f0; border-radius: 10px;">
                <h2 style="color: #c74a09; text-align: center;">Reset Your Password</h2>
                <p style="color: #334155; font-size: 16px;">Hello,</p>
                <p style="color: #334155; font-size: 16px;">We received a request to reset your password for your Cravings account. Here is your 6-digit OTP code:</p>
                <div style="text-align: center; margin: 30px 0;">
                    <span style="background-color: #f8fafc; padding: 15px 30px; font-size: 24px; font-weight: bold; letter-spacing: 5px; color: #0f172a; border: 1px solid #cbd5e1; border-radius: 8px;">
                        ${otpCode}
                    </span>
                </div>
                <p style="color: #334155; font-size: 16px;">This code will expire in 10 minutes. If you did not request a password reset, please ignore this email.</p>
                <hr style="border: none; border-top: 1px solid #e2e8f0; margin: 30px 0;" />
                <p style="color: #94a3b8; font-size: 12px; text-align: center;">&copy; ${new Date().getFullYear()} Cravings Food Delivery. All rights reserved.</p>
            </div>
        `;

        try {
            await sendEmail({
                email: user.email,
                subject: 'Cravings - Password Reset OTP',
                html: messageHTML,
            });

            res.status(200).json({
                message: "OTP sent successfully to your email address",
            });
        } catch (error) {
            // If email fails, delete the OTP to allow user to try again
            await OTP.deleteMany({ email: normalizedEmail });
            return next(new Error("Email could not be sent. Please make sure SMTP credentials are set in .env"));
        }

    } catch (error) {
        console.log(error.message);
        next(error);
    }
};

export const ResetPassword = async (req, res, next) => {
    try {
        const { email, otp, password } = req.body;

        if (!email || !otp || !password) {
            const error = new Error("Email, OTP, and new password are required");
            error.statusCode = 400;
            return next(error);
        }
        
        const normalizedEmail = email.toLowerCase().trim();

        // Check OTP
        const validOtp = await OTP.findOne({ email: normalizedEmail, otp });

        if (!validOtp) {
            const error = new Error("Invalid or expired OTP");
            error.statusCode = 400;
            return next(error);
        }

        const user = await User.findOne({ email: normalizedEmail });
        if (!user) {
            const error = new Error("User not found");
            error.statusCode = 404;
            return next(error);
        }

        // Hash new password
        const SALT = await bcrypt.genSalt(10);
        user.password = await bcrypt.hash(password, SALT);

        await user.save();
        
        // Delete OTP after successful reset
        await OTP.deleteOne({ _id: validOtp._id });

        res.status(200).json({
            message: "Password reset successfully. You can now log in."
        });

    } catch (error) {
        console.log(error.message);
        next(error);
    }
};