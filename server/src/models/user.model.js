import mongoose from "mongoose";
import bcrypt from "bcrypt";

const userSchema = new mongoose.Schema({
    fullName: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    dob: { type: Date, required: true },
    phone: { type: String, required: true },
    gender: { type: String, required: true },
    profilePic: {
        url: { type: String },
        publicId: { type: String }
    },
}, { timestamps: true });

const User = mongoose.model("User", userSchema);

export default User;