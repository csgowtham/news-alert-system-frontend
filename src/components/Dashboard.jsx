// Dashboard.jsx
import React, { useEffect, useState } from 'react';
import { fetchTopHeadlines, fetchNotifications } from '../api/api';
import NotificationHistory from './NotificationHistory';
import '../Dashboard.css'

const Dashboard = () => {
    const [headlines, setHeadlines] = useState([]);
    const [notifications, setNotifications] = useState([]);
    const [error, setError] = useState(null);

    useEffect(() => {
        const getTopHeadlines = async () => {
            try {
                const response = await fetchTopHeadlines();
                setHeadlines(response.articles);
            } catch (error) {
                console.error('Error fetching top headlines:', error);
            }
        };

        const getNotifications = async () => {
            try {
                const response = await fetchNotifications();
                console.log('Notification Response:', response); // Log the API response
                setNotifications(response.slice(0, 10)); // Set the notifications directly from the response
            } catch (err) {
                setError('Try Updating Your Preferences...\nError fetching news: ' + err.message);
                console.error('Error fetching notifications:', error);
            }
        };
        

        getTopHeadlines();
        getNotifications();
    }, []);

    return (
        <div className="dashboard-container">
            <h1>Top Headlines</h1>
            <br />
            <div className="main-content">
                {/* Top headlines section */}
                <div className="top-headlines">
                    {headlines.map((headline, index) => (
                        <div key={index} className="headline-card">
                            {/* Check if the headline has an image */}
                            {headline.urlToImage && (
                                <img
                                    src={headline.urlToImage}
                                    alt={headline.title}
                                    className="headline-image"
                                />
                            )}
                            <h3>{headline.title}</h3>
                            {/* "Read more" button linking to the full article */}
                            <a href={headline.url} target="_blank" rel="noopener noreferrer" className="read-more-btn">Read More</a>
                        </div>
                    ))}
                </div>

                {/* Sidebar for notifications */}
                
                <div className="sidebar">
                
                    <h2 style={{textAlign:"center"}}>Notifications</h2>
                    {error && <div className="error">{error}</div>}
                    <NotificationHistory notifications={notifications} />
                </div>
            </div>
        </div>
    );
};

export default Dashboard;