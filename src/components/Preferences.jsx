import React, { useState } from 'react';
import { updatePreferences } from '../api/api.js';

const Preferences = ({ token }) => {
    const [categories, setCategories] = useState(['technology', 'health']);
    const [frequency, setFrequency] = useState('immediate');
    const [notificationChannels, setNotificationChannels] = useState(['email']);

    const handleSubmit = async (e) => {
        e.preventDefault();
        await updatePreferences({ categories, frequency, notificationChannels }, token);
        alert('Preferences updated successfully!');
    };

    return (
        <div className="container">
            <form onSubmit={handleSubmit} className="mt-5">
                <h2>Update Preferences</h2>
                <div className="mb-3">
                    <label className="form-label">Categories:</label>
                    <input
                        type="text"
                        className="form-control"
                        value={categories.join(', ')}
                        onChange={(e) => setCategories(e.target.value.split(', '))}
                    />
                </div>
                <div className="mb-3">
                    <label className="form-label">Frequency:</label>
                    <select 
                        className="form-select" 
                        value={frequency} 
                        onChange={(e) => setFrequency(e.target.value)}
                    >
                        <option value="immediate">Immediate</option>
                        <option value="hourly">Hourly</option>
                        <option value="daily">Daily</option>
                    </select>
                </div>
                <div className="mb-3">
                    <label className="form-label">Notification Channels:</label>
                    <select 
                        multiple 
                        className="form-select" 
                        value={notificationChannels} 
                        onChange={(e) => setNotificationChannels([...e.target.selectedOptions].map(option => option.value))}
                    >
                        <option value="email">Email</option>
                        <option value="sms">SMS</option>
                        <option value="push">Push Notifications</option>
                    </select>
                </div>
                <button type="submit" className="btn btn-primary">Update Preferences</button>
            </form>
        </div>
    );
};

export default Preferences;
