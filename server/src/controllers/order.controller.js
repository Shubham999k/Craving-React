import Order from "../models/order.model.js";

export const createOrder = async (req, res, next) => {
    try {
        const { userId, items, subtotal, discount, deliveryFee, tax, total } = req.body;
        if (!userId || !items || !items.length || subtotal === undefined || total === undefined) {
            const error = new Error("Invalid order data");
            error.statusCode = 400;
            return next(error);
        }
        const newOrder = await Order.create({
            userId,
            items,
            subtotal,
            discount,
            deliveryFee,
            tax,
            total,
            status: "Placed"
        });
        res.status(201).json({ message: "Order placed successfully", data: newOrder });
    } catch (err) {
        next(err);
    }
};

export const getUserOrders = async (req, res, next) => {
    try {
        const { userId } = req.params;
        const orders = await Order.find({ userId }).sort({ createdAt: -1 });
        res.status(200).json({ data: orders });
    } catch (err) {
        next(err);
    }
};
