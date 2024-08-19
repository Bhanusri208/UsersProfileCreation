import React, { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { ApiUrl } from '../ApiUrl/ApiUrl'; 
import './Header.css'; 

const Header = ({ searchQuery, onSearchChange, onLocationChange }) => {
  const [locations, setLocations] = useState([]);
  const [selectedLocation, setSelectedLocation] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    const fetchLocations = async () => {
      try {
        const response = await fetch(`${ApiUrl}/locations`); 
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const locationsData = await response.json();
        setLocations(locationsData);
      } catch (err) {
        console.error('Fetch error:', err);
      }
    };

    fetchLocations();
  }, []);

  const handleLocationChange = (event) => {
    const location = event.target.value;
    setSelectedLocation(location);
    onLocationChange(location); 
  };

  const handleAddUser = () => {
    navigate('/add'); 
  };

  return (
    <div className='header'>
      <div>
        <Link to="/"><h1 className='head'>Users</h1></Link>
      </div>
      <div>
        <input
          type="search"
          placeholder='Search by name...'
          className='search-box'
          value={searchQuery}
          onChange={e => onSearchChange(e.target.value)}
        />
        <select
          value={selectedLocation}
          onChange={handleLocationChange}
          className='location-dropdown'
        >
          <option value="">Select Location</option>
          {locations.map(location => (
            <option key={location} value={location}>
              {location}
            </option>
          ))}
        </select>
        <button className='add-user-button' onClick={handleAddUser}>Add User</button>
      </div>
    </div>
  );
}

export default Header;




