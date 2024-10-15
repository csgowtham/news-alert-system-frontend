// LeftSidebar.jsx
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import '../Sidebar.css'; // Ensure your CSS file for styling

const LeftSidebar = () => {
  const [weather, setWeather] = useState(null);

  useEffect(() => {
    // Fetch weather data from API
    const fetchWeather = async () => {
      try {
        const response = await axios.get('http://localhost:5000/api/news/weather');
        setWeather(response.data); // Store the weather data in the state
      } catch (error) {
        console.error('Error fetching weather data:', error);
      }
    };

    fetchWeather();
  }, []);

  return (
    <div className="left-sidebar">
    
      <em><h4 style={{textAlign:"center"}}>Weather Info</h4></em>
      {weather ? (
        <>
        <img 
            src={weather.current.condition.icon} 
            alt={weather.current.condition.text} 
            style={{ width: '50px', height: '50px',marginLeft:"75px" }} 
          />
          
          <p>Location: {weather.location.name}</p>
          <p>Temperature: {weather.current.temp_c}°C</p>
          <p>Condition: {weather.current.condition.text}</p>
          
        </>
      ) : (
        <p>Loading weather data...</p>
      )}
      <br/>
      <hr/>
      <br/>
      <em><h4 style={{textAlign:"center"}}>Advertisements</h4></em>
      <p>Ad 1: Amazing June Offer! Buy TATA vehicles with cashback upto ₹1,50,000</p>
      <img 
  src="https://bsmedia.business-standard.com/_media/bs/img/article/2023-03/27/thumb/featurecrop/400X400/1679934860-7252.jpeg" 
  alt="TATA MOTORS" 
  style={{ width: '150px', height: '110px', marginLeft: "25px" }} 
/>

      <p>Ad 2: Healthy and Delecious in Every Bite!</p>
      <img 
  src="https://i0.wp.com/pathologyhorizons.com/wp-content/uploads/2018/07/Philips-logo-wordmark-002.png?fit=2272%2C880&ssl=1" 
  alt="Milky Mist" 
  style={{ width: '160px', height: '90px', marginLeft: "25px" }} 
/>
    </div>
  );
};

export default LeftSidebar;
