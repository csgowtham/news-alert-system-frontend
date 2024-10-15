import React from 'react';
import { Link, useNavigate } from 'react-router-dom';

const Navbar = ({ setToken }) => {
    const navigate = useNavigate(); // Use the useNavigate hook for navigation

    const handleLogout = () => {
        localStorage.removeItem('token');
        setToken(null);
        navigate('/login'); // Redirect to login after logout
    };

    return (
        <nav className="navbar navbar-expand-lg navbar-light bg-light">
            <div className="container-fluid">
                <Link className="navbar-brand" to="/">News Alert System</Link>
                <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"></span>
                </button>
                <div className="collapse navbar-collapse" id="navbarNav">
                    <ul className="navbar-nav me-auto">
                        <li className="nav-item">
                            <Link className="nav-link" to="/dashboard">Dashboard</Link>
                        </li>
                        <li className="nav-item">
                            <Link className="nav-link" to="/preferences">Preferences</Link>
                        </li>
                        <li className="nav-item">
                            <Link className="nav-link" to="/my-feed">News Feed</Link>
                        </li>
                    </ul>
                    <button className="btn btn-outline-danger" onClick={handleLogout}>Logout</button>
                </div>
            </div>
        </nav>
    );
};

export default Navbar;
