import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './OrdersPage.css'

const OrdersPage = () => {
  const [orders, setOrders] = useState([]);
  const [selectedOrder, setSelectedOrder] = useState(null);
  const [orderDetails, setOrderDetails] = useState([null]);

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const response = await axios.get('/api/orders');
        setOrders(response.data);
      } catch (error) {
        console.error('Error fetching orders', error);
      }
    };

    fetchOrders();
  }, []);

  const handleViewDetails = async (orderId) => {
    // if the currently selected orders details are already shown, hide them
    if (selectedOrder === orderId) {
      setSelectedOrder(null);
      setOrderDetails(null); // reset the order details
    } else {
      // fetch and display the new orders details
      try {
        const response = await axios.get(`api/order-details/${orderId}`);
        setOrderDetails(response.data);
        setSelectedOrder(orderId); // set the newly selected order
      } catch (error) {
        console.error('Error fetching order details', error);
      }
    }
  };


  return (
    <div className="orders-container">
    <h1>Your Orders</h1>
    {orders.map(order => (
      <div key={order.order_id} className="order-item">
        <h2>Order {order.order_id}</h2>
        <p>Order Date: {new Date(order.order_date).toLocaleDateString()}</p>
        <button onClick={() => handleViewDetails(order.order_id)} className="order-button">
          {selectedOrder === order.order_id ? 'Hide Details' : 'View Details'}
        </button>
      </div>
    ))}


      {selectedOrder && orderDetails && (
        <div className="order-details">
          <h2>Order Details</h2>
            <div key={orderDetails.order_detail_id}>
              <p>Product: {orderDetails.Product?.name}</p>
              <p>Quantity: {orderDetails.quantity}</p>
              <p>Price per item: ${orderDetails.price}</p>
              <p>Subtotal: ${(orderDetails.quantity * parseFloat(orderDetails.price)).toFixed(2)}</p>
              </div>
        </div>
          )}
      </div>
     );
 };

export default OrdersPage;
