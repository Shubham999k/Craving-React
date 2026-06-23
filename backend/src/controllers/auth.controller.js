import User from "../models/user.model.js";

export const RegisterUser = async (req, res) => {
    try {

        const { fullName, email, password, dob, phone, gender } = req.body;
        if (!fullName || !email || !password || !dob || !phone || !gender) {
            res.status(400).json({ message: "All fields are required" });
            return;
        }

        const existingUser = await User.findOne({email});
        
        if(existingUser){
            res.status(409).json({message:"User with email already exists"});
            return;
        }

        //Create new User in database
        const user = await User.create({
            fullName,
            email,
            password,
            dob,
            phone,
            gender
        });
        res.json({ message: "Register Successful from COntroller" })
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: "Internal Server Error" })
    }
};

export const LoginUser = (req, res) => {
    res.json({ message: "Login Successful from COntroller" })
};

export const LogoutUser = (req, res) => {
    res.json({ message: "Logout Successful from COntroller" })
};

