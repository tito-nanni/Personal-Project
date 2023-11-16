import React, { useState, useEffect } from 'react';
import axios from 'axios';

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

  const handleViewDetails = async(orderDetailId) => {
    try {
      const response = await axios.get(`api/order-details/${orderDetailId}`);
      console.log("Fetched data:", response.data)
      setOrderDetails(response.data);
      setSelectedOrder(response.data.order_id);
    } catch (error) {
      console.error('Error fetching order details', error);
    }
  };

  console.log("Selected Order:", selectedOrder)
  console.log("Order Details:", orderDetails)

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

      {selectedOrder && orderDetails && (
        <div>
          <h2>Order Details for Order</h2>
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
