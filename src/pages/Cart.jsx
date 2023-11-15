import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { removeFromCart } from "../store/features/cartSlice";

const Cart = () => {
    const cartItems = useSelector((state) => state.cart.items);
    const dispatch = useDispatch();

    const handleRemoveFromCart = (id) => {
        dispatch(removeFromCart(id));
    };

    return (
        <div className="cart">
          <h1>Your Cart</h1>
          {cartItems.length > 0 ? (
            cartItems.map(item => (
              <div key={item.id} className="cart-item">
                <img src={item.image} alt={item.name} className="cart-item-image" />
                <div className="cart-item-details">
                  <h3 className="cart-item-name">{item.name}</h3>
                  <p className="cart-item-price">${item.price}</p>
                  <p className="cart-item-quantity">Description: {item.description}</p>
                  <button onClick={() => handleRemoveFromCart(item.id)} className="cart-item-remove">
                    Remove
                  </button>
                </div>
              </div>
            ))
          ) : (
            <p>Your cart is empty.</p>
          )}
        </div>
      );
    };
    
    export default Cart;