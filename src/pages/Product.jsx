import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { addToCart } from "../store/features/cartSlice";
import './Product.css'

const Product = ({ product }) => {
    const dispatch = useDispatch();
    const [buttonClicked, setButtonClicked] = useState(false);

    const handleAddToCart = () => {
        dispatch(addToCart(product));
        setButtonClicked(true);
        setTimeout(() => setButtonClicked(false), 700); //reset after animation
    }
    return (
        <div className="product">
          <img style={{ width: '11rem' }} src={product.image_url} alt={product.name} />
          <h3>{product.name}</h3>
          <p>{product.description}</p>
          <p>${product.price}</p>
          <button onClick={handleAddToCart} className={buttonClicked ? 'button-clicked' : ''}>
            Add to Cart
            <span className="plus-sign">+</span>
          </button>
        </div>
      )
    }
    

export default Product;