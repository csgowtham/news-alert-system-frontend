// App.jsx
import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import Auth from './components/Auth';
import Preferences from './components/Preferences';
import Dashboard from './components/Dashboard';
import Navbar from './components/Navbar';
import ProtectedRoute from './components/ProtectedRoute';
import MyFeed from './components/MyFeed'; // Import MyFeed component
import 'bootstrap/dist/css/bootstrap.min.css';

const App = () => {
  const [token, setToken] = useState(null);

  useEffect(() => {
    const storedToken = localStorage.getItem('token');
    if (storedToken) {
      setToken(storedToken);
    }
  }, []);

  const isAuthenticated = !!token; // Check if user is authenticated

  return (
    <Router>
      <Navbar setToken={setToken} />
      <Routes>
        <Route path="/login" element={<Auth setToken={setToken} />} /> {/* Public Route */}

        <Route 
          path="/dashboard" 
          element={
            <ProtectedRoute isAuthenticated={isAuthenticated}>
              <Dashboard />
            </ProtectedRoute>
          } 
        />

        <Route 
          path="/preferences" 
          element={
            <ProtectedRoute isAuthenticated={isAuthenticated}>
              <Preferences />
            </ProtectedRoute>
          } 
        />

        <Route 
          path="/my-feed" 
          element={
            <ProtectedRoute isAuthenticated={isAuthenticated}>
              <MyFeed />
            </ProtectedRoute>
          } 
        />

        {/* Default route to redirect to /login */}
        <Route path="/" element={<Navigate to="/login" />} /> {/* Redirect from root to login */}
      </Routes>
    </Router>
  );
};

export default App;
