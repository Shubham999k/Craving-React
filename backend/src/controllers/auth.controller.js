import User from "../models/user.model.js";

export const RegisterUser = async (req, res, next) => {
    try {

        const { fullName, email, password, dob, phone, gender } = req.body;
        if (!fullName || !email || !password || !dob || !phone || !gender) {
            const error = new Error("All Fields are required");
            error.statusCode = 400;
            return next(error)
        }

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

        //Create new User in database
        const user = await User.create({
            fullName,
            email,
            password,
            dob,
            phone,
            gender,
            profilePic
        });
        res.status(201).json({ message: "User created successfully" })
    } catch (error) {
        console.log(error.message);
        next(error);
    }
};

export const LoginUser = (req, res) => {
    res.json({ message: "Login Successful from Controller" })
};

export const LogoutUser = (req, res) => {
    res.json({ message: "Logout Successful from Controller" })
};