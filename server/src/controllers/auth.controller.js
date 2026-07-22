import User from "../models/user.model.js";
import bcrypt from "bcrypt";
import cloudinary from "../config/cloudinary.config.js";
import crypto from "crypto";
import OTP from "../models/otp.model.js";
import { sendOTP } from "../utils/email.service.js";
import { generateAndSaveOTP, verifyOTP, deleteOTP } from "../utils/auth.service.js";
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

        // Generate and Save OTP using the new auth service
        const otpCode = await generateAndSaveOTP(normalizedEmail);

        // Send OTP email using the new email service
        await sendOTP(user.email, otpCode);

        res.status(200).json({
            message: "OTP sent successfully to your email address",
        });

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

        // Check OTP using auth service
        const validOtp = await verifyOTP(normalizedEmail, otp);

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
        await deleteOTP(validOtp._id);

        res.status(200).json({
            message: "Password reset successfully. You can now log in."
        });

    } catch (error) {
        console.log(error.message);
        next(error);
    }
};