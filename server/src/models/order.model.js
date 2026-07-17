import mongoose from "mongoose";

const orderSchema = new mongoose.Schema({
    userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
    items: [
        {
            id: { type: String, required: true },
            name: { type: String, required: true },
            price: { type: Number, required: true },
            qty: { type: Number, required: true },
            category: { type: String, required: true },
            image: { type: String }
        }
    ],
    subtotal: { type: Number, required: true },
    discount: { type: Number, default: 0 },
    deliveryFee: { type: Number, default: 30 },
    tax: { type: Number, default: 15 },
    total: { type: Number, required: true },
    status: { type: String, default: "Placed" }, // Placed, Preparing, In Transit, Arrived
    riderId: { type: mongoose.Schema.Types.ObjectId, ref: "User", default: null }
}, { timestamps: true });

const Order = mongoose.model("Order", orderSchema);
export default Order;
