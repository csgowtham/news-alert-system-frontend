// NotificationHistory.jsx
import React, { useState } from 'react';

const NotificationHistory = ({ notifications }) => {
    const [hoveredIndex, setHoveredIndex] = useState(null);

    return (
        <div className="list-group">
            {notifications.map((notification, index) => (
                <a
                    key={index}
                    href="#"
                    className={`list-group-item list-group-item-action flex-column align-items-start ${hoveredIndex === index ? 'active' : ''}`}
                    onMouseEnter={() => setHoveredIndex(index)} // Set hovered index on mouse enter
                    onMouseLeave={() => setHoveredIndex(null)} // Reset hovered index on mouse leave
                >
                    <div className="d-flex w-100 justify-content-between">
                        <h5 className="mb-1">{notification.title}</h5>
                        <small>{new Date(notification.publishedAt).toLocaleDateString()}</small>
                    </div>
                    
                    <small>{notification.source}</small>
                </a>
            ))}
        </div>
    );
};

export default NotificationHistory;
