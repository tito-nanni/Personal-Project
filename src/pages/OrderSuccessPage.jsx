import React from "react";
import {Link} from "react-router-dom";
import './OrderSuccessPage.css'

const OrderSuccessPage = () => {
    return (
        <div className="success-container">
            <h1>Order Placed Successfully</h1>
            <p>Your order has been placed and is being processed. Thank you for shopping with us!</p>
            <Link to="/products" className="continue-shopping">Continue Shopping</Link>
        </div>
    );
};

export default OrderSuccessPage;