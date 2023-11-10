import React from "react";

const Product = ({ product }) => {
    return (
        <div className="product">
            <img src={product.image_url} alt={product.name} />
            <h3>{product.name}</h3>
            <p>{product.description}</p>
            <p>${product.price}</p>
            {/* Add to Cart Button (functionality to be implemented later) */}
            <button>Add to Cart</button>
        </div>
    )
}

export default Product;