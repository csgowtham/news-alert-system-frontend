import React from 'react';
import "../TopHeadlines.css";

const TopHeadlines = ({ headlines }) => {
  // Filter headlines to exclude those with null or undefined urlToImage
  const filteredHeadlines = headlines.filter(headline => headline.urlToImage);

  return (
    <div className="top-headlines">
      {filteredHeadlines.length === 0 ? ( // Check if there are any headlines to display
        <p>No headlines available.</p>
      ) : (
        filteredHeadlines.map((headline, index) => (
          <div key={index} className="headline-card">
            <img src={headline.urlToImage} alt={headline.title} className="headline-image" />
            <h3>{headline.title}</h3>
            <p>{headline.description || "No description available."}</p>
          </div>
        ))
      )}
    </div>
  );
};

export default TopHeadlines;
