import express from 'express';
import * as productController from '../controllers/productController.js';

const router = express.Router();

router.get('/products', productController.getProducts);

// Define more routes for creating, updating, deleting products

export default router;