// RightSidebar.jsx
import React from 'react';
import '../Sidebar.css'; // Reuse the same CSS for consistency

const RightSidebar = () => {
  return (
    <div className="right-sidebar">
      <h4>Advertisements</h4>
      <p>Ad 1: Limited Time Offer!</p>
      <p>Ad 2: Subscribe Now for Exclusive Deals!</p>
      <h4>Links</h4>
      <ul>
        <li><a href="#">Link 1</a></li>
        <li><a href="#">Link 2</a></li>
        <li><a href="#">Link 3</a></li>
      </ul>
    </div>
  );
};

export default RightSidebar;
