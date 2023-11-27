import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import axios from 'axios';
import { clearCart } from "../store/features/cartSlice";

const CheckoutPage = () => {
    const cartItems = useSelector((state) => state.cart.items);
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const calculateTotalPrice = () => {
        return cartItems.reduce((total, item) => total + (item.price * item.quantity), 0)
    }

    const handleSubmitOrder = async () => {
        try {
            // Create an array of order details from the cart items
            const orderDetails = cartItems.map(item => ({
                product_id: item.id,
                quantity: item.quantity,
                price: item.price // Assuming your backend needs this. Otherwise, the backend should calculate it.
            }));
    
            // Create the order payload
            const orderPayload = {
                // Include any other order-level information if needed
                orderDetails: orderDetails,
            };
    
            // Post the order to your API
            const response = await axios.post('/api/orders', orderPayload);
    
            // If the order is successful, clear the cart and navigate to success page
            if (response.status === 201) {
                dispatch(clearCart());
                navigate('/order-success');
            }
        } catch (error) {
            console.error('Failed to submit order', error);
            // Handle errors, such as displaying a message to the user
        }
    };
    

    return (
        <div>
            <h1>Checkout</h1>
            {cartItems.map(item => (
                <div key={item.id}>
                    <p>{item.name} - ${item.price} x {item.quantity}</p>
                    </div>
            ))}
            <p>Total Price: ${calculateTotalPrice().toFixed(2)}</p>
            <button onClick={handleSubmitOrder}>Submit Order</button>
        </div>
    );
};

export default CheckoutPage;