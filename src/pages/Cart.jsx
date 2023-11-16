import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { removeFromCart, updateQuantity } from "../store/features/cartSlice";
import { useNavigate } from "react-router-dom";

const Cart = () => {
    const cartItems = useSelector((state) => state.cart.items);
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const handleRemoveFromCart = (id) => {
        dispatch(removeFromCart(id));
    };

    const handleQuantityChange = (id, newQuantity) => {
      if (newQuantity < 1) {
        //preventing quantity from going BELOW 1
        return;
      }
      dispatch(updateQuantity({ id, quantity: newQuantity }));
    };

    const calculateTotalPrice = () => {
      return cartItems.reduce((total, item) => {
          const price = parseFloat(item.price) || 0; // Parse to float and fallback to 0 if NaN
          const quantity = item.quantity || 1; // Fallback to 0 if undefined or NaN
  
          return total + (price * quantity);
      }, 0);
  };

  const handleCheckout = () => {
    navigate('/checkout'); //navigating to the checkout page
  }

    return (
        <div className="cart">
          <h1>Your Cart</h1>
          {cartItems.length > 0 ? (
            <div>
            {cartItems.map(item => (
              <div key={item.id} className="cart-item">
                <img src={item.image} alt={item.name} className="cart-item-image" />
                <div className="cart-item-details">
                  <h3 className="cart-item-name">{item.name}</h3>
                  <p className="cart-item-price">${item.price}</p>
                  <p className="cart-item-description">Description: {item.description}</p>
                  <div className="quantity-controls">
                    <button onClick={() => handleQuantityChange(item.id, item.quantity -1)}>-</button>
                    <span>{item.quantity}</span>
                    <button onClick={() => handleQuantityChange(item.id, item.quantity +1)}>+</button>
                    </div>
                  <button onClick={() => handleRemoveFromCart(item.id)} className="cart-item-remove">
                    Remove
                  </button>
                </div>
              </div>
            ))}
            <div className="cart-total">
              <h3>Total Price: ${calculateTotalPrice().toFixed(2)}</h3>
            </div>
            <button onClick={handleCheckout} className="checkout-button">
              Proceed to Checkout
            </button>
            </div>
          ) : (
            <p>Your cart is empty</p>
          )}
          </div>
    );
 };

export default Cart;