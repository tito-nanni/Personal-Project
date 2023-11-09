import { Order, OrderDetail } from '../model.js';

// Fetch all orders
export const getOrders = async (req, res) => {
    try {
        const orders = await Order.findAll({
            include: [OrderDetail] // Includes related OrderDetails
        });
        res.json(orders);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}

// Fetch a single order by ID
export const getOrderById = async (req, res) => {
    try {
        const order = await Order.findByPk(req.params.orderId, {
            include: [OrderDetail]
        })
        if (order) {
            res.json(order);
        } else {
            res.status(404).json({ error: 'Order not found' })
        }
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}

// Create a new order
export const createOrder = async (req, res) => {
    try {
        const order = await Order.create(req.body);
        res.status(201).json(order);
    } catch (error) {
        res.status(500).json({ error: error.message })
    }
}

// Update an order
export const updateOrder = async (req, res) => {
    try {
        const updated = await Order.update(req.body, {
            where: { order_id: req.params.orderId }
        });
        if (updated) {
            res.status(200).json({ message: 'Order updated successfully' });
        } else {
            res.status(404).json({ error: 'Order not found' })
        }
    } catch (error) {
        res.status(500).json({ error: error.message })
    }
};

// Delete an order
export const deleteOrder = async (req, res) => {
    try {
        const deleted = await Order.destroy({
            where: { order_id: req.params.orderId }
        });
        if (deleted) {
            res.status(200).json({ message: 'Order deleted successfully'});
        } else {
            res.status(404).json({ error: 'Order not found' });
        }
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}