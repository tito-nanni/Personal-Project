import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import axios from 'axios';
import { clearCart } from "../store/features/cartSlice";

const CheckoutPage = () => {
    const cartItems = useSelector((state) => state.cart.items);
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const handleSubmitOrder = async () => {
        try {
            // create an order object from the cart items
            const order = {
                items: cartItems,
                //add any additional order info needed by the api
            };

            // Post the order to your api
            const response = await axios.post('/api/orders', order);

            //If the order is successful, clear the cart
            if (response.status === 201) {
                dispatch(clearCart());
                //navigate to a confirmation page or display a success message
                navigate('/order-success')
            }
        } catch (error) {
            console.error('Failed to submit order', error);
            //handle errrors, such as displaying a message to the user
        }
    };

    return (
        <div>
            <h1>Checkout</h1>
            {/* List cart items and total price */}
            {/* ... */}
            <button onClick={handleSubmitOrder}>Submit Order</button>
        </div>
    );
};

export default CheckoutPage;