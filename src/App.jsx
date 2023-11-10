import React, { useState } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Navigation from './components/Navigation';
import ProtectedRoute from './components/ProtectedRoute';
import LoginPage from './pages/LoginPage';
import HomePage from './pages/Homepage';
import RegisterPage from './pages/RegisterPage';
import ProductsList from './pages/ProductsList';

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
  {/* You can add more protected routes here */}
</Routes>
</BrowserRouter>
);
}

export default App;