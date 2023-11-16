import { OrderDetail, Product } from '../model.js';

// Fetch all order details
export const getOrderDetails = async (req, res) => {
    try {
        const orderDetails = await OrderDetail.findAll({
            include: [Product]  // Include the Product information
        });
        res.json(orderDetails);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};


// Fetch a single order detail by ID
export const getOrderDetailById = async (req, res) => {
    try {
        const orderDetail = await OrderDetail.findByPk(req.params.orderDetailId, {
            include: [{
             model: Product,
             attributes: ['name']  // Include the Product information
            }]
        });
        if (orderDetail) {
            res.json(orderDetail);
        } else {
            res.status(404).json({ error: 'Order detail not found' });
        }
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Create a new order detail
export const createOrderDetail = async (req, res) => {
    try {
        const orderDetail = await OrderDetail.create(req.body);
        res.status(201).json(orderDetail);
    } catch (error) {
        res.status(500).json({ error: error.message })
    }
};

// Update an order detail
export const updateOrderDetail = async (req, res) => {
    try {
        const updated = await OrderDetail.update(req.body, {
            where: { order_detail_id: req.params.orderDetailId },
        });
        if (updated[0] > 0) {
            res.json({ message: 'Order detail updated successfully' })
        } else {
            res.status(404).json({ error: 'Order detail not found' });
        }
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Delete an order detail
export const deleteOrderDetail = async (req, res) => {
    try {
        const deleted = await OrderDetail.destroy({
            where: { order_detail_id: req.params.orderDetailId },
        });
        if (deleted) {
            res.json({ message: 'Order detail deleted successfully'});
        } else {
            res.status(404).json({ error: 'Order detail not found' });
        }
    } catch (error) {
        res.status(500).json({ error: error.message })
    }
}