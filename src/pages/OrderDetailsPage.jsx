import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';

const OrderDetailsPage = () => {
  const [orderDetails, setOrderDetails] = useState([]);
  const { orderId } = useParams(); // If you have a route param to fetch a specific order's details

  useEffect(() => {
    const fetchOrderDetails = async () => {
      try {
        // Assuming you need to fetch details for a specific order
        const response = await axios.get(`/api/order-details?order_id=${orderId}`);
        setOrderDetails(response.data);
      } catch (error) {
        console.error('Error fetching order details', error);
      }
    };

    fetchOrderDetails();
  }, [orderId]);

  return (
    <div>
      <h1>Details for Order #{orderId}</h1>
      {orderDetails.length > 0 ? (
        orderDetails.map((detail) => (
          <div key={detail.order_detail_id}>
            <h2>Product ID: {detail.product_id}</h2>
            <p>Quantity: {detail.quantity}</p>
            <p>Price per item: ${detail.price}</p>
            <p>Subtotal: ${(detail.quantity * parseFloat(detail.price)).toFixed(2)}</p>
            {/* Add any additional details wanted to display */}
          </div>
        ))
      ) : (
        <p>No order details found.</p>
      )}
    </div>
  );
};

export default OrderDetailsPage;
