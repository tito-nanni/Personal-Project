import React, { useState } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Navigation from './components/Navigation';
import ProtectedRoute from './components/ProtectedRoute';
import LoginPage from './pages/LoginPage';
import HomePage from './pages/Homepage';
import RegisterPage from './pages/RegisterPage';
import ProductsList from './pages/ProductsList';
import Cart from './pages/Cart';
import CheckoutPage from './pages/CheckoutPage';
import OrdersPage from './pages/OrdersPage';
import OrderDetailsPage from './pages/OrderDetailsPage';
import OrderSuccessPage from './pages/OrderSuccessPage';
import ReviewPage from './pages/ReviewPage';

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  return (
    <BrowserRouter>
     {/* Conditionally render Navigation only if authenticated */}
     {isAuthenticated && <Navigation isAuthenticated={isAuthenticated} />}
  <Routes>
  <Route path="/login" element={<LoginPage setIsAuthenticated={setIsAuthenticated} />} />
  <Route path="/register" element={<RegisterPage />} />
  <Route
    path="/"
    element={
      <ProtectedRoute isAuthenticated={isAuthenticated}>
        <HomePage setIsAuthenticated={setIsAuthenticated} />
      </ProtectedRoute>
    }
  />
  <Route
    path="/products"
    element={
      <ProtectedRoute isAuthenticated={isAuthenticated}>
        <ProductsList />
      </ProtectedRoute>
    }
  />
  {/* you can add more protected routes here */}
  <Route
  path="/cart"
  element={
    <ProtectedRoute isAuthenticated={isAuthenticated}>
      <Cart />
    </ProtectedRoute>
  }
  />
  <Route
  path="/checkout"
  element={
    <ProtectedRoute isAuthenticated={isAuthenticated}>
      <CheckoutPage />
    </ProtectedRoute>
  }
  />
  <Route
  path="/reviews"
  element={
    <ProtectedRoute isAuthenticated={isAuthenticated}>
      <ReviewPage />
    </ProtectedRoute>
  }
  />
  <Route
  path="/orders"
  element={
    <ProtectedRoute isAuthenticated={isAuthenticated}>
      <OrdersPage />
    </ProtectedRoute>
  }
  />
  <Route
  path="/order-details"
  element={
    <ProtectedRoute isAuthenticated={isAuthenticated}>
      <OrderDetailsPage />
    </ProtectedRoute>
  }
  />
   <Route
  path="/order-success"
  element={
    <ProtectedRoute isAuthenticated={isAuthenticated}>
      <OrderSuccessPage />
    </ProtectedRoute>
  }
  />
</Routes>
</BrowserRouter>
);
}

export default App;