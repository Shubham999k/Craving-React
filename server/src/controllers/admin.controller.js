import User from "../models/user.model.js";
import Order from "../models/order.model.js";

// Get a list of all users
export const getAllUsers = async (req, res, next) => {
    try {
        const users = await User.find({}).sort({ createdAt: -1 });
        res.status(200).json({ data: users });
    } catch (err) {
        next(err);
    }
};

// Block or unblock a user
export const updateUserBlockStatus = async (req, res, next) => {
    try {
        const { userId } = req.params;
        const { isBlocked } = req.body;

        if (isBlocked === undefined) {
            const error = new Error("isBlocked is required");
            error.statusCode = 400;
            return next(error);
        }

        const updatedUser = await User.findByIdAndUpdate(
            userId,
            { isBlocked },
            { new: true }
        );

        if (!updatedUser) {
            const error = new Error("User not found");
            error.statusCode = 404;
            return next(error);
        }

        res.status(200).json({ message: "User status updated", data: updatedUser });
    } catch (err) {
        next(err);
    }
};

// Get platform analytics
export const getAnalytics = async (req, res, next) => {
    try {
        const totalUsers = await User.countDocuments();
        const totalOrders = await Order.countDocuments();
        
        // Calculate revenue
        const orders = await Order.find({});
        const revenue = orders.reduce((acc, order) => acc + (order.total || 0), 0);

        res.status(200).json({
            data: {
                totalOrders,
                revenue,
                users: totalUsers
            }
        });
    } catch (err) {
        next(err);
    }
};
