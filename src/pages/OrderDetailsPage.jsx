import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';

const OrderDetailsPage = () => {
  const [orderDetails, setOrderDetails] = useState([]);
  const { orderDetailId } = useParams(); // If you have a route param to fetch a specific order detail

  useEffect(() => {
    const fetchOrderDetails = async () => {
      try {
        const response = await axios.get(`/api/order-details`);
        setOrderDetails(response.data);
      } catch (error) {
        console.error('Error fetching order details', error);
        setOrderDetails([]); // Set to an empty array on error
      }
    };

    fetchOrderDetails();
  }, []); // No need to include orderDetailId in the dependency array

  return (
    <div>
      <h1>Order History</h1>
      {orderDetails.length > 0 ? (
        orderDetails.map((orderDetail) => (
          <div key={orderDetail.order_detail_id}>
            <h2>Product: {orderDetail.Product?.name}</h2>
            <p>Quantity: {orderDetail.quantity}</p>
            <p>Price per item: ${orderDetail.price}</p>
            <p>Subtotal: ${(orderDetail.quantity * parseFloat(orderDetail.price)).toFixed(2)}</p>
          </div>
        ))
      ) : (
        <p>No order details found.</p>
      )}
    </div>
  );
};

export default OrderDetailsPage;
