import Order from "../models/order.model.js";

// Get available orders for delivery
export const getAvailableOrders = async (req, res, next) => {
    try {
        // Find orders that don't have a rider assigned and are either Placed or Preparing
        const availableOrders = await Order.find({ 
            riderId: null, 
            status: { $in: ["Placed", "Preparing"] } 
        }).sort({ createdAt: -1 });

        res.status(200).json({ data: availableOrders });
    } catch (err) {
        next(err);
    }
};

// Accept an order for delivery
export const acceptOrder = async (req, res, next) => {
    try {
        const { orderId } = req.params;
        const { riderId } = req.body;

        if (!riderId) {
            const error = new Error("riderId is required");
            error.statusCode = 400;
            return next(error);
        }

        const order = await Order.findById(orderId);
        
        if (!order) {
            const error = new Error("Order not found");
            error.statusCode = 404;
            return next(error);
        }

        if (order.riderId) {
            const error = new Error("Order has already been accepted by another rider");
            error.statusCode = 409;
            return next(error);
        }

        order.riderId = riderId;
        // optionally update status to "In Transit" if they pick it up, or maybe they just accepted it
        await order.save();

        res.status(200).json({ message: "Order accepted successfully", data: order });
    } catch (err) {
        next(err);
    }
};

// Update delivery status
export const updateDeliveryStatus = async (req, res, next) => {
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

        res.status(200).json({ message: "Delivery status updated", data: updatedOrder });
    } catch (err) {
        next(err);
    }
};
