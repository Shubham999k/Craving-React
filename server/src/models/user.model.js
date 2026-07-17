import mongoose from "mongoose";
import bcrypt from "bcrypt";

const userSchema = new mongoose.Schema({
    fullName: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    dob: { type: Date, required: true },
    phone: { type: String, required: true },
    gender: { type: String, required: true },
    role: { 
        type: String, 
        enum: ["Customer", "Restaurant", "Rider", "Admin"], 
        default: "Customer",
    },
    profilePic: {
        url: { type: String },
        publicId: { type: String }
    },
    publicId: { type: String },
    resetPasswordToken: { type: String },
    resetPasswordExpire: { type: Date },
    isBlocked: { type: Boolean, default: false },
}, { timestamps: true });

const User = mongoose.model("User", userSchema);

export default User;