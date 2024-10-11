// TopHeadlines.jsx
import React from 'react';
import "../TopHeadlines.css";

const TopHeadlines = ({ headlines }) => {
  return (
    <div className="top-headlines">
      {headlines.map((headline, index) => (
        <div key={index} className="headline-card">
          {headline.urlToImage && ( // Check if urlToImage exists
            <img src={headline.urlToImage} alt={headline.title} className="headline-image" />
          )}
          <h3>{headline.title}</h3>
          <p>{headline.description || "No description available."}</p>
        </div>
      ))}
    </div>
  );
};

export default TopHeadlines;
