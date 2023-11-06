import { Product } from "../server/model.js";

// Fetch  all products
export const getProducts = async (req, res) => {
    try {
        const products = await Product.findAll();
        res.json(products);
    } catch (error) {
        res.status(500).json({ error: error.message })
    }
}

// Fetch a single product by ID
export const getProductById = async (req, res) => {
    try {
        const product = await Product.findByPk(req.params.productId);
        if (product) {
            res.json(product);
        } else {
            res.status(404).json({ error: 'Product not found' });
        }
    } catch (error) {
        res.status(500).json({ error: error.message })
    }
}

// Create a new product
export const createProduct = async (req, res) => {
    try {
        const product = await Product.create(req.body);
        res.status(201).json(product);
    } catch (error) {
        res.status(500).json({ error: error.message })
    }
};

// Update a product
export const updateProduct = async (req, res) => {
    try {
        const updated = await Product.update(req.body, {
            where: { product_id: req.params.productId },
        });
        if (updated) {
            res.status(200).json({ message: 'Product updated successfully'});
        } else {
            res.status(404).json({ error: 'Product not found' });
        }
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}

// Delete a product
export const deleteProduct = async (req, res) => {
    try {
        const deleted = await Product.destroy({
            where: { product_id: req.params.productId },
        });
        if (deleted) {
            res.status(200).json({ message: 'Product deleted successfully'});
        } else {
            res.status(404).json({ error: 'Product not found' });
        }
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}