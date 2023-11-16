import React, { useState, useEffect } from 'react';
import axios from 'axios';

const OrdersPage = () => {
  const [orders, setOrders] = useState([]);
  const [selectedOrder, setSelectedOrder] = useState(null);
  const [orderDetails, setOrderDetails] = useState([]);

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

  const handleViewDetails = async(orderId) => {
    try {
      const response = await axios.get(`api/order-details`);
      setOrderDetails(response.data);
      setSelectedOrder(orderId);
    } catch (error) {
      console.error('Error fetching order details', error);
    }
  };

  return (
    <div>
      <h1>Your Orders</h1>
      {orders.map(order => (
        <div key={order.order_id}>
          <h2>Order {order.order_id}</h2>
          <p>Order Date: {new Date(order.order_date).toLocaleDateString()}</p>
          <button onClick={() => handleViewDetails(order.order_id)}>View Details</button>
          </div>
      ))}

      {selectedOrder && orderDetails.length > 0 && (
        <div>
          <h2>Order Details for Order {selectedOrder}</h2>
          {orderDetails.map(detail => (
            <div key={detail.order_detail_id}>
              <p>Product: {detail.Product?.name}</p>
              <p>Quantity: {detail.quantity}</p>
              <p>Price per item: ${detail.price}</p>
              <p>Subtotal: ${(detail.quantity * parseFloat(detail.price)).toFixed(2)}</p>
              </div>
          ))}
        </div>
      )}
      </div>
     );
 };

export default OrdersPage;
