import Menu from "../models/menu.model.js";
import Order from "../models/order.model.js";
import Restaurant from "../models/restaurant.model.js";
import cloudinary from "../config/cloudinary.config.js";
import { uploadMultipleOnCloudinary } from "../utils/image.service.js";

// Upload multiple gallery images for a restaurant
export const uploadGalleryImages = async (req, res, next) => {
    try {
        const { id } = req.params;
        
        const restaurant = await Restaurant.findById(id);
        if (!restaurant) {
            const error = new Error("Restaurant not found");
            error.statusCode = 404;
            return next(error);
        }

        // Get file paths from multer
        const localFilePaths = req.files?.map(file => file.path);
        
        if (!localFilePaths || localFilePaths.length === 0) {
            const error = new Error("No files uploaded");
            error.statusCode = 400;
            return next(error);
        }

        // Upload to cloudinary
        const uploadedImages = await uploadMultipleOnCloudinary(localFilePaths, `craving-react/restaurant-${id}`);
        
        if (uploadedImages.length === 0) {
            const error = new Error("Failed to upload images to Cloudinary");
            error.statusCode = 500;
            return next(error);
        }

        // Map responses to match schema
        const galleryObjects = uploadedImages.map(img => ({
            url: img.secure_url,
            publicId: img.public_id
        }));

        // Push new images to existing array
        restaurant.restaurantImages.push(...galleryObjects);
        await restaurant.save();

        res.status(200).json({ 
            message: "Gallery images uploaded successfully", 
            data: restaurant.restaurantImages 
        });

    } catch (err) {
        next(err);
    }
};
// Add a new menu item
export const addMenuItem = async (req, res, next) => {
    try {
        const { name, description, price, category, image } = req.body;
        
        if (!name || !description || price === undefined || !category) {
            const error = new Error("Missing required fields for menu item");
            error.statusCode = 400;
            return next(error);
        }

        const newMenuItem = await Menu.create({
            name,
            description,
            price,
            category,
            image
        });

        res.status(201).json({ message: "Menu item added successfully", data: newMenuItem });
    } catch (err) {
        next(err);
    }
};

// Get all active orders for the restaurant
export const getActiveOrders = async (req, res, next) => {
    try {
        // Active orders could be considered ones that have not yet Arrived/Completed
        const activeOrders = await Order.find({ status: { $ne: "Arrived" } }).sort({ createdAt: -1 });
        res.status(200).json({ data: activeOrders });
    } catch (err) {
        next(err);
    }
};

// Update the status of an order
export const updateOrderStatus = async (req, res, next) => {
    try {
        const { orderId } = req.params;
        const { status } = req.body;

        if (!status) {
            const error = new Error("Status is required");
            error.statusCode = 400;
            return next(error);
        }

        const updatedOrder = await Order.findByIdAndUpdate(
            orderId,
            { status },
            { new: true }
        );

        if (!updatedOrder) {
            const error = new Error("Order not found");
            error.statusCode = 404;
            return next(error);
        }

        res.status(200).json({ message: "Order status updated", data: updatedOrder });
    } catch (err) {
        next(err);
    }
};

// Register a new restaurant partner
export const registerRestaurant = async (req, res, next) => {
    try {
        const { contactName, email, phone, restaurantName, cuisine, address, fssaiLicense, gstin, panNumber, profilePic, restaurantImages } = req.body;

        if (!contactName || !email || !phone || !restaurantName || !cuisine || !address || !fssaiLicense || !panNumber) {
            const error = new Error("Missing required fields for restaurant registration");
            error.statusCode = 400;
            return next(error);
        }

        let uploadedProfilePic = { url: null, publicId: null };
        let uploadedRestaurantImages = [];

        if (profilePic && profilePic.startsWith("data:image")) {
            const uploadResponse = await cloudinary.uploader.upload(profilePic, {
                folder: "cravings_partners/dp"
            });
            uploadedProfilePic = {
                url: uploadResponse.secure_url,
                publicId: uploadResponse.public_id
            };
        }

        if (restaurantImages && Array.isArray(restaurantImages) && restaurantImages.length > 0) {
            const uploadPromises = restaurantImages.map(img => {
                if (img && img.startsWith("data:image")) {
                    return cloudinary.uploader.upload(img, {
                        folder: "cravings_partners/restaurants"
                    });
                }
                return null;
            });

            const uploadResults = await Promise.all(uploadPromises);
            
            uploadedRestaurantImages = uploadResults
                .filter(res => res !== null)
                .map(res => ({
                    url: res.secure_url,
                    publicId: res.public_id
                }));
        }

        const newRestaurant = await Restaurant.create({
            contactName,
            email,
            phone,
            restaurantName,
            cuisine,
            address,
            fssaiLicense,
            gstin,
            panNumber,
            profilePic: uploadedProfilePic,
            restaurantImages: uploadedRestaurantImages,
            status: "Pending"
        });

        res.status(201).json({ message: "Partnership request submitted successfully", data: newRestaurant });
    } catch (err) {
        next(err);
    }
};
