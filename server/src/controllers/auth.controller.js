import User from "../models/user.model.js";
import bcrypt from "bcrypt";

export const RegisterUser = async (req, res, next) => {
    try {

        const { fullName, email, password, dob, phone, gender } = req.body;
        if (!fullName || !email || !password || !dob || !phone || !gender) {
            const error = new Error("All Fields are required");
            error.statusCode = 400;
            return next(error)
        }
        console.log(req.body);

        const existingUser = await User.findOne({ email });

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
            email,
            password: hashedPassword,
            dob,
            phone,
            gender,
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

        if (!email || !password) {
            const err = new Error("All fields are required");
            err.statusCode = 400;
            return next(err);
        }


        const existingUser = await User.findOne({ email });
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