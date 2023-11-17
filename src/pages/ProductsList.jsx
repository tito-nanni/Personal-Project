import React, {useState, useEffect} from "react";
import axios from "axios";
import Product from './Product';
import './ProductsList.css'

const ProductsList = () => {
    const [products, setProducts] = useState([]);

    useEffect(() => {
        const fetchProducts = async () => {
            try {
                const response = await axios.get('/api/products');
                setProducts(response.data);
            } catch (error) {
                console.error('Error fetching products', error);
            }
        };

        fetchProducts();
    }, []);

    return (
        <div>
            <h1 className="products-title">Available Products</h1>
            <div className="products-list">
                {products.map(product => (
                    <Product key={product.id} product={product} />
                ))}
            </div>
        </div>
    );
};

export default ProductsList;