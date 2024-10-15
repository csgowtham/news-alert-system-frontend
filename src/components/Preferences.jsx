import React, { useState } from 'react';
import axios from 'axios';

const Preferences = () => {
    const [selectedCategories, setSelectedCategories] = useState([]);
    const [frequency, setFrequency] = useState('daily'); // Default frequency
    const [message, setMessage] = useState(''); // State to display success/error messages

    const availableCategories = [
        'business',
        'entertainment',
        'general',
        'health',
        'science',
        'sports',
        'technology'
    ];

    const handleCategoryChange = (category) => {
        setSelectedCategories(prevState => {
            if (prevState.includes(category)) {
                // If category is already selected, remove it
                return prevState.filter(item => item !== category);
            } else {
                // If category is not selected, add it
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

        // Assume you have an authentication token stored somewhere
        const token = localStorage.getItem('token');

        try {
            const response = await axios.post('http://localhost:5000/api/news/preferences', payload, {
                headers: {
                    'Authorization': `Bearer ${token}` // Add token if needed
                }
            });
            setMessage(response.data.message);
        } catch (error) {
            console.error('Error updating preferences:', error);
            setMessage('Failed to update preferences. Please try again.');
        }
    };

    // Function to trigger the notification sending feature
    const handleSendNotifications = async () => {
        try {
          const response = await axios.post('http://localhost:5000/api/news/send-notifications', {
            email: 'csgowtham73@gmail.com',
          });
      
          if (response.status === 200) {
            alert(response.data.message); // Successful notification send
          } else if (response.status === 204) {
            alert(response.data.message); // No new notifications
          }
        } catch (error) {
          console.error("Error sending notifications:", error);
          alert("Error sending notifications: " + (error.response?.data?.message || "Please try again.")); // More informative error
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
            >
                Send Me Notifications Now
            </button>

            {/* Display success/error messages */}
            {message && <p>{message}</p>}
        </div>
    );
};

export default Preferences;
