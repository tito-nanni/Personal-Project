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

// Add more controllers for creating, updating, deleting products