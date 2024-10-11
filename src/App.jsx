import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Auth from './components/Auth';
import Preferences from './components/Preferences';
import Dashboard from './components/Dashboard';
import Navbar from './components/Navbar';
import TopHeadlines from './components/TopHeadlines';
import 'bootstrap/dist/css/bootstrap.min.css';




const App = () => {
  const [token, setToken] = useState(null);

  useEffect(() => {
    const storedToken = localStorage.getItem('token');
    if (storedToken) {
      setToken(storedToken);
    }
  }, []);

  return (
    <Router>
      <Navbar setToken={setToken} />
      <Routes>
        <Route path="/" element={<Auth setToken={setToken} />} />
        <Route path="/preferences" element={<Preferences token={token} />} />
        <Route path="/dashboard" element={<Dashboard token={token} />} />
      </Routes>
    </Router>
  );
};

export default App;
