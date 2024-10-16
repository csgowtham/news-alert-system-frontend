// MyFeed.jsx
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import '../MyFeed.css'; // Ensure you have your CSS file for styling
import LeftSidebar from './LeftSidebar'; // Import Left Sidebar component
import RightSidebar from './RightSidebar'; // Import Right Sidebar component

const MyFeed = () => {
  const [newsData, setNewsData] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchNews = async () => {
      try {
        const token = localStorage.getItem('token');
        const response = await axios.get('https://news-alert-system-backend.onrender.com/api/news', {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        const filteredData = response.data.filter((item) => item.image !== null);
        setNewsData(filteredData);
      } catch (err) {
        setError('Try Updating Your Preferences...\nError fetching news: ' + err.message);
      }
    };

    fetchNews();
  }, []);

  return (
    <div className="my-feed-container">
      <LeftSidebar />
      <div className="my-feed-content">
        {error && <div className="error">{error}</div>}
        <div className="news-cards">
          {newsData.map((newsItem, index) => (
            <div key={index} className="news-card">
              {newsItem.image && (
                <img src={newsItem.image} alt={newsItem.title} className="news-image" />
              )}
              <h3>{newsItem.title}</h3>
              <p>{newsItem.content}</p>
              <p><strong>Source:</strong> {newsItem.source}</p>
              <p><strong>Published At:</strong> {new Date(newsItem.publishedAt).toLocaleDateString()}</p>
            </div>
          ))}
        </div>
      </div>
      <RightSidebar />
    </div>
  );
};

export default MyFeed;
