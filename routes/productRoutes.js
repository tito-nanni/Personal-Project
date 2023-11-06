import express from 'express';
import * as productController from '../controllers/productController.js';

const router = express.Router();

router.get('/products', productController.getProducts);
router.get('/products/:productId', productController.getProductById);
router.post('/products', productController.createProduct);
router.put('/products/:productId', productController.updateProduct);
router.delete('/products/:productId', productController.deleteProduct);

export default router;