import React from 'react';

const Card = ({ title, content, url }) => {
    return (
        <div className="bg-white shadow-md rounded-lg p-4 m-4 transition-transform transform hover:scale-105">
            <h4 className="news-cycle-bold text-lg">{title}</h4>
            <p className="text-gray-700 news-cycle-regular">{content}</p>
            <a 
                href={url} 
                target="_blank" 
                rel="noopener noreferrer" 
                className="btn btn-primary mt-2"
            >
                Read more
            </a>
        </div>
    );
};

export default Card;
