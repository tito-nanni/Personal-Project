import express from 'express';
import * as orderDetailController from '../controllers/orderDetailController.js';

const router = express.Router();

router.get('/order-details', orderDetailController.getOrderDetails);
router.get('/order-details/:orderDetailId', orderDetailController.getOrderDetailById);
router.post('/order-details', orderDetailController.createOrderDetail);
router.put('/order-details/:orderDetailId', orderDetailController.updateOrderDetail);
router.delete('/order-details/:orderDetailId', orderDetailController.deleteOrderDetail);

export default router;