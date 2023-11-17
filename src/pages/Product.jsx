import React from "react";
import { useDispatch } from "react-redux";
import { addToCart } from "../store/features/cartSlice";

const Product = ({ product }) => {
    const dispatch = useDispatch();

    const handleAddToCart = () => {
        dispatch(addToCart(product));
    }

    return (
        <div className="product">
            <img style={{width: '11rem'}}src={product.image_url} alt={product.name} />
            <h3>{product.name}</h3>
            <p>{product.description}</p>
            <p>${product.price}</p>
            <button onClick={handleAddToCart}>Add to Cart</button>
        </div>
    )
}

export default Product;