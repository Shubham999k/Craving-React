import mongoose from "mongoose";

const restaurantSchema = new mongoose.Schema({
    contactName: { type: String, required: true },
    email: { type: String, required: true },
    phone: { type: String, required: true },
    restaurantName: { type: String, required: true },
    cuisine: { type: String, required: true },
    address: { type: String, required: true },
    fssaiLicense: { type: String, required: true },
    gstin: { type: String },
    panNumber: { type: String, required: true },
    status: { 
        type: String, 
        enum: ["Pending", "Approved", "Rejected"], 
        default: "Pending" 
    },
    profilePic: {
        url: { type: String },
        publicId: { type: String }
    },
    restaurantImage: {
        url: { type: String },
        publicId: { type: String }
    }
}, { timestamps: true });

const Restaurant = mongoose.model("Restaurant", restaurantSchema);

export default Restaurant;
