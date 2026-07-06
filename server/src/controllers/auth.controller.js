import User from "../models/user.model.js";
import bcrypt from "bcrypt";
import cloudinary from "../config/cloudinary.config.js";

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

        const photoUrl = `placehold.co/600x400?text=${fullName.charAt(0).toUpperCase()}`;

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