import React, { useState, useEffect } from 'react';
import axios from 'axios';
import {jwtDecode} from 'jwt-decode'; // Corrected to default import

const Preferences = () => {
    const [selectedCategories, setSelectedCategories] = useState([]);
    const [frequency, setFrequency] = useState('daily');
    const [message, setMessage] = useState('');
    const [email, setEmail] = useState('');
    const [userId, setUserId] = useState('');

    const availableCategories = [
        'business',
        'entertainment',
        'general',
        'health',
        'science',
        'sports',
        'technology'
    ];

    useEffect(() => {
        console.log("Preferences component mounted!");
        const token = localStorage.getItem('token');

        if (token) {
            const decoded = jwtDecode(token);
            const userIdFromToken = decoded.id;
            setUserId(userIdFromToken);

            fetchUserEmail(userIdFromToken);
        } else {
            console.error("No token found. Please log in.");
        }
    }, []);

    const fetchUserEmail = async (userId) => {
        try {
            const response = await axios.get(`https://news-alert-system-backend.onrender.com/api/auth/get-user-email?id=${userId}`);
            console.log("Fetched email:", response.data.email);
            setEmail(response.data.email);
        } catch (error) {
            console.error("Error fetching email:", error);
        }
    };

    const handleCategoryChange = (category) => {
        setSelectedCategories(prevState => {
            if (prevState.includes(category)) {
                return prevState.filter(item => item !== category);
            } else {
                return [...prevState, category];
            }
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (selectedCategories.length === 0) {
            alert("Please select at least one category.");
            return;
        }

        const payload = {
            categories: selectedCategories,
            frequency: frequency,
        };

        const token = localStorage.getItem('token');

        try {
            const response = await axios.post('https://news-alert-system-backend.onrender.com/api/news/preferences', payload, {
                headers: {
                    'Authorization': `Bearer ${token}`  // Fixed template literal issue
                }
            });
            setMessage(response.data.message);
        } catch (error) {
            console.error('Error updating preferences:', error);
            setMessage('Failed to update preferences. Please try again.');
        }
    };

    const handleSendNotifications = async () => {
        try {
            const response = await axios.post('https://news-alert-system-backend.onrender.com/api/news/send-notifications', {
                email: email,  // Use the email fetched from the backend
            });

            if (response.status === 200) {
                alert(response.data.message); 
            } else if (response.status === 204) {
                alert(response.data.message); 
            }
        } catch (error) {
            console.error("Error sending notifications:", error);
            alert("Error sending notifications: " + (error.response?.data?.message || "Please try again.")); 
        }
    };

    return (
        <div>
            <h2>Select Your Preferences</h2>
            <form onSubmit={handleSubmit}>
                {/* Category Selection */}
                <h5>Notification Categories</h5>
                {availableCategories.map((category) => (
                    <div key={category} className="form-check">
                        <input
                            type="checkbox"
                            className="form-check-input"
                            id={category}
                            value={category}
                            checked={selectedCategories.includes(category)}
                            onChange={() => handleCategoryChange(category)}
                        />
                        <label className="form-check-label" htmlFor={category}>
                            {category.charAt(0).toUpperCase() + category.slice(1)}
                        </label>
                    </div>
                ))}

                {/* Frequency Selection */}
                <div className="form-group">
                    <label htmlFor="frequency">Notification Frequency</label>
                    <select
                        className="form-control"
                        id="frequency"
                        value={frequency}
                        onChange={(e) => setFrequency(e.target.value)}
                    >
                        <option value="daily">Daily</option>
                        <option value="weekly">Weekly</option>
                        <option value="monthly">Monthly</option>
                    </select>
                </div>

                {/* Submit Button */}
                <button type="submit" className="btn btn-primary" disabled={selectedCategories.length === 0}>
                    Save Preferences
                </button>
            </form>

            <br />

            {/* Send Notifications Button */}
            <button
                className="btn btn-warning"
                onClick={handleSendNotifications}
                disabled={!email} // Disable button until email is fetched
            >
                Send Me Notifications Now
            </button>

            {/* Display success/error messages */}
            {message && <p>{message}</p>}
        </div>
    );
};

export default Preferences;
