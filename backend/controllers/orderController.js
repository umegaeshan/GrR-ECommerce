import Order from '../models/orderModel.js';

// 1. අලුත් Order එකක් දාන්න (සාමාන්‍ය Users ලාට)
export const createOrder = async (req, res) => {
    try {
        const { orderItems, totalPrice } = req.body;

        if (orderItems && orderItems.length === 0) {
            return res.status(400).json({ message: "Order එකේ කිසිම භාණ්ඩයක් නැත" });
        }

        const order = await Order.create({
            user: req.user._id, // ලොගින් වෙලා ඉන්න කෙනාගේ ID එක
            orderItems,
            totalPrice
        });

        res.status(201).json(order);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// 2. Admin ට සියලුම Orders බලාගන්න (Admin Dashboard එකට)
export const getOrders = async (req, res) => {
    try {
        // ඔක්කොම Orders අරගෙන ඒක දාපු User ගේ නමත් (name) ඒකටම එකතු කරලා ගන්නවා
        const orders = await Order.find({}).populate('user', 'name');
        res.status(200).json(orders);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};