import React, { useState, useEffect } from 'react';
import axios from 'axios';

const OrdersPage = () => {
  const [orders, setOrders] = useState([]);

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

  return (
    <div>
      <h1>Your Orders</h1>
      {orders.map(order => (
        <div key={order.order_id}>
          <h2>Order {order.order_id}</h2>
          <p>Total Price: ${order.total_price}</p>
          <p>Order Date: {new Date(order.order_date).toLocaleDateString()}</p>
          <h3>Items:</h3>
          <ul>
            {order.OrderDetails.map(detail => (
              <li key={detail.order_detail_id}>
                Product ID: {detail.product_id}, Quantity: {detail.quantity}, Price: ${detail.price}
              </li>
            ))}
          </ul>
        </div>
      ))}
    </div>
  );
};

export default OrdersPage;
